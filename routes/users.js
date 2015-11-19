//This ROUTES file will direct to the Users page, including a title

//link to express
var express = require('express');

//create a router object for routing
var router = express.Router();

// GET - Users page 
router.get('/', function(req, res, next) {
    //render the about me index page with a title
    res.render('users/login', {
        title: 'User Login'
    });
});

    //make this public
module.exports = router;