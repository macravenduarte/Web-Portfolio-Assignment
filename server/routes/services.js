//This ROUTES file will direct to the Services page, including a title

//link to express
var express = require('express');

//create a router object for routing
var router = express.Router();

var User = require('../models/user');

//GET - show the services page
router.get('/', function(req, res, next) {
   //render the services view page with a title
    res.render('services/index', {
        title: 'Services',
        displayName: req.user ? req.user.displayName : ''
    });
});

//make this public
module.exports = router;