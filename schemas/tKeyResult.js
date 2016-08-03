var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var keyResultSchema = new Schema({
	id: mongoose.Schema.ObjectId,
	objectiveId: {type: mongoose.Schema.Types.ObjectId, ref: 'tObjective'},
	title: String
	score: Number,
	forks: Number,
	isDeleted: Boolean
});

module.exports = mongoose.model('tKeyResult', keyResultSchema);
