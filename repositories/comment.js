var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var Comment = require('../schemas/comment').model;

var CommentRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = Comment;
};

CommentRepository.prototype = new Repository();

CommentRepository.prototype.getCommentByObjId = function(objectiveId, callback) {
	var model = this.model;
	var query = model.find({'objectiveId': objectiveId});
	query.exec(callback);
};


module.exports = new CommentRepository();