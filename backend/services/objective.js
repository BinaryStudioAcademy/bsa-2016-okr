var UserRepository = require('../repositories/user.js');
var Objective = require('../schemas/objective');
var User = require('../schemas/user');
var KeyResult = require('../schemas/keyResult');
var ObjectiveRepository = require('../repositories/objective.js');
var KeyResultRepository = require('../repositories/keyResult.js');
var HistoryRepository = require('../repositories/history.js');
var async = require('async');

var ObjectiveService = function() {};

// 1) Create new objective with empty keyResults array
// 2) Create all keyResults with corresponding objectiveId
// 3) Push keyResult ids to objective.keyResults
// 4) Save objective and keyResults in DB
// 5) Profit =)
ObjectiveService.prototype.add = function(authorId, objective, keyResults, callback) {
	objective = new Objective(objective);
	keyResults = keyResults.map((keyResult) => {
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
			HistoryRepository.addObjectiveEvent(authorId, obj._id, "update Objective template", (err) => {
				if(err) {
					return callback(err, null);
				}
				return callback(null, obj);
			});
		}, (obj, callback) => {
			obj = obj.toObject();
			obj.keyResults = [];
			async.forEach(keyResults, (keyResult, callback) => {
				keyResult.save((err, keyResult) => {
					if(err) { return callback(err); }
					obj.keyResults.push(keyResult.toObject());
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
			HistoryRepository.addObjectiveEvent(authorId, objectiveId, "update Objective template", (err) => {
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
			HistoryRepository.addObjectiveEvent(authorId, objectiveId, "delete Objective template", (err) => {
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
