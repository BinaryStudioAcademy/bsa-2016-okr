var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var keyResultSchema = new Schema({
	objectiveId: {type: Schema.Types.ObjectId, ref: 'Objective'},
	title: String,
	score: Number,
	forks: Number,
	difficulty: String,
	isApproved: Boolean,
	isDeleted: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Key', keyResultSchema);
