var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var Plan = require('../schemas/plan').model;

var PlanRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = Plan;
};

PlanRepository.prototype = new Repository();

PlanRepository.prototype.getAllPlans = function(queryString, callback) {
	this.getAll(callback);
};

PlanRepository.prototype.createPlan = function(plan, queryString, callback) {
	this.add(plan, callback);
};

PlanRepository.prototype.getPlanById = function(id, queryString, callback) {
	this.getById(id, callback);
};

PlanRepository.prototype.updatePlan = function(id, body, queryString, callback) {
	this.update(id, body, callback);
};

PlanRepository.prototype.getPlanByUserId = function(userId, queryString, callback) {
	Plan.findOne({'userId': userId}).exec(callback);
};

module.exports = new PlanRepository();
