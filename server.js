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

    const name = req.query.name;
    const lastName = req.query.lastName;
    const age = req.query.age;
    let filter = {};

    if (name) {
        // on verifi l'existence de name si name exist on doit 
        // essayer d'ajouter dans l'objet filter
        filter = {
            name: name
        }
    }
    if(lastName) {
        filter = {
            // Ici on a essayer de prendre en consideration 
            // les informations des filter ci-dessus dans le cas ou
            // name existe
            ...filter, 
            lastName: lastName,
        }
    }if (age) {
        filter = {
            ...filter,
            age: age,
        }
    }

    // on essaye de rechercher avec les mots clés qu'on a pris en consideration
    // dans l'objet filter.
    Person.find(filter).then(data => {
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
    if (person) {
        res.status(200).json({
            message: 'La personne a été retrouvee!',
            person: person
        })
    }else{
        res.status(404).json({
            message: "La personne n'a pas été retrouvee!",
        })
    }
})

app.put('/person/update-person/:email', async(req, res) => {
    const email = req.params.email;
    await Person.updateOne({email: email}, {name: req.body.name});
    res.json({
        message: "la personne a ete modifiée"
    })
})

app.delete('/person/delete/:email', async (req, res) => {
    const email = req.params.email;

    // await Person.findOneAndDelete()
    await Person.deleteOne({email: email});

    res.json({
        message: "La personne a ete supprimée"
    })
})






app.listen(3000, () => {
    console.log('Le serveur est lancé!')
})

