const async = require('async');
const ObjectiveService = require('./objective');
const UserObjectiveRepository = require('../repositories/userObjective');
const QuarterRepository = require('../repositories/quarter');
const HistoryRepository = require('../repositories/history');

var UserObjectiveService = function() {};

UserObjectiveService.prototype.add = function(data, quarterId, callback){
	async.waterfall([
		(callback) => {
			var keyResults = data.keyResults;
			data.keyResults = [];
			ObjectiveService.add(data.creator, data, keyResults, (err, objective) => {
				if(err) {
					return callback(err, null);
				};
				return callback(null, objective);
			})
		},
		(objective, callback) => {
			keys = objective.keyResults.map((item) => {
				var keyResult = {
					templateId: item._id,
					score: 0,
					creator: item.creator,
				};

				return keyResult;
			});

			var data = {
				templateId: objective._id,
				userId: objective.creator,
				creator: objective.creator,
				isDeleted: false,
				keyResults: keys
			}

			UserObjectiveRepository.add(data, (err, objective) => {
				if(err) {
					return callback(err, null);
				};
				return callback(null, objective);
			})
		},
		(objective, callback) => {
			var data = {$push: {userObjectives: objective._id}}
			QuarterRepository.update(quarterId, data, (err, result) => {
				if(err) {
					return callback(err, null);
				};
				return callback(null, objective);
			})
		},
		(objective, callback) => {
			HistoryRepository.addObjectiveEvent(objective.creator, objective._id, "add user Objective", (err) => {
				if(err) {
					return callback(err, null);
				};
				return callback(null, objective);
			})
		}
	], (err, result) => {
		return callback(err, result)
	})
};

UserObjectiveService.prototype.update = function(authorId, objectiveId, objective, callback){
	 async.waterfall([
		(callback) => {
			UserObjectiveRepository.update(objectiveId, objective, (err, objective) => {
				if(err) {
					return callback(err, null);
				};
				return callback(null, objective);
			})
		},
		(objective, callback) => {
			HistoryRepository.addObjectiveEvent(authorId, objectiveId, "update user Objective", (err) => {
				if(err) {
					return callback(err, null);
				};
				return callback(null, objective);
			})
		}
	], (err, result) => {
		return callback(err, result)
	})
};

UserObjectiveService.prototype.delete = function(authorId, objectiveId, callback){
	async.waterfall([
		(callback) => {
			UserObjectiveRepository.delete(objectiveId, (err, objective) => {
				if(err) {
					return callback(err, null);
				};
				return callback(null, objective);
			})
		},
		(objective, callback) => {
			HistoryRepository.addObjectiveEvent(authorId, objectiveId, "delete user Objective", (err) => {
				if(err) {
					return callback(err, null);
				};
				return callback(null, objective);
			})
		}
	], (err, result) => {
		return callback(err, result)
	})
};

module.exports = new UserObjectiveService();
