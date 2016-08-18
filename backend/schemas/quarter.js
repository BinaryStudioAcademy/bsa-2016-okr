var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var date = new Date();
var minYear = date.getFullYear();

var quarterSchema = new Schema({
	year: {
		required: true,
		type: Number,
		min: minYear,
		max: minYear + 1
	},
	index: {
		required: true,
		type: Number,
		min: 1,
		max: 4
	},
	user: {
		type: Schema.Types.ObjectId, 
		ref: 'User'
	}, 
	userObjectives: [{
		type: Schema.Types.ObjectId, 
		ref: 'Objective'
	}]
}, {
	timestamps: true
});

module.exports = mongoose.model('Quarter', quarterSchema);