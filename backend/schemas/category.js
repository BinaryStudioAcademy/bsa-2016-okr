var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
	title: {
		type: String,
		unique: true,
		required: true
	},
	isDeleted: {
		type: Boolean
	},
	deletedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: false
	},
	deletedDate: {}
});

module.exports = mongoose.model('Category', categorySchema);
