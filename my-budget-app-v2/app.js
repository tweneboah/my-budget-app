const express = require('express');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const Budget = require('./models/Budget');
const User = require('./models/User')
const Comment = require('./models/Comment')
const passport = require('passport');
const LocalStrategy = require('passport-local');

const app = express();



//===============
// MIDDLEWARES
//================
app.use(bodyParser.urlencoded({ extended: true}));
app.set("view engine", "ejs");


//DB CONNECT
mongoose.connect('mongodb://localhost/Budget-App-V2', {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log("DB Connected successfully"));


//Passport configurations
app.use(require('express-session')({
    secret:'Am emmanuel for Dev',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())




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
    //Get data from the form
   
       let income = req.body.income
       let  expenses = req.body.expense
       let  description = req.body.description
       let image = req.body.image

       let  author = {
            id: req.user.id,
            username: req.user.username
        }
    const newlyCreatedBudgetWithUser = {
         income: income,
         expenses: expenses,
         description: description,
         image: image,
         author: author
    }

   Budget.create( newlyCreatedBudgetWithUser,  (err, newBudgetcreated) => {
        if(err) {
            console.log(err)
        }else {
           console.log(newBudgetcreated)
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
              //res.send(budgets)
            res.render('budgets', {budgets: budgets})
        }
    })


})


//=============
//SHOW MORE
//=============

app.get('/budget/:id', (req, res) => {
     Budget.findById(req.params.id).populate('comments').exec(function(err, budget){
          if(err){
              console.log(err)
          }else {
              console.log('Budget with comments and author', budget)
             res.render('show', {budget: budget})
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
                   res.redirect(`/budget/ ${foundBudget._id}` )
                     console.log(foundBudget)
               }
            })

           
         }
     })
})




//===============
// USERS REGISTRATION
//===============

//1. Get the Registration form
app.get('/budget/user/register/new', (req, res) => {
    res.render('register')
})

//2. Registration Logic
app.post('/budget/user/register', (req, res) => {
    let newUser = {
        username: req.body.username
    }

    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log(err)
        }else {
            passport.authenticate('local')(req, res, () => {
                res.send(user)
            })
        }
    })
})



//=================
//LOGIN
//================

//1.Get Login form

app.get('/budget/user/login/new', (req, res) => {
     res.render('login')
})

// app.post('/budget/user/login', passport.authenticate('local', {
//     successRedirect: '/budget',
//     failureRedirect: '/budget/user/login'
// }), (req, res) => {

// }


app.post('/budget/user/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/budget/user/login'
}), (req, res) => {
     
})





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`The Budget App V2 server has started on port ${PORT}`)
})