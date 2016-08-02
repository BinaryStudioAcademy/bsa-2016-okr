var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var planSchema = new Schema({
	planId: mongoose.Schema.ObjectId,
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'tUser'},
  objectives: [{objectiveId: {type: mongoose.Schema.Types.ObjectId, ref: 'tObjective'}}],
  title: String
});

module.exports = mongoose.model('tPlan', planSchema);
