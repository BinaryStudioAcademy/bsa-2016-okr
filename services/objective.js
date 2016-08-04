var UserRepository = require('../repositories/user.js'),
	ObjectiveRepository = require('../repositories/objective.js'),
	KeysRepository = require('../repositories/key.js'),
	async = require('async');

var ObjectiveService = function() {};

/**
*
* @param data - contain three object: 1) objective 2) keys array 3) userId
* @param callback
*/

ObjectiveService.prototype.addObjectiveToUser = (data, callback) => {
	let userId = data.userId;

	async.waterfall([
		addObjectiveToDb,
		addObjectiveToUser,
		addEventsToHistory,
	], (err, result) => {
		callback(err);
	});

	function addObjectiveToDb(callback) {
		if (!data.objective.objectiveId) {
			async.waterfall([
				(callback) => {
					ObjectiveRepository.add(data.objective, (err, data) => {
						if (err) {
							return callback(err, null);
						};

						return callback(null);
					});
				}, (callback) => {
					async.every(data.keys, (key, callback) => {
						KeysRepository.add(key, (err, data) => {
							return err ? callback(err, null) : callback(null);
						});
					}, (err, result) => {
							return callback(err);
					});
				}
			], (err, result) => {
				return callback(err);
			});
		} else {
			async.waterfall([
				(callback) => {
					ObjectiveRepository.getById(data.objective.objectiveId, (err, objective) => {
						if (err) {
							return callback(err, null);
						};

						return callback(null, objective);
					}
				}, (objective, callback) => {
					if(objective.forks.indexOf(userId) === -1) {
						objective.forks.push(userId);
					}

					return callback(null);
				}, (callback) => {
					data.keys.forEach((key) => {
						if(key.id) {
							// Fork key from keys collection
							KeysRepository.getById(key.id, (err, key)  => {
								if(key.forks.indexOf(userId) === -1) {
									key.forks.push(userId);
								}

								return callback(null);
							});
						} else {
							// Add key to keys collection
							KeysRepository.add(key, (err, data) => {
								return err ? callback(err, null) : callback(null);
							})
						}
					});
				}
			], (err, result) => {
				return callback(err);
			});
		}

		callback(null);
	}
	
	function addObjectiveToUser(arg1, arg2, callback) {
		return callback(null, 'three');
	}

	function addEventsToHistory(arg1, callback) {
		return callback(null, 'done');
	}
};

module.exports = new ObjectiveService();