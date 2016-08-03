var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var User = require('../schemas/tUser').model;

var UserRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = User;
};

UserRepository.prototype = new Repository();

UserRepository.prototype.getAllUsers = function(queryString, callback) {
	this.getAll(callback);
};

UserRepository.prototype.getUser = function(id, queryString, callback) {
	this.getById(id, callback);
};

UserRepository.prototype.createUser = function(user, queryString, callback) {
	this.add(user, callback);	
};

UserRepository.prototype.updateUser = function(id, body, queryString, callback) {
	this.update(id, body, callback);
};

module.exports = new UserRepository();