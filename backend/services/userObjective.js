const async = require('async');
const ObjectiveService = require('./objective');
const UserObjectiveRepository = require('../repositories/userObjective');
const KeyResultRepository = require('../repositories/keyResult');
const QuarterRepository = require('../repositories/quarter');
const HistoryRepository = require('../repositories/history');
const ValidateService = require('../utils/ValidateService');


var UserObjectiveService = function() {};

UserObjectiveService.prototype.add = function(data, quarterId, callback){
	async.waterfall([
		(callback) => {
			ObjectiveService.addBlank(data.creator, data, (err, objective) => {
				if(err) {
					return callback(err, null);
				};
				return callback(null, objective);
			})
		},
		(objective, callback) => {
			var data = {
				templateId: objective._id,
				userId: objective.creator,
				creator: objective.creator,
				isDeleted: false,
				keyResults: objective.keyResults
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
			UserObjectiveRepository.update(objectiveId, objective, (err, oldObjective) => {
				if(err) {
					return callback(err, null);
				};
				
				return callback(null, oldObjective);
			})
		},
		(oldObjective, callback) => {
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

UserObjectiveService.prototype.addKeyResult = function(data, callback) {
	async.waterfall([
		(callback) => {
			UserObjectiveRepository.getById(data.objectiveId, (err, userObjective) => {
				if (err) {
					return callback(err, null);
				}

				if (!userObjective){
					err = new Error('Can not find user objective');
					return callback(err, null);
				}

				return callback(null, userObjective);
			});
		},
		(userObjective, callback) => {
			data.userObjective = userObjective;
			
			if(!ValidateService.isEmpty(data.keyResultId)) {
				console.log('Trying to add key result by id');
				this.addKeyResultById(data, callback);
			} else {
				console.log('Trying to add key result by title');
				this.addKeyResultByTitle(data, callback);
			}
		},
		(keyResult, callback) => {			
			let objective = {
				$push: {
					keyResults: {
						"templateId": keyResult._id,
						"creator": data.userId,
						"score": 0.0
					}
				}
			};

			this.update(data.userId, data.objectiveId, objective, (err, objective) => {
				if (err) {
					return callback(err, null);
				}

				keyResult = keyResult.toObject();

				keyResult.userObjective = data.objectiveId;

				return callback(null, keyResult);
			})
		},
		(keyResult, callback) => {
			// Add history userObjective update event

			return callback(null, keyResult);
		}
	], (err, result) => {
		return callback(err, result);
	})	
};

UserObjectiveService.prototype.addKeyResultById = function(data, callback) {
	async.waterfall([
		(callback) => {
			KeyResultRepository.getById(data.keyResultId, (err, keyResult) => {
				if (err) {
					return callback(err, null);
				}

				if (!keyResult) {
					let err = new Error('Can not find key result by selected id');
					return callback(err, null);
				}

				return callback(null, keyResult);
			})
		},
	], (err, result) => {
		return callback(err, result);
	});
};

UserObjectiveService.prototype.addKeyResultByTitle = function(data, callback) {
	async.waterfall([
		(callback) => {
			KeyResultRepository.getByTitle(data.keyResultTitle, (err, keyResult) => {
				if(err) {
					return callback(err, null);
				}

				return callback(null, keyResult);
			})
		},
		(keyResult, callback) => {
			if (ValidateService.isEmpty(keyResult)) {
				let keyResultData = {
					title: data.keyResultTitle,
					creator: data.userId,
					objectiveId: data.userObjective.templateId,
					isDeleted: false,
					isApproved: data.isAdmin ? true : false,
					used: 0,
					difficulty: 'easy'
				};

				KeyResultRepository.add(keyResultData, (err, createdKeyResult) => {
					if (err) {
						return callback(err, null);
					}

					if (ValidateService.isEmpty(createdKeyResult)) {
						err = new Error(`Can not create key result`);
						return callback(err, null);
					}

					return callback(null, createdKeyResult);
				});
			} else {
				return callback(null, keyResult)
			}
		},
	], (err, result) => {
		return callback(err, result);
	});
};

module.exports = new UserObjectiveService();
