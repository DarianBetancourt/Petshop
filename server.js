const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require("./routes/user")
const port = 3000

mongoose.connect('mongodb+srv://m001-student:m001-mongodb-basics@sandbox.ltkid.mongodb.net/petshop?retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology: true,})

app.use(express.urlencoded({ extended: false}));

app.use("/users",userRoutes)

app.get('/',(req, res) => {
    res.send(`<h1> Hello world</h1>I am a node server with express, I will be an API for a PetShop <hr><br>`)
});



app.listen(port, () => {
    console.log('Rodando o servidor na porta '+port)
});