const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/test42');

const personSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    age: Number,
    email: String
});


const Person = mongoose.model('Person', personSchema);


app.post('/add-person', (req, res) => {
    
    const data = req.body;

    const newPerson = new Person(data);

    newPerson.save().then(() => {
        res.json({
            message: "La personne a été enregistrer!"
        })
    })

});

app.get('/persons', (req, res) => {


    Person.find().then(data => {
        res.json({
            message: 'La liste des personne',
            personnes: data
        })
    })
})









app.listen(3000, () => {
    console.log('Le serveur est lancé!')
})

