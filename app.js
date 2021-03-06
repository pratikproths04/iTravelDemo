
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , favicon = require('static-favicon')
  , logger = require('morgan')
  , ejs=require('ejs')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , mongo = require('./routes/mongo')
  , mysql = require('./routes/mysql')
  , signUp = require('./routes/signUp')
  , logIn = require('./routes/logIn')
  , home = require('./routes/home')
  , profile = require('./routes/profile')
  , users = require('./routes/users')
  , config = require('./routes/config');

/** URL for the sessions collections in mongoDB **/
var mongoSessionConnectURL = "mongodb://"+config.mongoDB.username+":"+config.mongoDB.password+"@"+config.mongoDB.host+":"+config.mongoDB.port+"/"+config.mongoDB.database;
//var mongoSessionConnectURL = "mongodb://localhost:27017/iTravelDB";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var app = express();

/** Assigning Port **/
app.set('port', process.env.PORT || config.server.port);

/** View Engine Setup**/
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));

/** Parsing Url**/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

/** Sessions**/
app.use(expressSession({
	secret: 'secret_string',
	resave: false,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));

/**Handling Routing and Delegating Calls**/
app.get('/', logIn.goToLogInPage);
app.get('/logIn', logIn.goToLogInPage);
app.get('/signUp', signUp.goToSignUpPage);
app.post('/signUp', signUp.afterSignUpPage);
app.post('/logIn', logIn.afterLogInPage);
app.get('/logOut', home.goToLogoutPage);
app.get('/home', home.goToHomePage);
app.get('/profile', profile.goToProfilePage);
app.get('/profile/getUserDetails', profile.fetchUserData);
app.post('/profile/updateUserDetails', profile.updateUserData);
app.get('/users', users.getAllUsers);
app.get('/users/:email', users.getUser);
app.post('/users/:email', users.updateUser);


/** Error Handling **/
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/** Creating Server **/
mongo.connect(mongoSessionConnectURL, function(){
	console.log('Connected to mongo at: ' + mongoSessionConnectURL);
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});
});
