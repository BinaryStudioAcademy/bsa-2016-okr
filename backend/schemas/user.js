var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	globalId: Schema.Types.ObjectId,
	localRole: {
		type: String,
		required: true,
	},
	mentor: {
		type: Schema.Types.ObjectId, 
		ref: 'User'
	},
	userInfo: {
		type: Schema.Types.ObjectId, 
		ref: 'UserInfo',
		required: true,
	},
}, {
	timestamps: true
});

module.exports = mongoose.model('User', userSchema);
