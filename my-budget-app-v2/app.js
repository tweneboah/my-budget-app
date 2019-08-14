const express = require('express');
const bodyParser = require('body-parser');


const app = express();



//===============
// MIDDLEWARES
//================
app.use(bodyParser.urlencoded({ extended: true}));
app.set("view engine", "ejs");


//=============
// HOME PAGE
app.get('/', (req, res) => {
    res.render('index')
})

//=================
// CREATE A BUGET
//=================

//1. Get the budget form
app.get('/budget/new', (req, res) => {
     res.render('createBudget')
})

//.2 Create budget Logic

app.post('/budget', (req, res) => {
    
})

//===============
// USERS REGISTRATION
//===============



app.listen(5000, () => {
    console.log('Buget App v2 server is runing')
})