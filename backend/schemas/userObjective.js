var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userObjective = new Schema({
	title: {
		type: String
	},
	description: {
		type: String
	},
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
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	isArchived: {
		type: Boolean,
		default: false,
	},
	isDeleted: {
		type: Boolean,
		default: false,
	},
	deletedDate: {
		type: Date,
	},
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
		deletedDate: {
			type: Date,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		}
	}]
}, {
	timestamps: true
});

userObjective.index({ userId: 1,  templateId: 1 }, { unique: true });

module.exports = mongoose.model('UserObjective', userObjective);
