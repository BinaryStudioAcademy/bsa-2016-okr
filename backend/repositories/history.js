const mongoose = require('mongoose');
const Repository = require('../units/Repository');
const History = require('../schemas/history');
const CONST = require('../config/constants');

var HistoryRepository = function() {
	Repository.prototype.constructor.call(this);
	this.model = History;
};

HistoryRepository.prototype = new Repository();

HistoryRepository.prototype.getHistory = function (limit, callback) {
	var model = this.model;

	model
		.find()
		.sort({ createdAt: -1 })
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
		.populate({
			path: 'user',
			populate: {
				path: 'userInfo'
			}
		})
		.limit(limit)
		.exec(callback);
};

HistoryRepository.prototype.getHistoryPaginate = function (skip, limit, callback) {
	var typeRegex = new RegExp('^' + CONST.history.type.ADD_TO_BACKLOG + '.*');
	var query = this.paginate(skip, limit, { createdAt: -1 }, { type: { $not: typeRegex } });
	query
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
		.populate({
			path: 'user',
			populate: {
				path: 'userInfo'
			}
		})
		.exec(callback);
};

HistoryRepository.prototype.getHistoryById = function (id, callback) {
	var model = this.model;
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
};

HistoryRepository.prototype.getByAuthorId = function (id, callback) {
	var model = this.model;
	model
		.find({author: id})
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
		.populate({
			path: 'user',
			populate: {
				path: 'userInfo'
			}
		})
		.exec(callback);
};

HistoryRepository.prototype.addKeyResultEvent = function(author, keyResult, type, callback) {
	var model = this.model;
	var newEvent = new model({
		author,
		keyResult,
		type: type + ' ' + CONST.history.target.KEY_RESULT,
	});

	newEvent.save(callback);
};

HistoryRepository.prototype.addCategoryEvent = function(author, category, type, callback) {
	var model = this.model;
	var newEvent = new model({
		author,
		category,
		type: type + ' ' + CONST.history.target.CATEGORY,
	});

	newEvent.save(callback);
};

HistoryRepository.prototype.addObjectiveEvent = function(author, objective, type, callback) {
	var model = this.model;
	var newEvent = new model({
		author,
		objective,
		type: type + ' ' + CONST.history.target.OBJECTIVE,
	});

	newEvent.save(callback);
};

HistoryRepository.prototype.addApprenticeEvent = function(author, user, type, callback) {
	var model = this.model;
	var newEvent = new model({
		author,
		user,
		type: type + ' ' + CONST.history.target.USER,
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
	});

	newEvent.save(callback);
};

HistoryRepository.prototype.addUserObjectiveToOtherUser = function (author, user, userObjective, type, callback) {
	var model = this.model;
	var newEvent = new model({
		author,
		type: type + ' ' + CONST.history.target.USER_OBJECTIVE,
		userObjective,
		user
	});

	newEvent.save(callback);
};

HistoryRepository.prototype.addUserKeyResult = function (author, key, objective, type, callback) {
	var model = this.model;
	var newEvent = new model({
		author,
		type: type + ' ' + CONST.history.target.USER_KEY_RESULT,
		userObjective: objective,
		userKeyResult: key._id
	});

	newEvent.save(callback);
};

HistoryRepository.prototype.addUserKeyResultToOtherUser = function (author, user, key, objective, type, callback) {
	var model = this.model;
	var newEvent = new model({
		author,
		type: type + ' ' + CONST.history.target.USER_KEY_RESULT,
		userObjective: objective,
		userKeyResult: key._id,
		user
	});

	newEvent.save(callback);
};

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
};

HistoryRepository.prototype.setScoreToKeyResultToOtherUser = function (author, user, key, type, callback) {
	var model = this.model;
	var newEvent = new model({
		author,
		userObjective: key.objectiveId,
		userKeyResult: key.keyResultId,
		userKeyResultScore: key.score,
		user,
		type: type + ' ' + CONST.history.target.USER_KEY_RESULT,
	});

	newEvent.save(callback);
};

HistoryRepository.prototype.getHistoryByUserIdPopulate = function (id, callback) {
	var model = this.model;

	model
		.find({ user: id })
		.populate({
			path: 'author',
			populate: {
				path: 'userInfo'
			}
		})
		.populate({
			path: 'user',
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
}

HistoryRepository.prototype.setTitleToKeyResult = function (author, key, type, callback) {
	var model = this.model;
	var newEvent = new model({
		author,
		userObjective: key.objectiveId,
		userKeyResult: key.keyResultId,
		userKeyResultTitle: key.title,
		type: type + ' ' + CONST.history.target.USER_KEY_RESULT,
	});

	newEvent.save(callback);
};

HistoryRepository.prototype.setDifficultyToKeyResult = function (author, key, type, callback) {
	var model = this.model;
	var newEvent = new model({
		author,
		userObjective: key.objectiveId,
		userKeyResult: key.keyResultId,
		userKeyResultDifficulty: key.difficulty,
		type: type + ' ' + CONST.history.target.USER_KEY_RESULT,
	});

	newEvent.save(callback);
};

module.exports = new HistoryRepository();
