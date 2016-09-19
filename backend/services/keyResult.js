const async = require('async');
const KeyResultRepository = require('../repositories/keyResult');
const UserObjectiveRepository = require('../repositories/userObjective');
const UserObjectiveService = require('../services/userObjective');
const ObjectiveRepository = require('../repositories/objective');
const ObjectiveService = require('../services/objective');
const HistoryRepository = require('../repositories/history');
const ValidateService = require('../utils/ValidateService');
const isEmpty = ValidateService.isEmpty;


const CONST = require('../config/constants');

var KeyResultsService = function(){};

KeyResultsService.prototype.add = function(userId, data, callback) {
	async.waterfall([
		(callback) => {
			ObjectiveRepository.getById(data.objectiveId, (err, objective) => {
				if(err) {
					return callback(err, null);
				}

				if(isEmpty(objective)) {
					err = new Error('Objective does not exists');
					return callback(err, null);
				}

				return callback(null);
			});
		}, (callback) => {
			KeyResultRepository.getByTitleAndObjectiveId(data.title, data.objectiveId, (err, keyResult) => {
				if(err) {
					return callback(err, null);
				}

				if(!isEmpty(keyResult)) {
					err = new Error('Key result for this objective with similar title already exists');
					return callback(err, null);
				}
				
				return callback(null);
			});
		}, (callback) => {
			KeyResultRepository.add(data, (err, keyResult) => {
				if(err) {
					return callback(err, null);
				}

				return callback(null, keyResult);
			});
		}, (keyResult, callback) => {
			HistoryRepository.addKeyResultEvent(userId, keyResult._id, CONST.history.type.ADD, (err, historyEvent) => {
				if(err) {
					return callback(err, null);
				}

				return callback(null, keyResult);
			});
		},
	], (err, result) => {
		return callback(err, result);
	});
};

KeyResultsService.prototype.update = function(userId, keyResultId, data, callback) {
	async.waterfall([
		(callback) => {
			KeyResultRepository.update(keyResultId, data, (err, keyResult) => {
				if(err) {
					return callback(err, null);
				}
				return callback(null, keyResult);
			});
		},
		(keyResult, callback) => {
			HistoryRepository.addKeyResultEvent(userId, keyResultId, CONST.history.type.UPDATE, (err, keyResult) => {
				if(err) {
					return callback(err, null);
				}

				return callback(null, keyResult);
			});
		}
	], (err, result) => {
		return callback(err, result);
	});
};

KeyResultsService.prototype.delete = function(userId, keyResultId, callback) {
	async.waterfall([
		(callback) => {
			KeyResultRepository.delete(keyResultId, (err, keyResult) => {
				if(err){
					return callback(err, null);
				}
				return callback(null, keyResult);
			});
		},
		(keyResult, callback) => {
			HistoryRepository.addKeyResultEvent(userId, keyResultId, CONST.history.type.HARD_DELETE, (err, keyResult) => {
					if(err){
					return callback(err, null);
				}
				return callback(null, keyResult);
			});	
		}
	], (err, result) => {
		return callback(err, result);
	});
};

KeyResultsService.prototype.softDelete = function(session, keyResultId, data, callback) {
	 async.waterfall([
		(callback) => {
			KeyResultRepository.getById(keyResultId, (err, keyResult) => {
				if(err) {
					return  callback(err, null);
				}

				if(isEmpty(keyResult)) {
					err = new Error('keyResult not found');
					return callback(err, null);
				}

				return callback(null, keyResult);
			});
		},
		(keyResult, callback) => {
			keyResult = Object.assign(keyResult, data);

			keyResult.save((err, keyResult) => {
				if(err) {
					return  callback(err, null);
				}

				return callback(null, keyResult);
			});
		},
		(keyResult, callback) => {
			ObjectiveService.setDefaultKeyResult(session, keyResult.objectiveId, keyResult._id, false, callback);
		},
		(keyResult, callback) => {
			HistoryRepository.addKeyResultEvent(session._id, keyResultId, CONST.history.type.SOFT_DELETE, (err, historyEvent) => {
				if(err) {
					return  callback(err, null);
				}

				return callback(null, keyResult);
			});
		}
	], (err, result) => {
		return callback(err, result)
	})
};

KeyResultsService.prototype.autocomplete = function(title, objectiveId, callback){
	async.waterfall([
		(callback) => {
			UserObjectiveRepository.getById(objectiveId, (err, userObjective) => {
				if (err) {
					return callback(err, null);
				}

				return callback(null, userObjective);
			})
		},
		(userObjective, callback) => {
			KeyResultRepository.autocomplete(title, userObjective.templateId, (err, keyResultsArr) => {
				if (err) {
					return callback(err, null);
				}

				return callback(null, keyResultsArr, userObjective);
			});
		},
		(keyResultsArr, userObjective, callback) => {
			keyResultsArr = keyResultsArr.filter((keyResult) => {
				return !(userObjective.keyResults.some((objectiveKeyResult) => {
					return ((objectiveKeyResult.templateId.equals(keyResult._id)) && (objectiveKeyResult.isDeleted === false))
				}))
			}).slice(0, 10);

			return callback (null, keyResultsArr);
		}
	], (err, results) => {
			return callback(err, results);
	});
}

KeyResultsService.prototype.changeApprove = function(userId, keyResultId, callback){
	async.waterfall([
		(callback) => {
			KeyResultRepository.getById(keyResultId, function(err, keyResult){
				if (err) {
					return callback(err, null);
				};
				return callback(null, userId, keyResult);
			});
		},
		(userId, keyResult, callback) => {
			HistoryRepository.addKeyResultEvent(userId, keyResultId, CONST.history.type.CHANGE_APPROVE+' '+ !keyResult.isApproved, (err) =>{
				if (err){
					return callback(err, null);
				};	
			});
			return callback(null, keyResult);
		},
		(keyResult, callback) => {
			if(keyResult.isApproved) {
				KeyResultRepository.setIsApprovedToFalse(keyResultId, function(err, keyResult){
					if (err){
						return callback(err, null);
					};	
					return callback(null, keyResult);
				});
			}
			else{
				KeyResultRepository.setIsApprovedToTrue(keyResultId, function(err, keyResult){
					if (err){
						return callback(err, null);
					};
					return callback(null, keyResult);	
				});
			};
		}
	], (err, keyResult) => {
		return callback(err, keyResult);
	});
};

// KeyResultsService.prototype.generateNotification = function() {};

module.exports = new KeyResultsService();