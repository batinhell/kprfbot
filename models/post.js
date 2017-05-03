var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    title: String,
    content: String,
    shortContent: String,
    image: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
});

module.exports = PostSchema;