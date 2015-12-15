//This ROUTES file will direct to the About Me page, including a title

//link to express
var express = require('express');

//create a router object for routing
var router = express.Router();

var User = require('../models/user');

//GET - show the about me page
router.get('/', function(req, res, next) {
   //render the about me index page with a title
    res.render('aboutMe/index', {
        title: 'About Me',
        displayName: req.user ? req.user.displayName : ''
    });
});

//make this public
module.exports = router;