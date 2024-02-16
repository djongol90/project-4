const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/test42');

<<<<<<< HEAD
const Cat = mongoose.model('Cat', {name: String});
const Chien = mongoose.model('Chien', {name: String, category: String});
const Personne = mongoose.model('Personne',{Nom :String, Prenom:String, Age:Number})
const Anne = mongoose.model('Anne',{name: String, prenom : String, category: String});
const newChien = new Chien({name: "Dogg 5", category: "Hindien"});
console.log(newChien);
=======
const personSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    age: Number,
    email: String
});

>>>>>>> 224fed3fa703c8a37b4d7bdfab0a886f38e583d9

const Person = mongoose.model('Person', personSchema);


<<<<<<< HEAD
// La fonction findOne() il return un seul object
// mais en passe en argument l'attribut qu'on veux filtrer avec
// exple findOne({name: "le nom qu'on veux rechercher avec"}); 
Chien.findOne({name: "Dogg 5"}).then(data => console.log(data))
newChien.save().then(() => console.log('Le chien a ete ajouté'))


const newPersonne = new Personne({Nom:"Ibrahim", Prenom:"Daoud", Age:22})
console.log(newPersonne)
newPersonne.save().then(() => console.log('la personne a ete bien ajouter'))

const newCat = new Cat({name: 'Boby'});
const newAnne = new Anne({name : "Houmar 2", Prenom: "Quartier", category: "Dahache"})
console.log(newAnne)
newAnne.save().then(() => console.log("l' anne est ajouter"))
newCat.save().then(() => console.log("chat ajouté"));

Cat.find().then((data) => {
    console.log(data);
})
=======
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

>>>>>>> 224fed3fa703c8a37b4d7bdfab0a886f38e583d9
