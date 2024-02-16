const mongoose = require("mongoose");


mongoose.connect('mongodb://127.0.0.1:27017/test42');

const Cat = mongoose.model('Cat', {name: String});
const Chien = mongoose.model('Chien', {name: String, category: String});
const Personne = mongoose.model('Personne',{Nom :String, Prenom:String, Age:Number})
const Anne = mongoose.model('Anne',{name: String, prenom : String, category: String});
const newChien = new Chien({name: "Dogg 5", category: "Hindien"});
console.log(newChien);

// La fonction find() il return la liste de toutes les informations qui se trouve
// au niveau de la table Chien
// Chien.find().then(data => console.log(data));

// La fonction findById(ObjectId) prend en argument l'objectId et il nous return
// un seul element dont l'id a ete passé en argument
// Chien.findById("65cf9d5bc78d78359523da32").then(data => console.log(data));

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