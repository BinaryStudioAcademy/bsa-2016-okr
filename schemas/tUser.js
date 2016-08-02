var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	userId: mongoose.Schema.ObjectId,
	followObjectives: [{objectiveId: {type: mongoose.Schema.Types.ObjectId, ref: 'tObjective'}}],
  objectives: [
    {objectiveId: {type: mongoose.Schema.Types.ObjectId, ref: 'tObjective'},
    keys: [{keyId: {type: mongoose.Schema.Types.ObjectId, ref: 'tKey'}}],
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'tCategory'},
    status: Number
  }],
  mentor: {type: mongoose.Schema.Types.ObjectId, ref: 'tUserMentor'},
  lastVisitDate: Date,
  historyWatchDate: Date
});

module.exports = mongoose.model('tUser', userSchema);
