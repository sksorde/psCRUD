var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var fileUpload = require('express-fileupload');		// Added by Parag for import functionality


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/employee')
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));

var index = require('./routes/index');
var users = require('./routes/users');
var employees = require('./routes/employees');
var home = require('./routes/home');	//added by Parag
var incidents = require('./routes/incidents');	//added by Parag
var exporttocsv = require('./routes/exporttocsv');	//added by Parag

var importcsv = require('./routes/importcsv');	//added by Parag


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());	// Added by Parag for file import functionality
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/employees', employees);
app.use('/incident', employees);	//added by Parag
app.use('/home', home);		//added by Parag
app.use('/exportcsv', exporttocsv);		//added by Parag for export functionality

app.use('/import', importcsv);		//added by Parag for export functionality



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
