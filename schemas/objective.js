var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var objectiveSchema = new Schema({
	createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	title: String,
	description: String,
	cheers: [{userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}}],
	createDate: Date,
	editDate: Date,
	views: [{userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}}],
	forks: Number,
	isApproved: Boolean,
	isDeleted: Boolean
});

module.exports = mongoose.model('Objective', objectiveSchema);
