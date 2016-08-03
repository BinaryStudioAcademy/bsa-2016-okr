var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var Comment = require('../schemas/comment').model;

var CommentRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = Comment;
};

CommentRepository.prototype = new Repository();

CommentRepository.prototype.createComment = function(comment, queryString, callback) {

};

CommentRepository.prototype.getComment = function(id, queryString, callback) {

};

CommentRepository.prototype.getCommentByObjId = function(objectiveId, queryString, callback) {
	
};

CommentRepository.prototype.deleteComment = function(id, queryString, callback) {
	
};

