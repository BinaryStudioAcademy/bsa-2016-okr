var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	id: mongoose.Schema.ObjectId,
	followObjectives: [
	{userId: {type: mongoose.Schema.Types.ObjectId, ref: 'tUser'},
	objectiveId: {type: mongoose.Schema.Types.ObjectId, ref: 'tObjective'}
	}],
	objectives: [
    {objectiveId: Number,
    keys: [{keyId: Number,
			title: String,
			score: Number,
			forks: Number
			}],
    category: String,
		score: Number,
		status: Number,
		feedback: String
  }],
	lastVisitDate: Date,
	historyWatchDate: Date,
	isDeleted: Boolean
});

module.exports = mongoose.model('tUser', userSchema);
