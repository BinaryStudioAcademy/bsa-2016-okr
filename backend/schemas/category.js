var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	isDeleted: {
		type: Boolean,
		default: false,
	},
	deletedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: false
	},
	deletedDate: {
		type: Date,
		required: false,
	}
});

module.exports = mongoose.model('Category', categorySchema);
