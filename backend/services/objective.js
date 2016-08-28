var UserRepository = require('../repositories/user.js');
var Objective = require('../schemas/objective');
var User = require('../schemas/user');
var KeyResult = require('../schemas/keyResult');
var ObjectiveRepository = require('../repositories/objective.js');
var KeyResultRepository = require('../repositories/keyResult.js');
var HistoryRepository = require('../repositories/history.js');
var async = require('async');
var CONST = require('../config/constants.js');

var ObjectiveService = function() {};

ObjectiveService.prototype.getAll = function(callback) {
	async.waterfall([
		(callback) => {
			ObjectiveRepository.getAll((err, objectives) => {
				if(err) {
					return callback(err, null);
				}

				return callback(null, objectives);
			});
		},
		(objectives, callback) => {
			KeyResultRepository.getAll((err, keyResults) => {
				if(err) {
					return callback(err, null);
				}

				return callback(null, objectives, keyResults);
			});
		},
		(objectives, keyResults, callback) => {
			objectives = objectives.map((objective) => {
				let objectiveKeyResults = keyResults.filter((keyResult) => {
					return keyResult.objectiveId.equals(objective._id);
				});

				objective = objective.toObject();

				objective.keyResults = objectiveKeyResults;

				return objective;
			});

			callback(null, objectives);
		},
	], (err, result) => {
		return callback(err, result);
	}
	);
}

// 1) Create new objective with empty keyResults array
// 2) Create all keyResults with corresponding objectiveId
// 3) Push keyResult ids to objective.keyResults
// 4) Save objective and keyResults in DB
// 5) Profit =)
ObjectiveService.prototype.add = function(authorId, objective, defaultKeyResults, callback) {
	objective = new Objective(objective);
	defaultKeyResults = defaultKeyResults.map((keyResult) => {
		keyResult.objectiveId = objective._id;
		keyResult = new KeyResult(keyResult);
		objective.keyResults.push(keyResult._id);
		return keyResult;
	});

	async.waterfall([
		(callback) => {
			objective.save((err, obj) => {
				return err ? callback(err) : callback(null, obj);
			});
		}, (obj, callback) => {
			HistoryRepository.addObjectiveEvent(authorId, obj._id, CONST.history.type.ADD, (err) => {
				if(err) {
					return callback(err, null);
				}
				return callback(null, obj);
			});
		}, (obj, callback) => {
			obj = obj.toObject();
			obj.defaultKeyResults = [];
			async.forEach(defaultKeyResults, (keyResult, callback) => {
				keyResult.save((err, keyResult) => {
					if(err) { return callback(err); }
					obj.defaultKeyResults.push(keyResult.toObject());
					return callback(null);
				});
			}, (err) => {
				return callback(err, obj);
			});
		}
	], (err, result) => {
		return callback(err, result);
	});
};

ObjectiveService.prototype.addBlank = function(authorId, objective, callback) {
	objective = new Objective(objective);

	async.waterfall([
		(callback) => {
			objective.save((err, obj) => {
				return err ? callback(err) : callback(null, obj);
			});
		}, (obj, callback) => {
			HistoryRepository.addObjectiveEvent(authorId, obj._id, CONST.history.type.ADD, (err) => {
				if(err) {
					return callback(err, null);
				}
				return callback(null, obj);
			});
		}
	], (err, result) => {
		return callback(err, result);
	});
};

ObjectiveService.prototype.update = function (authorId, objectiveId, objective, callback){
	async.waterfall([
		(callback) => {
			ObjectiveRepository.update(objectiveId, objective, (err, objective) => {
				if (err) {
					return callback(err, null);
				}
				return callback(null, objective);
			});
		},
		(objective, callback) => {
			HistoryRepository.addObjectiveEvent(authorId, objectiveId, CONST.history.type.UPDATE, (err) => {
				if(err) {
					return callback(err, null);
				}
				return callback(null, objective);
			});
		}
	], (err, result) => {
		return callback(err, result);
	})
}

ObjectiveService.prototype.delete = function (authorId, objectiveId, callback){
	async.waterfall([
		(callback) => {
			ObjectiveRepository.delete(objectiveId, (err) => {
				if (err) {
					return callback(err, null);
				}
				return callback(null);
			});
		},
		(callback) => {
			HistoryRepository.addObjectiveEvent(authorId, objectiveId, CONST.history.type.HARD_DELETE, (err) => {
				if(err) {
					return callback(err, null);
				}
				return callback(null, null);
			});
		}
	], (err, result) => {
		return callback(err, result);
	})
}


// ObjectiveService.prototype.addToUser = function(objective, keys, assignedTo, callback) {

// 	async.waterfall([
// 		(callback) => {
// 			return ObjectiveService.prototype.add(objective, keys, callback);
// 		}, (objectiveTemplate, callback) => {
// 			UserRepository.getById(assignedTo, (err, user) => {
// 				return callback(err, user, objectiveTemplate);
// 			});
// 		}, (user, objectiveTemplate, callback) => {
// 			var objective = {
// 			  'objectiveId': objectiveTemplate._id,
// 			  'feedback': '',
// 			  'isArchived': false,
// 			  'isDeleted': false,
// 			  'keys': []
// 			}

// 			objectiveTemplate.keys.forEach((key) => {
// 				return objective.keys.push({
// 					'keyId': key._id,
// 					'score': 0
// 				});
// 			});

// 			user = user.toObject();
// 			user.objectives.push(objective);

// 			UserRepository.update(user._id, user, (err) => {
// 				return callback(err, user, objective.objectiveId);
// 			});
// 		}, (user, objectiveId, callback) => {
// 			UserRepository.getById(user._id, (err, user) => {
// 				user = user.toObject();
// 				var objective = user.objectives.find((objective) => {
// 					return objective.objectiveId._id.equals(objectiveId);
// 				});

// 				return callback(err, objective);
// 			});
// 		}
// 	], (err, result) => {
// 		return callback(err, result);
// 	});
// };

module.exports = new ObjectiveService();
