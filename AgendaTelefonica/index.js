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

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(persons => {
            response.json(persons);
        });
});

app.get('/info', (request, response) => {
    const fecha = new Date();
    Person
        .find({})
        .then(persons => {
            const mensaje = `Phonebook has info for ${persons.length} people`;
            response.send(`<p>${mensaje}</p><br><p>${fecha.toString()}</p>`);
        });    
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person
        .findById(id)
        .then(res => {
            response.json(res);
        });    
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', async (request, response) => {
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

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;   
    const person = {
        name: body.name,
        number: body. number,
    }
    Person.findByIdAndUpdate(body.id, person, {new: true})
        .then(res =>{
            response.json(res)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}
app.use(errorHandler)

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);    
})
