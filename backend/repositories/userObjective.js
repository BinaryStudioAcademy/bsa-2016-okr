var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var User = require('../schemas/userObjective');

var UserObjective = function(){
	Repository.prototype.constructor.call(this);
	this.model = UserObjective;
};

UserRepository.prototype = new Repository();

module.exports = new UserRepository();