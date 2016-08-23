var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userInfo = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	globalRole: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('UserInfo', userInfo);
