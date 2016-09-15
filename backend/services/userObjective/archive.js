var async = require('async');
var ValidateService = require('../../utils/ValidateService');
var isEmpty = ValidateService.isEmpty;
var CONST = require('../../config/constants');

var UserObjectiveRepository = require('../../repositories/userObjective.js')
var QuarterRepository = require('../../repositories/quarter.js');
var HistoryRepository = require('../../repositories/history.js')

module.exports = function changeArchiveStatus(authorId, userObjectiveId, flag, callback) {
	async.waterfall([
		(callback) => {
			UserObjectiveRepository.changeIsArchivedTo(userObjectiveId, flag, (err) => {
				if (err)
					return callback(err);
				return callback(null);
			})
		},
		(callback) => {
			if(flag === true)
				QuarterRepository.changeIsArchivedByObjectiveId(userObjectiveId, flag, (err) => {
					if (err)
						return callback(err);
				})
			return callback(null);
		},
		(callback) => {
			let action = flag === true ? CONST.history.type.ARCHIVED : CONST.history.type.UNARCHIVED;
			HistoryRepository.addUserObjective(authorId, userObjectiveId, action, (err) => {
					if (err)
						return callback(err);
				return callback(null);
			})
		}
	], (err) => {
		return callback(err, null);
	})
}