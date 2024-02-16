const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const app = express();
const PORT = 3000;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


app.post('/add', (req,res) => {
    console.log(req.body)
    res.send(req.body)

})







app.get('/hello', (req, res) => {
    console.log("bonjour tous le monde");
    console.log(req.params);
    console.log(req.query);
    console.log(req.url)
    res.send('bonjour ' + req.query.nom + ' ' + req.query.prenom);
});
 

app.get('/hello/:id', (req,res) => {
    const id = req.params.id;
    res.send('votre id :' + id);
});

app.listen(PORT, () => {
console.log(`le serveur nous ecoute sur le port: ${PORT}
le lien : localhost :${PORT}`);
});