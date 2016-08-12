var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var Objective = require('../schemas/objective');

var ObjectiveRepository = function() {
	Repository.prototype.constructor.call(this);
	this.model = Objective;
};

ObjectiveRepository.prototype = new Repository();

ObjectiveRepository.prototype.getAll = function(callback) {
	var model = this.model;
	var query = model.find({
		isApproved: true,
		isDeleted: false
	});

	query.exec(callback);
};

ObjectiveRepository.prototype.getAllDeleted = function(callback) {
	var model = this.model;
	var query = model.find({
		isDeleted: true
	});

	query.exec(callback);
};

ObjectiveRepository.prototype.getAllNotApproved = function(callback) {
	var model = this.model;
	var query = model.find({
		isDeleted: false,
		isApproved: false
	});

	query.exec(callback);
};

ObjectiveRepository.prototype.getByUserId = function(userId, callback) {
	var model = this.model;
	var query = model.find({ 
		createdBy: userId
	});
	
	query.exec(callback);
};

ObjectiveRepository.prototype.getAllApprovedByTitle = function(title, callback) {
	var model = this.model;
	var query = model.find({
		title: title,
		isApproved: true,
		isDeleted: false
	});
	
	query.exec(callback);
};

module.exports = new ObjectiveRepository();

