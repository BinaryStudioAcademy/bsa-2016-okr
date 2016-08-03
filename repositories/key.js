var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var Key = require('../schemas/key').model;

var KeyRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = Key;
};

CommentRepository.prototype = new Repository();

CommentRepository.prototype.createKey = function(key, queryString, callback) {
	Key.add(key, callback);
};

CommentRepository.prototype.updateKey = function(id, body, queryString, callback) {
	Key.update(id, body, callback);
};