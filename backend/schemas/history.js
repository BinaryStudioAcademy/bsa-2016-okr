var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historySchema = new Schema({
	authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	keyId: {type: mongoose.Schema.Types.ObjectId, ref: 'Key'},
	objectiveId: {type: mongoose.Schema.Types.ObjectId, ref: 'Objective'},
	type: String,
	date: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('History', historySchema);
