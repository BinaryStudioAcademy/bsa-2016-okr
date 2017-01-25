const async = require('async');
const ValidateService = require('../../utils/ValidateService');
const HelpService = require('../../utils/HelpService');
const isEmpty = ValidateService.isEmpty;
const isMentorActionAllowed = ValidateService.isMentorActionAllowed;
const CONST = require('../../config/constants');

const ObjectiveService = require('../objective');
const ObjectiveRepository = require('../../repositories/objective');
const UserObjectiveRepository = require('../../repositories/userObjective');
const QuarterRepository = require('../../repositories/quarter');
const Quarter = require('../../schemas/quarter');
const UserRepository = require('../../repositories/user');
const HistoryRepository = require('../../repositories/history');
const KeyResultRepository = require('../../repositories/keyResult');

const add = require('./add');
const addToBacklog = require('./addToBacklog');
const addKeyResult = require('./addKeyResult');
const updateHelper = require('./updateHelper');
const changeArchiveStatus = require('./archive.js');
const updateWithoutValidation = require('./updateWithoutValidation.js');

var UserObjectiveService = function() {};

UserObjectiveService.prototype.add = add;
UserObjectiveService.prototype.addToBacklog = addToBacklog;
UserObjectiveService.prototype.addKeyResult = addKeyResult;
UserObjectiveService.prototype.changeArchiveStatus = changeArchiveStatus;
UserObjectiveService.prototype.updateWithoutValidation = updateWithoutValidation;

UserObjectiveService.prototype.update = function(session, userObjectiveId, data, callback){
	async.waterfall([
		(callback) => {
			UserObjectiveRepository.getById(userObjectiveId, (err, userObjective) => {
				if(err) {
					return callback(err, null);
				}
				if(isEmpty(userObjective)) {
					err = new Error('Objective not found');
					return callback(err, null);
				}
				return callback(null, userObjective);
			});
		}, (userObjective, callback) => {
			if(userObjective.isArchived == true){
				err = new Error('Objective was archived');
				return callback(err, null);
			}
			UserRepository.getByIdPopulate(userObjective.userId, (err, user) => {
				if(err) {
					return callback(err, null);
				};
				return callback(null, userObjective, user);
			});
		}, (userObjective, user, callback) => {
			if(userObjective == undefined || userObjective.userId == undefined
				|| user == undefined) { //|| user.mentor == undefined || user.mentor._id == undefined
					err = new Error('userObjective or user not found');
					return callback(err, null);}

			if (session.localRole == CONST.user.localRole.ADMIN
					|| session._id.equals(userObjective.userId.toString())
					|| (session.localRole == CONST.user.localRole.MENTOR
						  && user.mentor._id.equals(session._id.toString()) )) {
						ObjectiveRepository.getById(userObjective.templateId, (err, templateObjective) => {

							if(templateObjective.isApproved == false){
										//call another service
										// if is not archived update template then

								ObjectiveService.update(session._id, userObjective.templateId, data, callback);
							} else if (templateObjective.isApproved == true) {

									updateHelper(session._id, userObjective._id, data, (err, userObjectiveUpdated) => {
										if(err) {
											return callback(err, null);
										};
									return callback(null, userObjectiveUpdated);
										});
									}
						});
					}
			},
		], (err, result) => {
			return callback(err, result);
		})
};

