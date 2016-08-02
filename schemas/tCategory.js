var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
	categoryId: mongoose.Schema.ObjectId,
  title: String,
  isRemovable: Boolean
});

module.exports = mongoose.model('tCategory', categorySchema);
