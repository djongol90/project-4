const express = require('express');
const app = express();

// Fonction pour générer la table de multiplication par 5
function genererTableMultiplicationPar5(nmbre) {
 let table = '<h1>Table de multiplication :</h1><br>';
 for (let i = 1; i <= 10; i++) {
 const resultat = nmbre * i;
 table += `${nmbre} x ${i} = ${resultat}\n`;
 }
 return table;
}

// Route pour afficher la table de multiplication par 5
app.get('/ibrahim/:nbr', (req, res) => {
    const nbr = req.params.nbr;
 // Appel de la fonction pour générer la table de multiplication
 const tableMultiplication = genererTableMultiplicationPar5(nbr);
 // Envoi de la table de multiplication en tant que réponse HTTP
 res.send(tableMultiplication);
});

// Démarrage du serveur sur le port 3000
const server = app.listen(3000, () => {
 console.log('Le serveur est en écoute sur le port 3000');
});



