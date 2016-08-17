var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new Schema({
	localRole: String,
	globalRole: String
});

module.exports = mongoose.model('Role', roleSchema);