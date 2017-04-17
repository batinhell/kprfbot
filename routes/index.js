var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

/* GET home page. */
router.get('/', function(req, res, next) {
  Post.find({}, function(err, response) {
    if (err) { 
      res.status(500).send({error: err})
    }
    res.render('index', { posts: response });
  });
});

module.exports = router;
