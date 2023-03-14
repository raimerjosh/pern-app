// As long as this app is in development, it will set our env variables as "process.env"
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const initializePassport = require('./passport-config');
const session = require('express-session');
const methOverride = require('method-override');
const PORT = 3000;
const app = express();

const users = [];

initializePassport(
    passport, 
    email => users.find(user => email === user.email),
    id => users.find(user => id === user.id));

// Tells our application to take form info like name, email, password and access them inside the REQUEST variable, when we make post requests. The name field in our form is what comes after req.body.<name field>. 

// Allows json formatted request body to be parsed
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }));

// Allows us to logout by using a DELETE request, because HTML doesn't support delete requests as a method
app.use(methOverride('_method'));

app.use(cors());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());


//Routes
app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    console.log(req.isAuthenticated())
    res.send({'test': 'test'})
})

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.send(users)
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        res.redirect('/login')
    } catch (error){
        res.status(500).json(false)
    }
})


app.delete('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  })

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    } 
    next()
}

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