UserObjectiveService.prototype.cloneUserObjective = function(session, userObjectiveId, quarterId, callback) {
	async.waterfall([
		(callback) => {
			UserObjectiveRepository.getById(userObjectiveId, (err, otherUserObjective) => {
				if(err) {
					return callback(err, null);
				}

				if(isEmpty(otherUserObjective)) {
					err = new Error('Objective not found');
					return callback(err, null);
				}

				return callback(null, otherUserObjective);
			});
		}, (otherUserObjective, callback) => {
			QuarterRepository.getByIdPopulate(quarterId, (err, quarter) => {
				if(err) {
					return callback(err, null);
				}

				if(isEmpty(quarter)) {
					err = new Error('Quarter not found');
					return callback(err, null);
				}

				return callback(null, otherUserObjective, quarter);
			});
		}, (otherUserObjective, quarter, callback) => {
			var existingUserObjectiveIndex = quarter.userObjectives.findIndex((userObjective) => {
				return userObjective.templateId.equals(otherUserObjective.templateId);
			});

			if(existingUserObjectiveIndex !== -1) {
				var err = new Error('Objective with equal template already exists');
				return callback(err, null);
			}

			return callback(null, otherUserObjective, quarter);
		}, (otherUserObjective, quarter, callback) => {
			var newUserObjective = {
				templateId: otherUserObjective.templateId,
				userId: session._id,
				creator: session._id,
			};

			var newKeyResults = otherUserObjective.keyResults.map((keyResult) => {
				return {
					templateId: keyResult.templateId,
					creator: session._id,
				};
			});

			newUserObjective.keyResults = newKeyResults;

			UserObjectiveRepository.add(newUserObjective, (err, userObjective) => {
				if(err) {
					return callback(err, null);
				}

				return callback(null, userObjective, quarter)
			});
		}, (userObjective, quarter, callback) => {
			var updateData = {
				$push: {
					userObjectives: userObjective._id,
				},
			};

			Quarter.findOneAndUpdate({ _id: quarter._id }, updateData, (err, quarter) => {
				if(err) {
					return callback(err, null);
				}

				return callback(null, userObjective);
			});
		}
	], (err, result) => {
		return callback(err, result);
	});
};

UserObjectiveService.prototype.softDeleteKeyResult = function(session, userObjectiveId, keyResultId, flag, callback){
	var historyType = CONST.history.type.UPDATE;
	async.waterfall([
		(callback) => {
			UserObjectiveRepository.getById(userObjectiveId, (err, userObjective) => {
				if(err) {
					return callback(err, null);
				}

				if(isEmpty(userObjective)) {
					err = new Error('Objective not found');
					return callback(err, null);
				}

				if ((!userObjective.userId.equals(session._id))
				&& (!userObjective.userId.equals(session.mentor))
				&& (!session.localRole === CONST.user.localRole.ADMIN)) {
					err = new Error('Forbidden');
					err.status = 403;
					return callback(err, null);
				}

				return callback(null, userObjective);
			});
		}, (userObjective, callback) => {

			var index = userObjective.keyResults.findIndex((keyResult)=>{
				return keyResult._id.equals(keyResultId);
			});

			if(index === -1) {
				var err = new Error('Key result not found in objective');
				return callback(err, null);
			}

			userObjective.keyResults[index].isDeleted = flag;
			userObjective.keyResults[index].deletedDate = new Date();
			userObjective.keyResults[index].deletedBy = session._id;

			userObjective.save((err, userObjective) => {
				if(err) {
					return callback(err, null);
				}

				return callback(null, userObjective);
			});
		}, (userObjective, callback) => {
            historyType = userObjective.isBacklog ? CONST.history.type.UPDATE_BACKLOG : historyType;

            if (userObjective.userId.equals(session._id)) {
                HistoryRepository.addUserObjective(session._id, userObjectiveId, historyType, (err, historyEvent) => {
                    if(err) {
                        return  callback(err, null);
                    }

					return callback(null, userObjective);
                });
            } else {
                HistoryRepository.addUserObjectiveToOtherUser(session._id, userObjective.userId, userObjectiveId, historyType, (err, historyEvent) => {
                    if(err) {
                        return  callback(err, null);
                    }

					return callback(null, userObjective);

				});
            }

        }
		], (err, result) => {
			return callback(err, result)
		})
};

