const { ApolloServer, UserInputError, gql } = require("apollo-server");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const Person = require("./models/person");
const User = require("./models/user");

mongoose.set("useFindAndModify", false);

const MONGODB_URI =
  "mongodb+srv://user:amara@cluster0.zkvaf.mongodb.net/phonebook-app?retryWrites=true&w=majority";

const JWT_SECRET = "NEED_HERE_A_SECRET_KEY";

mongoose.set("useCreateIndex", true);

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Person {
    name: String!
    phone: String
    address: Address!
    friendOf: [User!]!
    id: ID!
  }
  type Address {
    street: String!
    city: String!
  }
  enum YesNo {
    YES
    NO
  }
  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }
  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(name: String!, phone: String!): Person
    createUser(username: String!): User
    login(username: String!, password: String!): Token
    addAsFriend(name: String!): User
  }
  type Subscription {
    personAdded: Person!
  }
`;
const { PubSub } = require("apollo-server");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    personCount: () => Person.collection.countDocuments(),
    allPersons: (root, args) => {
      console.log("Person.find");
      if (!args.phone) {
        return Person.find({}).populate("friendOf");
      }

      return Person.find({ phone: { $exists: args.phone === "YES" } }).populate(
        "friendOf"
      );
    },
    findPerson: (root, args) => Person.findOne({ name: args.name }),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
    friendOf: async (root) => {
      const friends = await User.find({
        friends: {
          $in: [root._id]
        }
      })

      return friends
    }
  },
  Mutation: {
    addPerson: async (root, args, context) => {
      const person = new Person({ ...args });

      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      try {
        await person.save();
        currentUser.friends = currentUser.friends.concat(person);
        await currentUser.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      pubsub.publish("PERSON_ADDED", { personAdded: person });

      return person;
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name });
      person.phone = args.phone;

      try {
        await person.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return person;
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
    addAsFriend: async (root, args, { currentUser }) => {
      const nonFriendAlready = (person) =>
        !currentUser.friends.map((f) => f._id).includes(person._id);

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const person = await Person.findOne({ name: args.name });
      if (nonFriendAlready(person)) {
        currentUser.friends = currentUser.friends.concat(person);
      }

      await currentUser.save();

      return currentUser;
    },
  },
  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterator(["PERSON_ADDED"]),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);

      const currentUser = await User.findById(decodedToken.id).populate(
        "friends"
      );

      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
