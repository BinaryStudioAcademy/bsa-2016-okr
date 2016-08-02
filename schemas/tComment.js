var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	commentId: mongoose.Schema.ObjectId,
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'tUser'},
  objectiveId: {type: mongoose.Schema.Types.ObjectId, ref: 'tObjective'},
  text: String,
  createDate: Date // ??? комменту потрібна дата чи ні?
});

module.exports = mongoose.model('tComment', commentSchema);
