var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var Objective = require('../schemas/objective').model;

var ObjectiveRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = Objective;
};

ObjectiveRepository.prototype = new Repository();

ObjectiveRepository.prototype.getAllObjectives = function(queryString, callback) {
};

ObjectiveRepository.prototype.getObjective = function(id, queryString, callback) {
};

ObjectiveRepository.prototype.updateObjective = function(objectiveId, queryString, callback) {
	
};

ObjectiveRepository.prototype.getObjectiveByUserId = function(userId, queryString, callback) {
	
};

