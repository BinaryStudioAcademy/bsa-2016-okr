var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var objectiveSchema = new Schema({
	createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	title: String,
	description: String,
	keys: [{keyId: {type: mongoose.Schema.Types.ObjectId, ref: 'Key'}}],
	cheers: [{userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}}],
	views: [{userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}}],
	forks: Number,
	isApproved: Boolean,
	isDeleted: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Objective', objectiveSchema);
