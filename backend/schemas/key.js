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
		enum: [CONST.key.EASY, CONST.key.INTERMEDIATE, CONST.key.ADVANCED],
		default: CONST.key.INTERMEDIATE
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

module.exports = mongoose.model('Key', keyResultSchema);
