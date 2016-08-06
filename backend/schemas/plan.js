var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var planSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  objectives: {
    1: [{userId: {type: Schema.Types.ObjectId, ref: 'Objective'}}],
    2: [{userId: {type: Schema.Types.ObjectId, ref: 'Objective'}}],
    3: [{userId: {type: Schema.Types.ObjectId, ref: 'Objective'}}],
    4: [{userId: {type: Schema.Types.ObjectId, ref: 'Objective'}}]
  },
	title: String,
	isDeleted: Boolean
});

module.exports = mongoose.model('Plan', planSchema);
