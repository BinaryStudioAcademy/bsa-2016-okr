var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userObjective = new Schema({
	templateId: {
		type: Schema.Types.ObjectId,
		ref: 'Objective',
		required: true
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	deletedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: false
	},
	deletedDate: {},
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	isDeleted: Boolean,
	keyResults: [{
		templateId: {
			type: Schema.Types.ObjectId,
			ref: 'KeyResult',
			required: true
		},
		score: {
			type: Number,
			min: 0,
			max: 1,
			default: 0
		},
		creator: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		deletedBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: false
		},
		deletedDate: {},
		isDeleted: Boolean
	}]
}, {
	timestamps: true
});

module.exports = mongoose.model('UserObjective', userObjective);
