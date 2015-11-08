//This ROUTES file will direct to the Contacts page, including a title

//link to express
var express = require('express');

//create a router object for the page path
var router = express.Router();

//GET - show the about me page
router.get('/', function(req, res, next) {
   //render the contact me index page with a title
    res.render('contacts/index', {
       title: 'Contact Me' 
    });
});

//make this public
module.exports = router;