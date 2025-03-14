const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));
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
    response.json(persons);
});

app.get('/info', (request, response) => {
    const fecha = new Date();
    const mensaje = `Phonebook has info for ${persons.length} people`;
    response.send(`<p>${mensaje}</p><br><p>${fecha.toString()}</p>`);
    
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);
    if(person){
        response.json(person);
    }else{
        return response.status(404).json({
            error: 'Content Missing'
        })
    }
    
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
    const existedName = persons.find(person => person.name === body.name);
    if(!body.name || !body.number){
        return response.status(400).json({
            error: 'Content missing'
        })
    }
    if(existedName){
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }
    const person = {
        name: body.name,
        number: body. number,
        id: generateId()
    }
    persons = persons.concat(person);
    morgan.token('body', request => JSON.stringify(request.body))
    response.json(person);
})
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);    
})
