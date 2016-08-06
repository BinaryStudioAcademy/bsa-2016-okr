var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var objectiveSchema = new Schema({
	createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
	title: String,
	cheers: [{userId: {type: Schema.Types.ObjectId, ref: 'User'}}],
	views: [{userId: {type: Schema.Types.ObjectId, ref: 'User'}}],
	forks: [{userId: {type: Schema.Types.ObjectId, ref: 'User'}}],
	isApproved: Boolean,
	isDeleted: Boolean
});

module.exports = mongoose.model('Objective', objectiveSchema);
