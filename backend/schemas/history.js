var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historySchema = new Schema({
	authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	keyResult: {type: mongoose.Schema.Types.ObjectId, ref: 'KeyResult'},
	objectiveId: {type: mongoose.Schema.Types.ObjectId, ref: 'Objective'},
	commentId: {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'},
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	planId: {type: mongoose.Schema.Types.ObjectId, ref: 'Plan'},
	categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
	type: String,
	updateFrom: {},
	updateTo: {}
}, {
    timestamps: true
});

module.exports = mongoose.model('History', historySchema);
