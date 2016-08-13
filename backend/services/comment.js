var _ = require('lodash');
var CommentRepository = require('../repositories/comment.js');
var HistoryRepository = require('../repositories/history');
var async = require('async');

var CommentService = function(){
};

CommentService.prototype.add = function(authorId, comment, callback) {
	async.waterfall([
		(callback) => {
			CommentRepository.add(comment, (err, comment) => {
				if(err){
					return callback(err, null);
				};
				return callback(null, comment);
			});
		},
		(comment, callback) => {
			HistoryRepository.addCommentEvent(authorId, comment._id, comment.objectiveId, "add Comment", (err) =>{
				if(err){
					return callback(err, null);
				};
				return callback(null, comment);
			});
		}
	], (err, result) => {
		return callback(err, result);
	});
	//CommentRepository.add(comment, callback);
	//HistoryRepository.add(history, callback);
};

CommentService.prototype.delete = function(authorId, commentId, callback) {
	async.waterfall([
		(callback) => {
			CommentRepository.delete(commentId, (err, comment) => {
				if(err){
					return callback(err, null);
				};
				return callback(null, comment);
			});
		},
		(comment, callback) => {
			HistoryRepository.addCommentEvent(authorId, commentId, comment.objectiveId, "delete Comment", (err) =>{
				if(err){
					return callback(err, null);
				};
				return callback(null, comment);
			});
		}
	], (err, result) => {
		return callback(err, result);
	});
	//CommentRepository.add(comment, callback);
	//HistoryRepository.add(history, callback);
};

module.exports = new CommentService();