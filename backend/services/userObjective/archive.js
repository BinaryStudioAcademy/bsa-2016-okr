var async = require('async');
var ValidateService = require('../../utils/ValidateService');
var isEmpty = ValidateService.isEmpty;
var CONST = require('../../config/constants');
var session = require('../../config/session');

var UserObjectiveRepository = require('../../repositories/userObjective.js')
var QuarterRepository = require('../../repositories/quarter.js');


module.exports = function changeArchiveStatus(userObjectiveId, flag, callback) {
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
		}
	], (err) => {
		return callback(err, null);
	})
}