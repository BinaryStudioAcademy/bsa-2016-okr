var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
	title: String,
	isDeleted: Boolean
});

module.exports = mongoose.model('Category', categorySchema);
