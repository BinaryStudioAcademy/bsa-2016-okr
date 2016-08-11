var UserRepository = require('../repositories/user.js');
var Objective = require('../schemas/objective');
var Key = require('../schemas/key');
var ObjectiveRepository = require('../repositories/objective.js');
var KeyRepository = require('../repositories/key.js');
var async = require('async');

var ObjectiveService = function() {};

// 1) Create new objective with empty keys array
// 2) Create all keys with corresponding objectiveId
// 3) Push key ids to objective.keys
// 4) Save objective and keys in DB
// 5) Profit =)
ObjectiveService.prototype.add = function(objective, keys, callback) {
	objective = new Objective(objective);

	keys = keys.map((key) => {
		key.objectiveId = objective._id;
		key = new Key(key);
		objective.keys.push(key._id);

		return key;
	});

	async.waterfall([
		(callback) => {
			objective.save((err, obj) => {
				return err ? callback(err) : callback(null, obj);
			});
		}, (obj, callback) => {
			obj = obj.toObject();
			obj.keys = [];
			async.forEach(keys, (key, callback) => {
				key.save((err, key) => {
					if(err) { return callback(err); }
					
					obj.keys.push(key);
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

ObjectiveService.prototype.addToMe = function(objective, keys, callback) {
	userId = objective.createdBy;

	async.waterfall([
		(callback) => {
			return ObjectiveService.prototype.add(objective, keys, callback);
		}, (objective, callback) => {
			UserRepository.getById(userId, (err, user) => {
				return callback(err, user, objective);
			});
		}, (user, objective, callback) => {
			console.log(user);
			console.log('00000000');
			console.log(objective);
		}
	], (err, result) => {
	});
};

ObjectiveService.prototype.autocomplete = function(title, callback) {
	async.waterfall([
		(callback) => {
			ObjectiveRepository.getAll(function(err, objArr) {
				if (err) {
					return callback(err, null);
				}

				return callback(null, objArr);
			});
		}, 
		(objArr, callback) => {
			let objectives = [];
			
			objArr.forEach((objective) => {
				if (objective.title.toLowerCase().indexOf(title.toLowerCase()) !== -1) {
					objectives.push(objective);
				}
			});

			return callback(null, objectives);
		}
	], (err, result) => {
		return callback(err, result);
	});
}

/**
*
* @param data - contain three object: 1) objective 2) keys array 3) userId
* @param callback
*/
// ObjectiveService.prototype.addObjectiveToUser = (data, callback) => {
// 	let userId = data.userId;

// 	async.waterfall([
// 		addObjectiveTemplateToDb,
// 		addObjectiveToUser,
// 		addEventsToHistory,
// 	], (err, result) => {
// 		callback(err);
// 	});

// 	function addObjectiveTemplateToDb(callback) {
// 		if (!data.objective.objectiveId) {
// 			async.waterfall([
// 				(callback) => {
// 					ObjectiveRepository.add(data.objective, (err, data) => {
// 						if (err) {
// 							return callback(err, null);
// 						};

// 						return callback(null);
// 					});
// 				}, (callback) => {
// 					async.every(data.keys, (key, callback) => {
// 						KeysRepository.add(key, (err, data) => {
// 							return err ? callback(err, null) : callback(null);
// 						});
// 					}, (err, result) => {
// 							return callback(err);
// 					});
// 				}
// 			], (err, result) => {
// 				return callback(err);
// 			});
// 		} else {
// 			async.waterfall([
// 				(callback) => {
// 					ObjectiveRepository.getById(data.objective.objectiveId, (err, objective) => {
// 						if (err) {
// 							return callback(err, null);
// 						};

// 						return callback(null, objective);
// 					}
// 				}, (objective, callback) => {
// 					if(objective.forks.indexOf(userId) === -1) {
// 						objective.forks.push(userId);
// 					}

// 					return callback(null);
// 				}, (callback) => {
// 					data.keys.forEach((key) => {
// 						if(key.id) {
// 							// Fork key from keys collection
// 							KeysRepository.getById(key.id, (err, key)  => {
// 								if(key.forks.indexOf(userId) === -1) {
// 									key.forks.push(userId);
// 								}

// 								return callback(null);
// 							});
// 						} else {
// 							// Add key to keys collection
// 							KeysRepository.add(key, (err, data) => {
// 								return err ? callback(err, null) : callback(null);
// 							})
// 						}
// 					});
// 				}
// 			], (err, result) => {
// 				return callback(err);
// 			});
// 		}

// 		callback(null);
// 	}
	
// 	function addObjectiveToUser(callback) {
// 		return callback(null, 'three');
// 	}

// 	function addEventsToHistory(callback) {
// 		return callback(null, 'done');
// 	}
// };

module.exports = new ObjectiveService();