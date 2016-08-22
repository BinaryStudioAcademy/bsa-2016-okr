var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	localRole: String,
	mentor: {type: Schema.Types.ObjectId, ref: 'User'},
	userInfo: {type: Schema.Types.ObjectId, ref: 'UserInfo'}
}, {
	timestamps: true
});

module.exports = mongoose.model('User', userSchema);
