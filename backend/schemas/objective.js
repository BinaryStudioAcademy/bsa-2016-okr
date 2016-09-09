var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CONST = require('../config/constants');
var ObjectId = Schema.Types.ObjectId;

var objectiveSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	category: {
		type: ObjectId,
		ref: 'Category',
		required: true,
	},
	defaultKeyResults: [{
			type: ObjectId,
			ref: 'KeyResult'
	}],
	creator: {
		required: true,
		type: ObjectId,
		ref: 'User'
	},
	used: {
		type: Number,
		default: 0,
		min: 0
	},
	isApproved: {
		type: Boolean,
		default: false
	},
	isDeclined: {
		type: Boolean,
		default: false
	},
	isDeleted: {
		type: Boolean,
		default: false
	},
	deletedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: false
	},
	deletedDate: {
		type: Date,
	}
}, {
    timestamps: true
});

objectiveSchema.index({ category: 1, title: 1 }, { unique: true });

module.exports = mongoose.model('Objective', objectiveSchema);
