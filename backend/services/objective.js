var UserRepository = require('../repositories/user.js');
var Objective = require('../schemas/objective');
var User = require('../schemas/user');
var KeyResult = require('../schemas/keyResult');
var ObjectiveRepository = require('../repositories/objective.js');
var UserObjectiveRepository = require('../repositories/userObjective.js');
var QuarterRepository = require('../repositories/quarter');
var KeyResultRepository = require('../repositories/keyResult.js');
var HistoryRepository = require('../repositories/history.js');
const ValidateService = require('../utils/ValidateService');
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
				var objectiveKeyResults = keyResults.filter((keyResult) => {
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
};

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
		/*objective.defaultKeyResults.push(keyResult._id);*/
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

ObjectiveService.prototype.setDefaultKeyResult = function(session, objectiveId, keyResultId, flag, callback){
	var historyType = CONST.history.type.UPDATE;
	async.waterfall([
		(callback) => {
			ObjectiveRepository.getById(objectiveId, (err, objective) => {
				if(err) {
					return callback(err, null);
				}

				if(ValidateService.isEmpty(objective)) {
					err = new Error('Objective not found');
					return callback(err, null);
				}

				return callback(null, objective);
			});
		}, (objective, callback) => {

			var keyResult = objective.defaultKeyResults.find((keyResult)=>{
				return keyResult.equals(keyResultId);
			});
			var index = objective.defaultKeyResults.findIndex((keyResult)=>{
				return keyResult.equals(keyResultId);
			});

			if (flag && keyResult == undefined) {
				objective.defaultKeyResults.push(keyResultId)
			}
			else if (!flag && keyResult != undefined)
				objective.defaultKeyResults.splice(index, 1)

			/*if(index === -1) {
				var err = new Error('Key result not found in objective');
				return callback(err, null);
			}

			userObjective.keyResults[index].isDeleted = flag;
			userObjective.keyResults[index].deletedDate = new Date();
			userObjective.keyResults[index].deletedBy = session._id;*/

			objective.save((err, objective) => {
				if(err) {
					return callback(err, null);
				}

				return callback(null, objective);
			});
		}, (objective, callback) => {
			HistoryRepository.addObjectiveEvent(session._id, objectiveId, historyType, (err, historyEvent) => {
				if(err) {
					return  callback(err, null);
				}

				return callback(null, objective);
			});
		}
		], (err, result) => {
			return callback(err, result)
		})
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

ObjectiveService.prototype.softDelete = function(userId, objectiveId, objective, callback){
	 async.waterfall([
		(callback) => {
			ObjectiveRepository.update(objectiveId, objective, (err, objective) => {
				if(err) {
					return callback(err, null);
				};
				
				return callback(null, objective);
			});
		},
		(objective, callback) => {
			HistoryRepository.addObjectiveEvent(userId, objectiveId, CONST.history.type.SOFT_DELETE, (err, objective) => {
				if(err) {
					return  callback(err, null);
				}
			return callback(null, objective);
			});
		}
	], (err, result) => {
		return callback(err, result)
	})
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
};

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
};

ObjectiveService.prototype.autocomplete = function(userId, categoryId, year, quarter, title, callback) {
	async.waterfall([
		(callback) => {
			QuarterRepository.getByUserIdObjectiveIds(userId, year, quarter, (err, quarter) => {
				if(err) {
					return callback(err, null);
				}

				var objectiveIds = quarter.userObjectives;

				return callback(null, objectiveIds);
			});
		},
		(objectiveIds, callback) => {
			UserObjectiveRepository.getTemplateFieldByObjectiveIds(objectiveIds, (err, userObjectiveTemplates) => {
				if(err) {
					return callback(err, null);
				}

				var filteredByCategory = userObjectiveTemplates.filter((userObjective) => {
					return userObjective.templateId.category.equals(categoryId);
				});

				var userObjectiveTemplateIds = filteredByCategory.map((userObjective) => {
					return userObjective.templateId._id;
				});

				return callback(null, userObjectiveTemplateIds);
			});
		}, (userObjectiveTemplateIds, callback) => {
			ObjectiveRepository.autocomplete(title, categoryId, userObjectiveTemplateIds, (err, objectives) => {
				if(err) {
					return callback(err, null);
				}

				return callback(null, objectives);
			});
		},
	], (err, result) => {
		return callback(err, result);
	});
};


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
