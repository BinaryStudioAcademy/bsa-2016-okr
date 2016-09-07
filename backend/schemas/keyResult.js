var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CONST = require('../config/constants');

var keyResultSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	objectiveId: {
		type: Schema.Types.ObjectId,
		ref: 'Objective',
		required: true
	},
	difficulty: {
		type: String,
		enum: [CONST.keyResult.EASY, CONST.keyResult.INTERMEDIATE, CONST.keyResult.ADVANCED],
		default: CONST.keyResult.INTERMEDIATE
	},
	used: {
		type: Number,
		default: 0,
		min: 0,
	},
	isApproved: {
		type: Boolean,
		default: false,
	},
	isDeclined: {
		type: Boolean,
		default: false,
	},
	isDeleted: {
		type:	Boolean,
		default: false,
	},
	deletedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: false,
	},
	deletedDate: {
		type: Date,
	}
}, {
    timestamps: true
});

keyResultSchema.index({ objectiveId: 1, title: 1 }, { unique: true });

module.exports = mongoose.model('KeyResult', keyResultSchema);
