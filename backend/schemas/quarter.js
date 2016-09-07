var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CONST = require('../config/constants');

var date = new Date();

var quarterSchema = new Schema({
	year: {
		required: true,
		type: Number,
		min: CONST.currentYear,
		max: CONST.currentYear + 1
	},
	index: {
		required: true,
		type: Number,
		min: 1,
		max: 4
	},
	userId: {
		type: Schema.Types.ObjectId, 
		ref: 'User'
	}, 
	userObjectives: [{
		type: Schema.Types.ObjectId, 
		ref: 'UserObjective'
	}]
}, {
	timestamps: true
});

quarterSchema.index({ userId: 1, year: 1, index: 1 }, { unique: true });

module.exports = mongoose.model('Quarter', quarterSchema);