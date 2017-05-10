var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { user: req.user });
});

router.get('/posts', function(req, res, next) {
  console.log('posts');
});

module.exports = router;