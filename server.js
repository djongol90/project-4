const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')

const app = express();

app.use(morgan('dev'));

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
});


app.get('/person/:id', (req, res) => {
    const id = req.params.id;
    Person.findById(id).then(data => {
        res.json({
            message: 'La personnne a été retrouvée!',
            personne: data
        })
    })
})


app.get('/person/get-one/:email', async (req, res) => {
    const email = req.params.email;
    const person = await Person.findOne({email: email})
    res.json({
        message: 'La personne a été retrouvee!',
        person: person
    })
})

app.put('/person/update-person/:email', async(req, res) => {
    const email = req.params.email;
    await Person.updateOne({email: email}, {name: req.body.name});
    res.json({
        message: "la personne a ete modifiée"
    })
})






app.listen(3000, () => {
    console.log('Le serveur est lancé!')
})

