var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var Objective = require('../schemas/objective');

var ObjectiveRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = Objective;
};

ObjectiveRepository.prototype = new Repository();

ObjectiveRepository.prototype.getByUserId = function(userId, callback) {
	var model = this.model;
	var query = model.find({'createdBy': userId});
	query.exec(callback);
};

module.exports = new ObjectiveRepository();

