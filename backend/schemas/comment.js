var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	userId: {type: Schema.Types.ObjectId, ref: 'User'},
	objectiveId: {type: Schema.Types.ObjectId, ref: 'Objective'},
	text: String,
	isDeleted: Boolean,
	createDate: Date,
	editDate: Date
});

module.exports = mongoose.model('Comment', commentSchema);
