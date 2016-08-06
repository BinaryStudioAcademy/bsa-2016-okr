var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var objectiveSchema = new Schema({
	createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	title: String,
	cheers: [{userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}}],
	views: [{userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}}],
	forks: [{userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}}],,
	isApproved: Boolean,
	isDeleted: Boolean
});

module.exports = mongoose.model('Objective', objectiveSchema);
