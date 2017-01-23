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
		})
		.exec(callback);
};

ObjectiveRepository.prototype.getAllDeletedPopulate = function(callback) {

	var model = this.model;

	model
		.find({
			isDeleted: true
		})
		.populate('category')
		.populate({
			path: "deletedBy",
			populate: {
				path: 'userInfo'
			}
		})
		.exec(callback);
};

ObjectiveRepository.prototype.getAllPopulate = function(callback) {
	var model = this.model;

	model
		.find({
			isApproved: true,
		})
		.populate('defaultKeyResults')
		.populate('category')
		.exec(callback);
};

ObjectiveRepository.prototype.getByTitle = function(title, callback) {
	var model = this.model;

	model
		.findOne({
			title: title,
		})
		.exec(callback);
};

ObjectiveRepository.prototype.getByTitleAndCategoryId = function(title, categoryId, callback) {
	var model = this.model;

	var options = {
		title: title,
		category: categoryId,
	};

	model
		.findOne(options)
		.exec(callback);
};

ObjectiveRepository.prototype.autocomplete = function(title, categoryId, excludeIds = [], callback) {
	var model = this.model;
	var options = {
		isApproved: true,
		//isDeleted: false,
		category: categoryId,
		_id: {
			$not: {
				$in: excludeIds
			}
		},
	};

	var fields = {
		title: true,
	};

	if(title) {
		options.title = new RegExp(title, 'i');
	}

	model
		.find(options, fields)
		.sort({ used: 'desc' })
		.limit(10)
		.exec(callback);
};

ObjectiveRepository.prototype.getAllNotApproved = function(callback) {

	var model = this.model;

	model
		.find({
			isApproved: false,
			isDeleted: false,
			isDeclined: false,
		})
		.populate({
			path: "creator",
			populate: {
				path: 'userInfo mentor',
				populate: {
					path: 'userInfo'
				}
			}
		})
		.populate('category')
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
