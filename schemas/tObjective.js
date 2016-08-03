var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var objectiveSchema = new Schema({
	id: mongoose.Schema.ObjectId,
	createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'tUser'},
	title: String,
	description: String,
	cheers: [{userId: {type: mongoose.Schema.Types.ObjectId, ref: 'tUser'}}],
	createDate: Date,
	editDate: Date,
	views: [{userId: {type: mongoose.Schema.Types.ObjectId, ref: 'tUser'}}],
	forks: Number,
	isDeleted: Boolean
});

module.exports = mongoose.model('tObjective', objectiveSchema);
