var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userObjective = new Schema({
	templateId: {type: Schema.Types.ObjectId, ref: 'Objective'},
	creator: {type: Schema.Types.ObjectId, ref: 'User'},
	keyResults: [{
		templateId: {type: Schema.Types.ObjectId, ref: 'Key'},
		score: Number,
		creator: {type: Schema.Types.ObjectId, ref: 'User'}
	}]
}, {
	timestamps: true;
});

module.exports = mongoose.model('UserObejctive', userObjective);