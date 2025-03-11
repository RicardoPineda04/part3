const mongoose = require('mongoose');

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const pass = process.argv[2];

const url = `mongodb+srv://rapineda:${pass}@cluster0.2txk3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery',false)

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
const Person = mongoose.model('Person', personSchema)
  
if(process.argv[3] && process.argv[4]){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    person
        .save()
        .then(result => {
        console.log(`Added ${result.name} number ${result.number} to Phonebook`);        
        mongoose.connection.close()
    })
}else{
    Person
        .find({})
        .then(persons=> {
            console.log('Phonebook:');
            persons.forEach((person) => {
                console.log(`${person.name} ${person.number}`);                
            })            
            mongoose.connection.close()
        })
}