var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historySchema = new Schema({
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	keyResult: {type: mongoose.Schema.Types.ObjectId, ref: 'KeyResult'},
	userObjective: {type: mongoose.Schema.Types.ObjectId, ref: 'UserObjective'},
	userKeyResult: Schema.Types.ObjectId,
	userKeyResultScore: Number,
	objective: {type: mongoose.Schema.Types.ObjectId, ref: 'Objective'},
	category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	type: String,
	updateFrom: {},
	updateTo: {}
}, {
    timestamps: true
});

module.exports = mongoose.model('History', historySchema);
