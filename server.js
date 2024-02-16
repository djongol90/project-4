const express = require ("express");
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


app.post('/add', (req,res) => {
    console.log(req.body)
    res.send(req.body)

})