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
	
	model
		.find({
			isApproved: true,
			isDeleted: false
		})
		.exec(callback);
};

ObjectiveRepository.prototype.getAllPopulate = function(callback) {
	var model = this.model;
	
	model
		.find({
			isApproved: true,
			isDeleted: false
		})
		.populate('keyResults', null, {isDeleted: false})
		.populate('category')
		.exec(callback);
};

ObjectiveRepository.prototype.autocomplete = function(title, categoryId, callback) {
	var model = this.model;
	var options = {
		isApproved: true,
		isDeleted: false,
		category: categoryId 
	};

	var fields = {
		title: true,
		description: true,
		category: true,
		used: true,
		keyResults: true
	};

	if(title) {
		options.title = new RegExp(title, 'i');
	}

	model
		.find(options, fields)
		.sort({ used: 'desc' })
		.limit(10)
		.populate({
			path: 'keyResults',
			select: 'title used difficulty'
		})
		.exec(callback);
};

// ObjectiveRepository.prototype.getAllDeleted = function(callback) {
// 	var model = this.model;
// 	var query = model.find({
// 		isDeleted: true
// 	});

// 	query.exec(callback);
// };

// ObjectiveRepository.prototype.getAllNotApproved = function(callback) {
// 	var model = this.model;
// 	var query = model.find({
// 		isDeleted: false,
// 		isApproved: false
// 	});

// 	query.exec(callback);
// };

// ObjectiveRepository.prototype.getByUserId = function(userId, callback) {
// 	var model = this.model;
// 	var query = model.find({ 
// 		creator: userId
// 	});
	
// 	query.exec(callback);
// };

// ObjectiveRepository.prototype.getAllApprovedByTitle = function(title, callback) {
// 	var model = this.model;
// 	var query = model.find({
// 		title: new RegExp(title, 'i'),
// 		isApproved: true,
// 		isDeleted: false
// 	});
	
// 	query.exec(callback);
// };

module.exports = new ObjectiveRepository();

