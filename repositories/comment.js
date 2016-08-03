var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var Comment = require('../schemas/comment').model;

var CommentRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = Comment;
};

CommentRepository.prototype = new Repository();

CommentRepository.prototype.createComment = function(comment, queryString, callback) {
	this.add(comment, callback);
};

CommentRepository.prototype.getCommentById = function(id, queryString, callback) {
	this.getById(id, callback);
};

CommentRepository.prototype.getCommentByObjId = function(objectiveId, queryString, callback) {
	Comment.find({'objectiveId': objectiveId}).exec(callback);
};

CommentRepository.prototype.deleteComment = function(id, queryString, callback) {
	this.delete(id, callback);
};

module.exports = new CommentRepository();