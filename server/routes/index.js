//This ROUTES file will direct to the Home page, including a title

//require to express and passport
var express = require('express');
var passport = require('passport');

//create a router object for routing
var router = express.Router();

var User = require('../models/user');

//GET - home page
router.get('/', function(req, res, next) {
    //render the main index page with a title
    res.render('index', { 
        title: 'Web Portfolio',
        displayName: req.user ? req.user.displayName : ''
    });
});

//Render Login Page
router.get('/login', function (req, res ,next){

    if (!req.user) {
        res.render('login', {
            title:'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/users');
    }

});

/* Process the Login Request */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/users',
    failureRedirect: '/login',
    failureFlash: true
}));

/* Show Registration Page */
router.get('/register', function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/');
    }
});

/* POST signup data. */
router.post('/register', passport.authenticate('local-registration', {
    //Success go to Profile Page / Fail go to Signup page
    successRedirect : '/users',
    failureRedirect : '/register',
    failureFlash : true
}));


/* Process Logout Request */
router.get('/logout', function (req, res){
    req.logout();
    res.redirect('/');
});

//make this public
module.exports = router;