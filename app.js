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
var moment = require('moment');
// var upload = multer({ dest: 'uploads/' })
var db = require('./config/db');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

var upload = multer({ storage: storage })

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
app.use(express.static(path.join(__dirname, 'uploads')));

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

app.post('/post', upload.single('image'), function (req, res, next) {
  req.body.image = req.file.originalname;
  Post.create(req.body, function(err, response) {
    if (err) { 
      res.status(500).send({error: err})
    }
    res.status(200).send()
  });
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
    Post.aggregate([]).sample(3).exec(function(err, randomPosts) {
      var random = randomPosts.map(function(post) {
        var p = post;
        p.date = moment(post.createdAt).format('DD.MM.YYYY, HH:mm');
        return p;
      });
      var post = response;
      post.date = moment(post.createdAt).format('DD.MM.YYYY, HH:mm');
      res.render('post', { post: post, random: random });
    });
  });
});

app.get('/biography', function (req, res, next) {
  Post.aggregate([]).sample(3).exec(function(err, randomPosts) {
    var random = randomPosts.map(function(post) {
      var p = post;
      p.date = moment(post.createdAt).format('DD.MM.YYYY, HH:mm');
      return p;
    });

    res.render('bio', { random: random });
  });
});

app.get('/contacts', function (req, res, next) {
  Post.aggregate([]).sample(3).exec(function(err, randomPosts) {
    var random = randomPosts.map(function(post) {
      var p = post;
      p.date = moment(post.createdAt).format('DD.MM.YYYY, HH:mm');
      return p;
    });

    res.render('contacts', { random: random });
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