UserObjectiveService.prototype.softDelete = function(session, userObjectiveId, flag, callback){
	var historyType = flag ? CONST.history.type.SOFT_DELETE : CONST.history.type.RESTORE;
	async.waterfall([
		(callback) => {
			UserObjectiveRepository.getById(userObjectiveId, (err, userObjective) => {
				if(err) {
					return callback(err, null);
				}

				if(isEmpty(userObjective)) {
					err = new Error('Objective not found');
					return callback(err, null);
				}

				if ((!userObjective.userId.equals(session._id))
				&& (!userObjective.userId.equals(session.mentor))
				&& (!session.localRole === CONST.user.localRole.ADMIN)) {
					err = new Error('Forbidden');
					err.status = 403;
					return callback(err, null);
				}

				return callback(null, userObjective);
			});
		},
		(userObjective, callback) => {
			userObjective.isDeleted = flag;
			userObjective.deletedDate = new Date();
			userObjective.deletedBy = session._id;

			userObjective.save((err, userObjective) => {
				if(err) {
					return callback(err, null);
				}

				return callback(null, userObjective);
			});
		},
		(userObjective, callback) => {
			historyType = userObjective.isBacklog ? CONST.history.type.SOFT_DELETE_FROM_BACKLOG : historyType;

            if (userObjective.userId.equals(session._id)) {
                HistoryRepository.addUserObjective(session._id, userObjectiveId, historyType, (err, historyEvent) => {
                    if(err) {
                        return  callback(err, null);
                    }

					return callback(null, userObjective);
				});
			} else {
                HistoryRepository.addUserObjectiveToOtherUser(session._id, userObjective.userId, userObjectiveId, historyType, (err, historyEvent) => {
                    if(err) {
                        return  callback(err, null);
                    }

					return callback(null, userObjective);
				});
            }
		}
		], (err, result) => {
			return callback(err, result);
		})
};

UserObjectiveService.prototype.setScoreToKeyResult = function(session, userId, objectiveId, keyResultId, score, callback) {
	async.waterfall([
		(callback) => {
			UserRepository.getById(userId, (err, user) => {
				if(err) {
					return callback(err, null);
				}

				if(isEmpty(user)) {
					err = new Error('User not found');
					return callback(err, null);
				}

				if(!isMentorActionAllowed(user, session)) {
					err = new Error('You are not allowed to do this');
					return callback(err, null);
				}

				return callback(null);
			});
		},
		(callback) => {
			UserObjectiveRepository.getById(objectiveId, (err, userObjective) => {
				if(err) {
					return callback(err, null);
				}

				if(isEmpty(userObjective)) {
					var err = new Error('Objective not found');
					return callback(err, null);
				}

				// TODO: Should be check for userObjective.isArchived
				// Removed temporary

				return callback(null, userObjective);
			});
		},
		(userObjective, callback) => {
			var index = userObjective.keyResults.findIndex((keyResult) => {
				return keyResult._id.equals(keyResultId);
			});

			if(index === -1) {
				var err = new Error('Key result not found');
				return callback(err, null);
			}

			userObjective.keyResults[index].score = score;

			userObjective.save((err, userObjective) => {
				if(err) {
					if (err.name == 'ValidationError') {
						for (field in err.errors) {
							console.log(err.errors[field].message);
						}
					}

					return callback(err, null);
				}

				return callback(null, {
					objectiveId: userObjective._id,
					keyResultId: userObjective.keyResults[index]._id,
					score: userObjective.keyResults[index].score
				});
			});
		},
		(result, callback) => {
			if (session._id == userId) {
				HistoryRepository.setScoreToKeyResult(session._id, result, CONST.history.type.CHANGE_SCORE, (err) =>{
					if (err)
						return callback(err, null);
				});
			} else {
				HistoryRepository.setScoreToKeyResultToOtherUser(session._id, userId, result, CONST.history.type.CHANGE_SCORE, (err) =>{
					if (err)
						return callback(err, null);
				});
			}

			return callback(null, result);
		}
		], (err, result) => {
			return callback(err, result);
		});
};

