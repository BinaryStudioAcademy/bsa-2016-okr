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
	isApproved: {
		type: Boolean,
		default: false
	},
	isDeleted: {
		type:	Boolean,
		default: false
	}
}, {
    timestamps: true
});

module.exports = mongoose.model('KeyResult', keyResultSchema);
