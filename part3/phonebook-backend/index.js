require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const Person = require("./models/person");

app.use(express.static("build"));
app.use(express.json());

morgan.token("data", (req) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status  :res[content-length] - :response-time ms :data "
  )
);

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

const generateId = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

app.get("/api/persons", (request, response) => {
  Person.find({}).then((notes) => {
    response.json(notes);
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  // if (!body.name && !body.number) {
  //   return response.status(400).json({ error: "name must be unique" });
  // }

  const person = new Person({ name: body.name, number: body.number });

  person.save().then((person) => {
    response.json(person);
  });
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(10000),
  };
  const data = persons.concat(person);
  response.json(data);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findById(id).then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((note) => note.id !== id);

  response.status(204).end();
});

app.get("/info", (request, response) => {
  Person.countDocuments().then((count) => {
    const pagePhoneBookInfo = `<div><p>Phonebook has info for ${count} people</p><p>${new Date()}</p></div>`;
    response.send(pagePhoneBookInfo);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
