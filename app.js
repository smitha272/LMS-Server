var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var login = require('./routes/login')
  // , routes = require('./routes')
  , session = require('client-sessions')
  , http = require('http')
  , path = require('path')
  , books = require('./routes/librarian/books')
    , patron =   require('./routes/patron/transaction');

var connectionpool = require('./routes/connectionpool');

var app = express();

// all environments
app.use(session({   
cookieName: 'session',    
secret: 'cmpe277_test_string',    
duration: 30 * 60 * 1000,    //setting the time for active session
activeDuration: 5 * 60 * 1000  }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', routes.index);
app.post('/signin',login.signin);
app.post('/signup',login.signup);
app.post('/logout',login.logout);

app.get('/activateUser',login.activateUser);

app.use('/book',books);
app.use('/patron',patron);


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
