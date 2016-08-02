var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var keySchema = new Schema({
	keyId: mongoose.Schema.ObjectId,
  objectiveId: {type: mongoose.Schema.Types.ObjectId, ref: 'tObjective'},
  title: String,
  score: Number,
  forks: Number
});

module.exports = mongoose.model('tKey', keySchema);
