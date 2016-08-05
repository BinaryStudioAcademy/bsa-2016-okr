var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	followObjectives: [
		{userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		objectiveId: {type: mongoose.Schema.Types.ObjectId, ref: 'Objective'}
	}],
	objectives: [
		description: String,
		{objectiveId: {type: mongoose.Schema.Types.ObjectId, ref: 'Objective'},
		keys: [{keyId: {type: mongoose.Schema.Types.ObjectId, ref: 'KeyResult'},
			score: Number,
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

module.exports = mongoose.model('User', userSchema);
