//This ROUTES file will direct to the Contacts page, including a title

//link to express and passport
var express = require('express');
var passport = require('passport');

//create a router object for the page path
var router = express.Router();

var User = require('../models/user');

//GET - show the about me page
router.get('/', function(req, res, next) {
   //render the contact me index page with a title
    res.render('contacts/index', {
        title: 'Contact Me',
        displayName: req.user ? req.user.displayName : ''
    });
});

//make this public
module.exports = router;