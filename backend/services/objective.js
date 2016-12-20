const UserRepository = require('../repositories/user.js');
const Objective = require('../schemas/objective');
const User = require('../schemas/user');
const KeyResult = require('../schemas/keyResult');
const ObjectiveRepository = require('../repositories/objective.js');
const UserObjectiveRepository = require('../repositories/userObjective.js');
const QuarterRepository = require('../repositories/quarter');
const KeyResultRepository = require('../repositories/keyResult.js');
const HistoryRepository = require('../repositories/history.js');
const ValidateService = require('../utils/ValidateService');
const isEmpty = ValidateService.isEmpty;
const async = require('async');
const CONST = require('../config/constants.js');

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

ObjectiveService.prototype.add = function(authorId, objective, keyResults, callback) {
	objective = new Objective(objective);
	keyResults = keyResults.map((keyResult) => {
		keyResult.objectiveId = objective._id;
		keyResult = new KeyResult(keyResult);
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

ObjectiveService.prototype.setDefaultKeyResult = function(session, objectiveId, keyResultId, flag, callback) {
	var historyType = CONST.history.type.UPDATE;

	async.waterfall([
		(callback) => {
			ObjectiveRepository.getById(objectiveId, (err, objective) => {
				if(err) {
					return callback(err, null);
				}

				if(isEmpty(objective)) {
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
				objective.defaultKeyResults.push(keyResultId);
			} else if (!flag && keyResult != undefined) {
				objective.defaultKeyResults.splice(index, 1);
			}

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
			HistoryRepository.addObjectiveEvent(session, objectiveId, historyType, (err, historyEvent) => {
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

ObjectiveService.prototype.update = function (userId, objectiveId, data, callback) {
	async.waterfall([
		(callback) => {
			ObjectiveRepository.getById(objectiveId, (err, objective) => {
				if (err) {
					return callback(err, null);
				}

				if(isEmpty(objective)) {
					err = new Error('Objective does not exists');
					return callback(err, null);
				}

				return callback(null, objective);
			});
		}, (objective, callback) => {
			var isEmptyTitle = isEmpty(data.title);
			var isEmptyDescription = data.description == null;
			var isEmptyCategory = isEmpty(data.category);

			var sameTitle = isEmptyTitle || (!isEmptyTitle && (objective.title === data.title));
			var sameDescription = isEmptyDescription || (!isEmptyDescription && (objective.description === data.description));
			var sameCategory = isEmptyCategory || (!isEmptyCategory && (objective.category.equals(data.category)));

			if(sameTitle && sameDescription && sameCategory) {
				var updated = false;
				return callback(null, objective, updated);
			} else {
				if(!sameTitle) {
					objective.title = data.title;
				}

				if(!sameDescription) {
					objective.description = data.description;
				}

				if(!sameCategory) {
					// Maybe need to check category existance
					objective.category = data.category;
				}

				objective.save((err, objective) => {
					if (err) {
						return callback(err, null);
					}

					var updated = true;

					return callback(null, objective, updated);
				});
			}
		}, (objective, updated, callback) => {
			if(updated) {
				HistoryRepository.addObjectiveEvent(userId, objectiveId, CONST.history.type.UPDATE, (err, historyEvent) => {
					if(err) {
						return callback(err, null);
					}
					return callback(null, objective);
				});
			} else {
				return callback(null, objective);
			}
		}
	], (err, result) => {
		return callback(err, result);
	})
};

ObjectiveService.prototype.delete = function (userId, objectiveId, callback){
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
			HistoryRepository.addObjectiveEvent(userId, objectiveId, CONST.history.type.HARD_DELETE, (err) => {
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

ObjectiveService.prototype.autocomplete = function(categoryId, quarterId, title, callback) {
	async.waterfall([
		(callback) => {
			QuarterRepository.getById(quarterId, (err, quarter) => {
				if(err) {
					return callback(err, null);
				}

				var objectiveIds = [];

				if (!isEmpty(quarter)) {
					objectiveIds = quarter.userObjectives;
				}

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

ObjectiveService.prototype.autocompleteBacklogObjectives = function (categoryId, title, callback) {

	ObjectiveRepository.autocomplete(title, categoryId, [], (err, objectives) => {
		if(err) {
			return callback(err, null);
		}

		return callback(null, objectives);
	});
};

module.exports = new ObjectiveService();
