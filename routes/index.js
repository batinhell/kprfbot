var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  Post.find({}, null, {sort: '-createdAt'}, function(err, response) {
    if (err) { 
      res.status(500).send({error: err})
    }
    Post.aggregate([]).sample(3).exec(function(err, randomPosts) {
      var posts = response.map(function(post) {
        var p = post;
        p.date = moment(post.createdAt).format('DD.MM.YYYY, HH:mm');
        return p;
      });

      var random = randomPosts.map(function(post) {
        var p = post;
        p.date = moment(post.createdAt).format('DD.MM.YYYY, HH:mm');
        return p;
      });

      res.render('index', { posts: posts, random: random });
    });
  });
});

module.exports = router;
