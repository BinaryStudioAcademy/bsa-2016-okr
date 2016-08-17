var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quarterSchema = new Schema({
	year: Number,
	index: Number,
	user: {type: Schema.Types.ObjectId, ref: 'User'}, 
	userObjective: {
		templateId: {type: Schema.Types.ObjectId, ref: 'Objective'},
		creatorId: {type: Schema.Types.ObjectId, ref: 'User'},
		keyResults: [{
			templateId: {type: Schema.Types.ObjectId, ref: 'Key'},
			score: Number,
			creator: {type: Schema.Types.ObjectId, ref: 'User'}
		}]
	}
}, {
	timestamps: true
});

module.exports =mongoose.model('Quarter', quarterSchema);