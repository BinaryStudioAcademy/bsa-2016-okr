var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'tUser'},
	localRole: String,
	globalRole: String
});

module.exports = mongoose.model('tRole', roleSchema);
