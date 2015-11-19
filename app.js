//require the NODE MODULES
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//additions usd for AUTHENTICATION
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');
var session = require('express-session');

//route aliases
//home page
var routes = require('./routes/index');
//other pages
var aboutMe = require('./routes/aboutMe');
var contacts = require('./routes/contacts');
var projects = require('./routes/projects');
var services = require('./routes/services');
var users = require('./routes/users');

var app = express();

require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Session setup
app.use(session({
    secret: 'someSecret',
    saveUninitialized: true,
    resave: true
}));

//part of passport configuration
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

//Connect LOCALLY with mongoose
mongoose.connect('mongodb://localhost/test');

//Connect LIVE
//mongoose.connect('mongodb://<username>:<password>@ds048368.mongolab.com:48368/comp-2068');
                     
//check DB connection
var db = mongoose.connection;
    
    //if the connection fails to display an error message
    db.on('error', console.error.bind(console, 'DB Error: '));
    //if successful, the connection happens only once and prints confirmation to console
    db.once('open', function (callback) {
        console.log('Connected to mongodb');
    });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
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
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
