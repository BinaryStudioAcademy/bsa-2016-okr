var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	followObjectives: [
		{userId: {type: Schema.Types.ObjectId, ref: 'User'},
		objectiveId: {type: Schema.Types.ObjectId, ref: 'Objective'}
	}],
	objectives: [{
		description: String,
		objectiveId: {type: Schema.Types.ObjectId, ref: 'Objective'},
		keys: [{keyId: {type: Schema.Types.ObjectId, ref: 'KeyResult'},
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
}, {
	timestamps: true
});

module.exports = mongoose.model('User', userSchema);
