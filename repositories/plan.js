var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var Plan = require('../schemas/plan').model;

var PlanRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = Plan;
};

PlanRepository.prototype = new Repository();

PlanRepository.prototype.getByUserId = function(userId,callback) {
	var model = this.model;
	var query = model.findOne({'userId': userId})
	query.exec(callback);
};

module.exports = new PlanRepository();
