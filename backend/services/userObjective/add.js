var async = require('async');
var ValidateService = require('../../utils/ValidateService');
var isEmpty = ValidateService.isEmpty;
var CONST = require('../../config/constants');
var session = require('../../config/session');

var ObjectiveRepository = require('../../repositories/objective');
var UserObjectiveRepository = require('../../repositories/userObjective');
var QuarterRepository = require('../../repositories/quarter');
var HistoryRepository = require('../../repositories/history');

module.exports = function addUserObjective(userId, categoryId, quarterId, objectiveId, title, isApproved, callback) {
	async.waterfall([
		(callback) => {
			if(!isEmpty(objectiveId)) {
				// console.log('ObjectiveId not empty');
				ObjectiveRepository.getById(objectiveId, (err, objective) => {
					if(err) {
						return callback(err, null);
					}

					if(isEmpty(objective)) {
						var err = new Error('Such objective does not exists');
						return callback(err, null);
					}

					return callback(null, objective);
				});
			} else {
				return callback(null, {});	
			}
		}, (objective, callback) => {
			if(isEmpty(objective)) {
				// console.log('-----------------------------------');
				// console.log('Trying to find template by title');
				// console.log('-----------------------------------');
				ObjectiveRepository.getByTitleAndCategoryId(title, categoryId, (err, objective) => {
					if(err) {
						return callback(err, null);
					}

					// if(!isEmpty(objective)) {
					// 	console.log('-----------------------------------');
					// 	console.log('Founded by same title');
					// 	console.log('-----------------------------------');
					// }

					return callback(null, objective);
				});
			} else {
				// console.log('-----------------------------------');
				// console.log('Founded by template id');
				// console.log('-----------------------------------');
				return callback(null, objective);
			}
		}, (objective, callback) => {
			if(isEmpty(objective)) {
				var objectiveData = {
					title: title,
					description: '',
					category: categoryId,
					creator: session._id,
					used: 1,
					defaultKeyResults: [],
					isApproved: isApproved,
					isDeleted: false,
				};

				ObjectiveRepository.add(objectiveData, (err, objective) => {
					if(err) {
						return callback(err, null);
					}

					// console.log('-----------------------------------');
					// console.log('Template not found. Objective created');
					// console.log('-----------------------------------');
					return callback(null, objective);
				});
			} else {
				objective.used += 1;

				objective.save((err, objective) => {
					if(err) {
						return callback(err, null);
					}
					
					// console.log('-----------------------------------');
					// console.log('Increased used counter to ', objective.used);
					// console.log('-----------------------------------');
					return callback(null, objective);
				});
			}
		}, (objective, callback) => {
			var keyResults = objective.defaultKeyResults.map((keyResultId) => {
				return {
					templateId: keyResultId,
					creator: session._id
				};
			});
			
			var userObjectiveData = {
				templateId: objective._id,
				userId: userId,
				creator: session._id,
				isDeleted: false,
				keyResults: keyResults,
			};

			UserObjectiveRepository.add(userObjectiveData, (err, userObjective) => {
				if(err) {
					return callback(err, null);
				};
				
				// console.log('-----------------------------------');
				// console.log('Created UserObjective');
				// console.log('-----------------------------------');
				return callback(null, userObjective);
			});
		}, (userObjective, callback) => {
			var data = {$push: {userObjectives: userObjective._id}}
			
			QuarterRepository.update(quarterId, data, (err, quarter) => {
				if(err) {
					return callback(err, null);
				};

				// console.log('-----------------------------------');
				// console.log('Added objective to quarter');
				// console.log('-----------------------------------');
				return callback(null, userObjective);
			});
		}, (userObjective, callback) => {
			HistoryRepository.addUserObjective(session._id, userObjective._id, CONST.history.type.ADD, (err) => {
				if(err) {
					return callback(err, null);
				};
				
				// console.log('-----------------------------------');
				// console.log('History event saved');
				// console.log('-----------------------------------');
				return callback(null, userObjective);
			});
		},
		(userObjective, callback) => {
			UserObjectiveRepository.getByIdPopulate(userObjective._id, (err, userObjective) => {
				if(err) {
					return callback(err, null)
				}

				if(isEmpty(userObjective)) {
					let err = new Error('Unexpected server error. How could that be? O_o');
					err.status = 500;
					return callback(err, null);
				}

				return callback(null, userObjective);
			});
		}
		], (err, result) => {
			return callback(err, result);
		});
};