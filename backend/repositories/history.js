var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var History = require('../schemas/history');
var CONST = require('../config/constants');

var HistoryRepository = function() {
	Repository.prototype.constructor.call(this);
	this.model = History;
};

HistoryRepository.prototype = new Repository();

HistoryRepository.prototype.getHistory = function (callback) {
	let model = this.model;
	model
		.find()
		.populate({
			path: 'userObjective',
			populate: [{
				path: 'templateId'
			},
			{
				path: 'keyResults.templateId'
			}]
		})
		.populate('keyResult')
		.populate('objective')
		.populate('category')
		.populate({
			path: 'author',
			populate: {
				path: 'userInfo'
			}
		}) 
		.exec(callback);
}

HistoryRepository.prototype.getHistoryById = function (id, callback) {
	let model = this.model;
	model
		.find({_id: id})
		.populate({
			path: 'userObjective',
			populate: [{
				path: 'templateId'
			},
			{
				path: 'keyResults.templateId'
			}]
		})
		.populate('keyResult')
		.populate('objective')
		.populate('category')
		.populate({
			path: 'author',
			populate: {
				path: 'userInfo'
			}
		}) 
		.exec(callback);
}

HistoryRepository.prototype.getByAuthorId = function (id, callback) {
	let model = this.model;
	model
		.find({authorId: id})
		.populate({
			path: 'userObjective',
			populate: [{
				path: 'templateId'
			},
			{
				path: 'keyResults.templateId'
			}]
		})
		.populate('keyResult')
		.populate('objective')
		.populate('category')
		.populate({
			path: 'author',
			populate: {
				path: 'userInfo'
			}
		}) 
		.exec(callback);	
};

HistoryRepository.prototype.addKeyResultEvent = function(author, keyResult, type, callback) {
	let model = this.model;
	let newEvent = new model({
		author, 
		keyResult, 
		type: type + ' ' + CONST.history.target.KEY_RESULT,
	});
	
	newEvent.save(callback);
};

HistoryRepository.prototype.addCategoryEvent = function(author, category, type, callback) {
	let model = this.model;
	let newEvent = new model({
		author, 
		category, 
		type: type + ' ' + CONST.history.target.CATEGORY,
	});
	
	newEvent.save(callback);
};

HistoryRepository.prototype.addObjectiveEvent = function(author, objective, type, callback) {
	let model = this.model;
	let newEvent = new model({
		author, 
		objective,
		type: type + ' ' + CONST.history.target.OBJECTIVE,
	});

	newEvent.save(callback);
};

HistoryRepository.prototype.getUserObjectiveHistoryPopulate = function (id, callback) {
	var model = this.model;

	model
		.find({userObjective: id})
		.populate({
			path: 'author',
			populate: {
				path: 'userInfo'
			}
		}) 
		.populate({
			path: 'userObjective',
			populate: [{
				path: 'templateId'
			},
			{
				path: 'keyResults.templateId'
			}]
		})
		.exec(callback);
};

HistoryRepository.prototype.addUserObjective = function (author, userObjective, type, callback) {
	var model = this.model;
	var newEvent = new model({
		author,
		type: type + ' ' + CONST.history.target.USER_OBJECTIVE,
		userObjective
	})

	newEvent.save(callback);
}

HistoryRepository.prototype.addUserKeyResult = function (author, key, objective, type, callback) {
	var model = this.model;
	var newEvent = new model({
		author,
		type: type + ' ' + CONST.history.target.USER_KEY_RESULT,
		userObjective: objective,
		userKeyResult: key._id
	})

	newEvent.save(callback);
}


HistoryRepository.prototype.setScoreToKeyResult = function (author, key, type, callback) {
	var model = this.model;
	var newEvent = new model({
		author,
		userObjective: key.objectiveId,
		userKeyResult: key.keyResultId,
		userKeyResultScore: key.score,
		type: type + ' ' + CONST.history.target.USER_KEY_RESULT,
	});

	newEvent.save(callback);
}

module.exports = new HistoryRepository();
