const async = require('async');
const ValidateService = require('../../utils/ValidateService');
const isEmpty = ValidateService.isEmpty;
const isMentorActionAllowed = ValidateService.isMentorActionAllowed;
const HelpService = require('../../utils/HelpService');
const CONST = require('../../config/constants.js');

const UserObjectiveRepository = require('../../repositories/userObjective');
const KeyResultRepository = require('../../repositories/keyResult');
const HistoryRepository = require('../../repositories/history');
const UserRepository = require('../../repositories/user');

module.exports = function addKeyResultToUserObjective(
	session, userId, userObjectiveId, keyResultId, keyResultTitle, isApproved, callback) {
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

				if(!isMentorActionAllowed) {
					err = new Error('You are not allowed to perform this action');
					return callback(err, null);
				}

				return callback(null);
			});
		}, (callback) => {
			UserObjectiveRepository.getById(userObjectiveId, (err, userObjective) => {

				if (err) {
					return callback(err, null);
				}

				if (isEmpty(userObjective)) {
					var err = new Error('Can not find user objective');
					return callback(err, null);
				}

				// console.log('-----------------------------------');
				// console.log('User objective founded');
				// console.log('-----------------------------------');

				return callback(null, userObjective);
			});
		}, (userObjective, callback) => {
			if(!isEmpty(keyResultId)) {
				KeyResultRepository.getById(keyResultId, (err, keyResult) => {

					if (err) {
						return callback(err, null);
					}

					if (isEmpty(keyResult)) {
						var err = new Error('Can not find key result by selected id');
						return callback(err, null);
					}

					// console.log('-----------------------------------');
					// console.log('KeyResult template found by id');
					// console.log('-----------------------------------');

					return callback(null, userObjective, keyResult);
				})
			} else {
				return callback(null, userObjective, {});
			}
		}, (userObjective, keyResult, callback) => {
			if(isEmpty(keyResult)) {

				KeyResultRepository.getByTitleAndObjectiveId(keyResultTitle, userObjective.templateId, (err, keyResult) => {
					if(err) {
						return callback(err, null);
					}

					// if(!isEmpty(keyResult)) {
						// console.log('-----------------------------------');
						// console.log('KeyResult template found by title');
						// console.log('-----------------------------------');
					// }

					return callback(null, userObjective, keyResult);
				});
			} else {
				return callback(null, userObjective, keyResult);
			}
		}, (userObjective, keyResult, callback) => {

			if (isEmpty(keyResult)) {
				// console.log('-----------------------------------');
				// console.log('KeyResult not found in DB. Creating new template...');
				// console.log('-----------------------------------');

				var keyResultData = {
					title: keyResultTitle,
					creator: userId,
					objectiveId: userObjective.templateId,
					isDeleted: false,
					isApproved: isApproved,
					used: 1,
				};

				KeyResultRepository.add(keyResultData, (err, createdKeyResult) => {
					if (err) {
						return callback(err, null);
					}

					if (isEmpty(createdKeyResult)) {
						err = new Error(`Can not create key result`);
						return callback(err, null);
					}

					// console.log('-----------------------------------');
					// console.log('KeyResult template created');
					// console.log('-----------------------------------');

					return callback(null, userObjective, createdKeyResult);
				});
			} else {
				keyResult.used += 1;

				keyResult.save((err, keyResult) => {
					if(err) {
						return callback(err, null);
					}

					// console.log('-----------------------------------');
					// console.log('KeyResult template counter increased');
					// console.log('-----------------------------------');
					return callback(null, userObjective, keyResult);
				});
			}
		}, (userObjective, keyResult, callback) => {

			var userObjectiveDataForUpdate = {
				$push: {
					keyResults: {
						'templateId': keyResult._id,
						'creator': userId,
						'deletedBy' : null,
						'deletedDate' : null,
						'isDeleted' : false,
					},
				},
			};

			UserObjectiveRepository.update(userObjectiveId, userObjectiveDataForUpdate, (err, oldObjective) => {
				if(err) {
					return callback(err, null);
				}

				return callback(null, userObjective, keyResult);
			});

			//this.update(session, userObjectiveId, userObjectiveDataForUpdate, (err, userObjectiveFromUpdate) => {
			//
			//	if (err) {
			//		return callback(err, null);
			//	}
			//
			//	// console.log('-----------------------------------');
			//	// console.log('UserObjective.keyResults updated');
			//	// console.log('-----------------------------------');
			//
			//	return callback(null, userObjective, keyResult);
			//});
		},
		(userObjective, keyResult, callback) => {
			// console.log('-----------------------------------');
			// console.log('User objective', userObjective);
			// console.log('-----------------------------------');
			UserObjectiveRepository.getById(userObjective._id, (err, userObjectiveItem) => {
				if (err) {
					return callback(err, null);
				}


				if (!userObjectiveItem) {
					err = new Error('Can not find user objective');
					return callback(err, null);
				}

				var index = userObjectiveItem.keyResults.findIndex((keyResultItem) => {
					return keyResult._id.equals(keyResultItem.templateId);
				});

				if(index === -1) {
					var err = new Error('Key result not found');
					return callback(err, null);
				}

				var keyResultIdInObjective = userObjectiveItem.keyResults[index]._id;

				var responseData = {
					keyResultId: keyResultIdInObjective,
					keyResult: keyResult,
				};

				return callback(null, keyResult, userObjectiveItem, responseData);
			});
		},
		(keyResult, userObjective, responseData, callback) => {
			let type = userObjective.isBacklog ? CONST.history.type.ADD_TO_BACKLOG : CONST.history.type.ADD;

			if (session._id == userId) {
				HistoryRepository.addUserKeyResult(session._id, keyResult, userObjective, type, (err) => {
					if (err) {
						return callback(err, null);
					}

					return callback(null, responseData);
				});
			} else {
				HistoryRepository.addUserKeyResultToOtherUser(session._id, userId, keyResult, userObjective, type, (err) => {
					if (err) {
						return callback(err, null);
					}

					return callback(null, responseData);
				});
			}
		}
		], (err, result) => {
			return callback(err, result);
		})
};
