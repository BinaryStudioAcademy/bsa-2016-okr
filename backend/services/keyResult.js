var async = require('async');
var _ = require('lodash');
var KeyResultRepository = require('../repositories/keyResult');
var UserObjectiveRepository = require('../repositories/userObjective');
var UserObjectiveService = require('../services/userObjective');
var HistoryRepository = require('../repositories/history');

const CONST = require('../config/constants');

var KeyResultsService = function(){};


KeyResultsService.prototype.update = function(userId, keyResultId, data, callback) {
	async.waterfall([
		(callback) => {
			KeyResultRepository.update(keyResultId, data, (err, keyResult) => {
				if(err) {
					return  callback(err, null);
				}
				return callback(null, keyResult);
			});
		},
		(keyResult, callback) => {
			HistoryRepository.addKeyResultEvent(userId, keyResultId, CONST.history.type.UPDATE, (err, keyResult) => {
				if(err) {
					return  callback(err, null);
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

KeyResultsService.prototype.softDelete = function(userId, keyResultId, data, callback){
	 async.waterfall([
		(callback) => {
			KeyResultRepository.update(keyResultId, data, (err, keyResult) => {
				if(err) {
					return  callback(err, null);
				}
				return callback(null, keyResult);
			});
		},
		(keyResult, callback) => {
			HistoryRepository.addKeyResultEvent(userId, keyResultId, CONST.history.type.SOFT_DELETE, (err, keyResult) => {
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
					return (objectiveKeyResult.templateId.equals(keyResult._id))
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
				if (err){
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