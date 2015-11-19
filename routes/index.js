//This ROUTES file will direct to the Home page, including a title

//link to express
var express = require('express');

//create a router object for routing
var router = express.Router();

//GET - home page
router.get('/', function(req, res, next) {
    //render the main index page with a title
    res.render('index', { 
        title: 'Web Portfolio' 
    });
});

module.exports = router;