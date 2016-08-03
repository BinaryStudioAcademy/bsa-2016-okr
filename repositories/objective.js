var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var Objective = require('../schemas/objective').model;

var ObjectiveRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = Objective;
};

ObjectiveRepository.prototype = new Repository();

ObjectiveRepository.prototype.getAllObjectives = function(queryString, callback) {
	this.getAll(callback);
};

ObjectiveRepository.prototype.createObjective = function(objective, queryString, callback) {
	this.add(objective, callback);
};

ObjectiveRepository.prototype.getObjective = function(id, queryString, callback) {
	this.getById(id, callback);
};

ObjectiveRepository.prototype.updateObjective = function(objectiveId, body, queryString, callback) {
	this.update(objectiveId, body, callback);
};

ObjectiveRepository.prototype.getObjectiveByUserId = function(userId, queryString, callback) {
	Objective.find({'createdBy': userId}).exec(callback);
};

module.exports = new ObjectiveRepository();

