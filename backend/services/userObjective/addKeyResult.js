const async = require('async');
const ValidateService = require('../../utils/ValidateService');
const isEmpty = ValidateService.isEmpty;
const CONST = require('../../config/constants.js');

const UserObjectiveRepository = require('../../repositories/userObjective');
const KeyResultRepository = require('../../repositories/keyResult');
const HistoryRepository = require('../../repositories/history');

module.exports = function addKeyResultToUserObjective(userId, userObjectiveId, keyResultId, keyResultTitle, isApproved, callback) {
	async.waterfall([
		(callback) => {
			UserObjectiveRepository.getById(userObjectiveId, (err, userObjective) => {
				if (err) {
					return callback(err, null);
				}

				if (isEmpty(userObjective)) {
					let err = new Error('Can not find user objective');
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
						let err = new Error('Can not find key result by selected id');
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
				
				let keyResultData = {
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
			let userObjectiveDataForUpdate = {
				$push: {
					keyResults: {
						'templateId': keyResult._id,
						'creator': userId,
					},
				},
			};

			this.update(userId, userObjectiveId, userObjectiveDataForUpdate, (err, userObjectiveFromUpdate) => {
				if (err) {
					return callback(err, null);
				}

				// console.log('-----------------------------------');
				// console.log('UserObjective.keyResults updated');
				// console.log('-----------------------------------');

				return callback(null, userObjective, keyResult);
			});
		},
		(userObjective, keyResult, callback) => {
			// console.log('-----------------------------------');
			// console.log('User objective', userObjective);
			// console.log('-----------------------------------');
			UserObjectiveRepository.getById(userObjective._id, (err, userObjective) => {
				if (err) {
					return callback(err, null);
				}


				if (!userObjective) {
					err = new Error('Can not find user objective');
					return callback(err, null);
				}

				let index = userObjective.keyResults.findIndex((keyResultItem) => {
					return keyResult._id.equals(keyResultItem.templateId);
				});

				if(index === -1) {
					let err = new Error('Key result not found');
					return callback(err, null);
				}

				let keyResultIdInObjective = userObjective.keyResults[index]._id;

				responseData = {
					keyResultId: keyResultIdInObjective,
					keyResult: keyResult,
				};

				return callback(null, keyResult, userObjective, responseData);
			});
		},
		(keyResult, userObjective, responseData, callback) => {
			HistoryRepository.addUserKeyResult(userId, keyResult, userObjective, CONST.history.type.ADD, (err) => {
				if(err)
					return callback(err,null);
			});
			return callback(null, responseData);
		}
		], (err, result) => {
			return callback(err, result);
		})	
};