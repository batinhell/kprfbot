var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next) {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/qwe',
    }, function(err, user, info) {
        console.log('error', err);
        console.log('user', user);
        if (err) { return next(err); }
        if (!user) { return res.status(401).render('login'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.render('dashboard');
        });
    })(req, res, next);
});

router.get('/logout', function (req, res) {
	req.logout();
  res.status(200).redirect('/');
});

router.get('/create', function(req, res, next) {
  User.create({login: 'admin', password: 'c8bw7$e995TS'}, function(err, user) {
    console.log(err);
    console.log(user);
  })
});

module.exports = router;