UserObjectiveService.prototype.setTitleAndDifficultyToKeyResult = function(userId, objectiveId, keyResultId, title, difficulty, callback) {
	async.waterfall([
		(callback) => {
			UserObjectiveRepository.getByIdPopulate(objectiveId, (err, userObjective) => {
				if(err) {
					return callback(err, null);
				}

				if(isEmpty(userObjective)) {
					var err = new Error('Objective not found');
					return callback(err, null);
				}

				// TODO: Should be check for userObjective.isArchived
				// Removed temporary
				//if(!userObjective.userId.equals(userId)) {
				//	var err = new Error('You are not allowed to do this');
				//	return callback(err, null);
				//}

				return callback(null, userObjective);
			});
		},
		(userObjective, callback) => {
			var index = userObjective.keyResults.findIndex((keyResult) => {
				return keyResult._id.equals(keyResultId);
			});

			if(index === -1) {
				var err = new Error('Key result not found');
				return callback(err, null);
			}


			let userObjectiveId = userObjective._id;
			let keyResultTemplateId = userObjective.keyResults[index].templateId._id;
			let prevTitle = userObjective.keyResults[index].templateId.title;
			let prevDifficulty = userObjective.keyResults[index].templateId.difficulty;

			return callback(null,
			   		userObjectiveId,
					  keyResultId,
					  keyResultTemplateId,
						prevTitle,
						prevDifficulty
				);
		},
		(userObjectiveId, keyResultId, keyResultTemplateId, prevTitle,	prevDifficulty, callback) => {
			KeyResultRepository.getById(keyResultTemplateId, (err, KeyResult) => {
				if (err) {
					return callback(err, null);
				}

				if(isEmpty(KeyResult)) {
					var err = new Error('Key result not found');
					return callback(err, null);
				}

				KeyResult.title = title;
				KeyResult.difficulty = difficulty;

				KeyResult.save((err, userObjective) => {
					if(err) {
						return callback(err, null);
					}

					return callback(null,
							{
								objectiveId: userObjectiveId,
								keyResultId: keyResultId,
								title: KeyResult.title,
								difficulty: KeyResult.difficulty
							},
							prevTitle,
							prevDifficulty
					);
				});
			});
		},
		(result, prevTitle, prevDifficulty, callback) => {
			if ( prevTitle.toString() !== result.title ) {
				HistoryRepository.setTitleToKeyResult(userId, result, CONST.history.type.CHANGE_TITLE, (err) =>{
					if (err)
						return callback(err, null);
				});
			}

			if ( prevDifficulty.toString() !== result.difficulty ) {
				HistoryRepository.setDifficultyToKeyResult(userId, result, CONST.history.type.CHANGE_DIFFICULTY, (err) =>{
					if (err)
						return callback(err, null);
				});
			}

			return callback(null, result);
		}
		], (err, result) => {
			return callback(err, result);
		});
};

UserObjectiveService.prototype.getFromBacklog = function(params, callback) {
	UserObjectiveRepository.getByUserIdBacklogPopulate(params.userId, (err, objectives) => {
		if (err) {
			return callback(err, null);
		}

		var categoryId = params.categoryId;

		if (!ValidateService.isCorrectId(categoryId)) {
			return callback(null, objectives);
		}

		var data = objectives.filter((objective) => {
			return objective.templateId.category._id.equals(categoryId);
		});

		return callback(null, data);
	});
};

UserObjectiveService.prototype.addToQuarter = function(session, userId, backlogObjectiveId, quarterInd, callback) {
	async.waterfall([
		(callback) => {
			UserObjectiveRepository.getByIdPopulate(backlogObjectiveId, (err, backlogObjective) => {
				if (err) {
					return callback(err);
				}

				if (isEmpty(backlogObjective)) {
					err = new Error('User objective not found');
					return callback(err, null);
				}

				return callback(null, backlogObjective);
			});
		},
		(backlogObjective, callback) => {
			QuarterRepository.getUserCurrentYearQuarterByIndex(userId, quarterInd, (err, quarter) => {
				if (err) {
					return callback(err, null);
				}

				if (isEmpty(quarter)) {
					err = new Error('User quarter not found');
					return callback(err, null);
				}

				var userObjectiveInd = quarter.userObjectives.findIndex((objective) => {
					return objective.templateId._id.equals(backlogObjective.templateId._id);
				});

				if (userObjectiveInd !== -1) {
					err = new Error('This objective id already exists in your list');
					return callback(err, null);
				}

				quarter.userObjectives.push(backlogObjective._id);

				quarter.save((err) => {
					if (err) {
						return callback(err);
					}

					return callback(null, quarter);
				});
			});
		},

		(quarter, callback) => {
			UserObjectiveRepository.getByIdPopulate(backlogObjectiveId, (err, objective) => {
				if (err) {
					return callback(err);
				}

				if (isEmpty(objective)) {
					err = new Error('User objective not found');
					return callback(err, null);
				}

				objective.isBacklog = false;
				objective.quarterId = quarter._id;

				objective.save((err, objective) => {
					if (err) {
						return callback(err);
					}

					return callback(null, objective);
				});
			});
		},
		(userObjective, callback) => {
			HistoryRepository.addUserObjective(session._id, userObjective._id, CONST.history.type.ADD_FROM_BACKLOG_TO_QUARTER, (err) => {
				if (err) {
					return callback(err, null);
				}

				return callback(null, userObjective);
			});
		},
	], (err, res) => {
		return callback(err, res);
	});

};

