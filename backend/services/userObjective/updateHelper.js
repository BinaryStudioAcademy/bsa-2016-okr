var async = require('async');
var CONST = require('../../config/constants');
var UserObjectiveRepository = require('../../repositories/userObjective');
var HistoryRepository = require('../../repositories/history');

module.exports = function updateHelper(authorId, userObjectiveId, objective, callback){
	async.waterfall([
		(callback) => {
			UserObjectiveRepository.update(userObjectiveId, objective, (err, userObjective) => {
				if(err) {
					return callback(err, null);
				};

				return callback(null, userObjective);
			})
		},
		(userObjective, callback) => {
			 console.log('update finished');
			 HistoryRepository.addUserObjective(authorId, userObjectiveId, CONST.history.type.UPDATE, (err) => {
			 	if(err) {
			 		return callback(err, null);
			 	};
			 	return callback(null, userObjective);
			});
		}
		], (err, result) => {
			return callback(err, result)
		})
};
