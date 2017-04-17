var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var db = require('./config/db');


var url = 'mongodb://127.0.0.1/kprfbot';
var options = { server: { socketOptions: { keepAlive: 1 } } };
var params = {
    options: options,
    url: url
};

// Connect to mongodb
db.init().connect(params);
mongoose.connection.on('error', console.log);
var Auth = require('./config/passport');
var Post = mongoose.model('Post');

var index = require('./routes/index');
var login = require('./routes/login');
var dashboard = require('./routes/dashboard');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({
    secret: 'keyboard secure cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/login', login);
app.use('/dashboard', dashboard);
// upload.single('image')
app.post('/post', function (req, res, next) {
  console.log(req.body)
  Post.create(req.body, function(err, response) {
    console.log(err)
    console.log(response)
    if (err) { 
      res.status(500).send({error: err})
    }
    res.status(200).send()
  });
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});

app.get('/post', function (req, res, next) {
  Post.find({}, function(err, response) {
    if (err) { 
      res.status(500).send({error: err})
    }
    res.render('post', { posts: response[0] });
  });
});

app.get('/post/:id', function (req, res, next) {
  Post.findById(req.params.id, function(err, response) {
    if (err) { 
      res.status(500).send({error: err})
    }
    res.render('post', { post: response });
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
