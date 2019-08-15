const express = require('express');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const Budget = require('./models/Budget');
const Comment = require('./models/Comment')

const app = express();



//===============
// MIDDLEWARES
//================
app.use(bodyParser.urlencoded({ extended: true}));
app.set("view engine", "ejs");


mongoose.connect('mongodb://localhost/Budget-App-V2', {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log("DB Connected successfully"));


//=============
// HOME PAGE
app.get('/', (req, res) => {
    console.log(Budget)
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
    //Get data from the form
    const newBudget = {
        income: req.body.income,
        expenses: req.body.expense,
        description: req.body.description,
        image: req.body.image
    }

   Budget.create(newBudget, (err, newBudgetcreated) => {
        if(err) {
            console.log(err)
        }else {
           
            res.redirect('/budget')
        }
   })
})


//========================
// GET ALL BUDGET
//========================

app.get('/budget', (req, res) => {
    Budget.find({}, (err, budgets) => {
        if(err){
            console.log(err)
        }else {
             // res.send(budgets)
            res.render('budgets', {budgets: budgets})
        }
    })
})


//======
//SHOW MORE
//==========

app.get('/budget/:id', (req, res) => {
     Budget.findById(req.params.id).populate('comments').exec(function(err, budget){
          if(err){
              console.log(err)
          }else {
              res.send(budget)
          }
     })
});


app.get('/budget/:id/comment/new', (req, res) => {

    Budget.findById(req.params.id, (err, foundBudget) => {
        if(err){
            console.log(err)
        }else {
            console.log(foundBudget)
             res.render('createComment', {
                 budget: foundBudget
             });
        }
    })
    
})


app.post('/budget/:id/comment', (req, res) => {
     Budget.findById(req.params.id, (err, foundBudget) => {
         if(err){
             console.log(err)
         }else {

            const newComments = {
                text: req.body.text,
                author: req.body.author
            }

            Comment.create(newComments, (err, newlyCreatedComment) => {
               if(err){
                   console.log(err)
               }else {
                   newlyCreatedComment.save()
                   foundBudget.comments.push(newlyCreatedComment)
                   foundBudget.save()
                     console.log(foundBudget)
               }
            })

           
         }
     })
})






//========
// COMMENTS
//==========



//===============
// USERS REGISTRATION
//===============



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`The Budget App V2 server has started on port ${PORT}`)
})