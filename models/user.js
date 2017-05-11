/*!
 * Module dependencies
 */

var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

/**
 * User schema
 */

var UserSchema = mongoose.Schema({
    login: String,
    password: String,
});


/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) { return next(); }
    bcrypt.genSalt(5, function(err, salt) {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

/**
 * Methods
 */

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

/**
 * Statics
 */

UserSchema.static({

});

/**
 * Expose
 */

module.exports = UserSchema;