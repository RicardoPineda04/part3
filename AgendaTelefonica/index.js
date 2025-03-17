require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));
morgan.token('body', request => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(persons => {
            response.json(persons);
        });
});

app.get('/info', (request, response) => {
    const fecha = new Date();
    const mensaje = `Phonebook has info for ${persons.length} people`;
    response.send(`<p>${mensaje}</p><br><p>${fecha.toString()}</p>`);
    
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person
        .findById(id)
        .then(res => {
            response.json(res);
        });    
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);
    response.status(204).end();
})

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
}
app.post('/api/persons', (request, response) => {
    const body = request.body;   
    if(!body.name || !body.number){
        return response.status(400).json({
            error: 'Content missing'
        })
    }
    const person = {
        name: body.name,
        number: body. number,
    }
    Person
        .create(person)
        .then(res => {
            response.json(res);
        })
})
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);    
})
