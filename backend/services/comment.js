var _ = require('lodash');
var CommentRepository = require('../repositories/comment.js');
var HistoryRepository = require('../repositories/history.js');


var CommentService = function(){
};

CommentService.prototype.addComment = function(comment, history, callback) {
	CommentRepository.add(comment, callback);
	HistoryRepository.add(history, callback);
};