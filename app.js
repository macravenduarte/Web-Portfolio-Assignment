//require the NODE MODULES
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//require MONGOOSE, SESSION, FLASH and PASSPORT
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');

//check DB connection
var db = require('./server/config/db.js');
mongoose.connect(db.url); //Rename connection string for easier scripting
    //if the connection fails to display an error message
mongoose.connection.on('error', console.error.bind(console, 'DB Error: '));
    //if successful, the connection happens only once and prints confirmation to console
mongoose.connection.once('openUri', function(callback) {
        console.log('Connected to mongodb');
    });

//require CONTROLLERS
var routes = require('./server/routes/index');
//other pages
var aboutMe = require('./server/routes/aboutMe');
var contacts = require('./server/routes/contacts');
var projects = require('./server/routes/projects');
var services = require('./server/routes/services');
var users = require('./server/routes/users');

var app = express();

require('./server/config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session setup
app.use(session({
    secret: 'someSecret',
    saveUninitialized: true,
    resave: true
}));

// part of passport configuration
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//USE the pages you've created
app.use('/', routes);
app.use('/aboutMe', aboutMe);
app.use('/contacts', contacts);
app.use('/projects', projects);
app.use('/services', services);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
