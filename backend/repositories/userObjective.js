var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var UserObjective = require('../schemas/userObjective');

var UserObjectiveRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = UserObjective;
};

UserObjectiveRepository.prototype = new Repository();

module.exports = new UserObjectiveRepository();