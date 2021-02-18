const { ApolloServer, gql, UserInputError } = require("apollo-server");
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const mongoose = require("mongoose");
const Author = require("./models/authors.js");
const Book = require("./models/books.js");
const User = require("./models/user.js");

mongoose.set("useFindAndModify", false);

const MONGODB_URI =
  "mongodb+srv://user:amara@cluster0.zkvaf.mongodb.net/part8_db?retryWrites=true&w=majority";

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
  type Books {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String
    bookCount: Int
    born: Int
  }
  type User {
      username: String!
      favoriteGenre: String!
      id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Books!]
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Books
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments,
    authorCount: () => Author.collection.countDocuments,
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) return Book.find({});

      if (!args.author && args.genre) {
        return Book.find().where({
          genres: { $in: [args.genre] },
        });
      }

      const author = await Author.findOne({ name: args.author });
      return Book.find().where({
        author: author ? author._id : null,
        genres: { $in: [args.genre] },
      });
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: (root) => Book.collection.countDocuments({ author: root.name }),
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("You need to be logged in to add a book");
      }

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (e) {
          if (e.name === "ValidationError") {
            throw new UserInputError("Couldn't create new author", {
              invalidArgs: { author: args.author },
              errorMessages: e.message,
            });
          }
        }
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres,
      });

      try {
        await book.save();
      } catch (e) {
        if (e.name === "ValidationError") {
          throw new UserInputError("Couldn't create new book", {
            invalidArgs: args,
            errorMessages: e.message,
          });
        }
      }

      return book;
    },
    editAuthor: async (root, args,{ currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("You need to be logged in to update a book");
      }

      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author;
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secred' ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
