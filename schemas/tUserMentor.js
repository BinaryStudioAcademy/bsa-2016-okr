var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userMentorSchema = new Schema({
	id: mongoose.Schema.ObjectId,
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'tUser'},
  mentorId: Number
});

module.exports = mongoose.model('tUserMentor', userMentorSchema);
