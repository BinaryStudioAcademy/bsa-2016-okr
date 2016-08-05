var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var User = require('../schemas/user').model;

var UserRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = User;
};

UserRepository.prototype = new Repository();

module.exports = new UserRepository();