var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var keyResultSchema = new Schema({
	objectiveId: {type: mongoose.Schema.Types.ObjectId, ref: 'Objective'},
	title: String
	score: Number,
	forks: Number,
	difficulty: String,
	isApproved: Boolean,
	isDeleted: Boolean
});

module.exports = mongoose.model('KeyResult', keyResultSchema);
