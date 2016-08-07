var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userMentorSchema = new Schema({
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	mentorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
	},{
	timestamps: true
	});

module.exports = mongoose.model('UserMentor', userMentorSchema, 'usermentors');
