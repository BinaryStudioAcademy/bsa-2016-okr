var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historySchema = new Schema({
	authorId: {type: Schema.Types.ObjectId, ref: 'User'},
	typeId: Number,
	type: String,
	//date: Date
	date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', historySchema);
