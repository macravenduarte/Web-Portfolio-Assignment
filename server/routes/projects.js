//This ROUTES file will direct to the Projects page, including a title

//link to express
var express = require('express');

//create a router object for the page path
var router = express.Router();

var User = require('../models/user');

//GET - show the projects page
router.get('/', function(req, res, next) {
    //render the projects view page with a title
    res.render('projects/index', {
        title: 'Projects',
        displayName: req.user ? req.user.displayName : ''
    });  
});

//make this public
module.exports = router;