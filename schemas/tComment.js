var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	id: mongoose.Schema.ObjectId,
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'tUser'},
	objectiveId: {type: mongoose.Schema.Types.ObjectId, ref: 'tObjective'},
	text: String,
	isDeleted: Boolean,
	createDate: Date,
	editDate: Date
});

module.exports = mongoose.model('tComment', commentSchema);
