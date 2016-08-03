var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
	id: mongoose.Schema.ObjectId,
	title: String,
	isDeleted: Boolean
});

module.exports = mongoose.model('tCategory', categorySchema);
