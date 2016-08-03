var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var User = require('../schemas/user').model;

var UserRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = User;
};

UserRepository.prototype = new Repository();

UserRepository.prototype.getAllUsers = function(queryString, callback) {
	User.getAll(callback);
};

UserRepository.prototype.getUser = function(id, queryString, callback) {
	User.getById(id, callback);
};

UserRepository.prototype.createUser = function(user, queryString, callback) {
	User.add(user, callback);	
};

UserRepository.prototype.updateUser = function(id, body, queryString, callback) {
	User.update(id, body);
};