UserObjectiveService.prototype.moveToBacklog = function (session, userObjectiveId, userId, callback) {
	async.waterfall([
		(callback) => {
			QuarterRepository.getUserCurrentQuarter(userId, (err, quarter) => {
				if (err) {
					return callback(err);
				}

				var ind = quarter.userObjectives.findIndex((id) => {
					return id.equals(userObjectiveId);
				});

				if (ind === -1) {
					err = new Error('Objective id dont exists in current quarter');
					return callback(err);
				}

				var userObjectives = quarter.userObjectives;
				userObjectives.splice(ind, 1);
				quarter.userObjectives = userObjectives;

				quarter.save(err => err ? callback(err) : callback(null, quarter));
			});
		},
		(quarter, callback) => {
			UserObjectiveRepository.update(userObjectiveId, { quarterId: null, isBacklog: true }, (err) => {
				return err ? callback(err) : callback(null);
			});
		},
		(callback) => {
			UserObjectiveRepository.getByIdPopulate(userObjectiveId, (err, userObjective) => {
				if (err) {
					return callback(err);
				}

				if (isEmpty(userObjective)) {
					err = new Error('Userobjective dont exists');
					return callback(err);
				}

				return callback(null, userObjective);
			});
		},
		(userObjective, callback) => {
			HistoryRepository.addUserObjective(session._id, userObjective._id, CONST.history.type.RESTORE_TO_BACKLOG, (err) => {
				if (err) {
					return callback(err, null);
				}

				return callback(null, userObjective);
			});
		},
	], (err, res) => {
		return callback(err, res);
	});
};

UserObjectiveService.prototype.getNotApprovedObjectives = function(callback) {
	async.waterfall([
		(callback) => {
			UserObjectiveRepository.getWithoutBacklogPopulate((err, userObjectives) => {
				if (err) {
					return callback(err);
				}

				if (isEmpty(userObjectives)) {
					err = new Error('Objectives doesn`t exists');
					return callback(err);
				}

				var objectives = userObjectives.map((userObjective) => {
					return userObjective.templateId;
				});

				objectives = HelpService.getUniqueValuesFromArrayOfObjects(objectives, '_id');

				objectives = objectives.filter((item) => {
					return item.isApproved == false && item.isDeleted == false;
				});

				return callback(null, objectives);
			});
		}
	], (err, res) => {
		return callback(err, res);
	});
}

UserObjectiveService.prototype.getNotApprovedKeyResults = function(callback) {
	async.waterfall([
		(callback) => {
			UserObjectiveRepository.getWithoutBacklogPopulate((err, userObjectives) => {
				if (err) {
					return callback(err);
				}

				if (isEmpty(userObjectives)) {
					err = new Error('Objectives doesn`t exists');
					return callback(err);
				}					

				var keyResults = [];
				userObjectives.forEach((userObjective) => {
					userObjective.keyResults.map((item) => {
						return item.templateId.isApproved == false && item.templateId.isDeleted == false
						 	? keyResults.push(item.templateId) : null;
					});
				});
				
				keyResults = HelpService.getUniqueValuesFromArrayOfObjects(keyResults, '_id');
				return callback(null, keyResults);
			});
		}
	], (err, res) => {
		return callback(err, res);
	});
}

module.exports = new UserObjectiveService();
