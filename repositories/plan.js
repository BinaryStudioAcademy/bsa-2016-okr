var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var Plan = require('../schemas/plan').model;

var PlanRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = Plan;
};

PlanRepository.prototype = new Repository();

PlanRepository.prototype.getAllPlans = function(queryString, callback) {
};

PlanRepository.prototype.getPlanById = function(id, queryString, callback) {
};

PlanRepository.prototype.updatePlan = function(id, body, queryString, callback) {
};

PlanRepository.prototype.getPlanByUserId = function(userId, queryString, callback) {
};

