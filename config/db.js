var Load = require('../utils/load');
var UserSchema = Load.model('user');
var PostSchema = Load.model('post');

module.exports = {
	mongoose: require('mongoose'),
	init: function () {
		this.mongoose.model('User', UserSchema);
		this.mongoose.model('Post', PostSchema);
		return this;
	},
	connect: function (params) {
		this.mongoose.connect(params.url, params.options);
		return this;
	}
};