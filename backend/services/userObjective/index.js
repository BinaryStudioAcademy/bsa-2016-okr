const async = require('async');
const ValidateService = require('../../utils/ValidateService');
const isEmpty = ValidateService.isEmpty;
const CONST = require('../../config/constants');

const ObjectiveService = require('../objective');
const ObjectiveRepository = require('../../repositories/objective');
const UserObjectiveRepository = require('../../repositories/userObjective');
const QuarterRepository = require('../../repositories/quarter');
const Quarter = require('../../schemas/quarter');
const UserRepository = require('../../repositories/user');
const HistoryRepository = require('../../repositories/history');

const add = require('./add');
const addKeyResult = require('./addKeyResult');
const updateHelper = require('./updateHelper');

var UserObjectiveService = function() {};

UserObjectiveService.prototype.add = add;
UserObjectiveService.prototype.addKeyResult = addKeyResult;

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
				if (session.localRole == CONST.user.localRole.ADMIN
					|| session._id.toString() === userObjective.userId.toString()
					|| (session.localRole == CONST.user.localRole.MENTOR && user.mentor._id.toString() == session._id.toString() )) {
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
			HistoryRepository.addUserObjective(session._id, userObjectiveId, historyType, (err, historyEvent) => {
				if(err) {
					return  callback(err, null);
				}

				return callback(null, userObjective);
			});
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
			HistoryRepository.addUserObjective(session._id, userObjectiveId, historyType, (err, historyEvent) => {
				if(err) {
					return  callback(err, null);
				}
				return callback(null, userObjective);
			});
		}
		], (err, result) => {
			return callback(err, result);
		})
};

UserObjectiveService.prototype.setScoreToKeyResult = function(userId, objectiveId, keyResultId, score, callback) {
	async.waterfall([
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
				if(!userObjective.userId.equals(userId)) {
					var err = new Error('You are not allowed to do this');
					return callback(err, null);
				}

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
			HistoryRepository.setScoreToKeyResult(userId, result, CONST.history.type.CHANGE_SCORE, (err) =>{
				if (err)
					return callback(err, null);
			})
			return callback(null, result);
		}
		], (err, result) => {
			return callback(err, result);
		});
};

module.exports = new UserObjectiveService();
