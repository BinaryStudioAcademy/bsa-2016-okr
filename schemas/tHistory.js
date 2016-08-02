var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historySchema = new Schema({
	historyId: mongoose.Schema.ObjectId,
	authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'tUser'}, // userId
  typeId: Number,
  type: String,
  date: Date
});

module.exports = mongoose.model('tHistory', historySchema);
