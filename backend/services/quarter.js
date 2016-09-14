var QuarterRepository = require('../repositories/quarter');
var HistoryRepository = require('../repositories/history');
var UserObjectiveRepository = require('../repositories/userObjective.js');
var async = require('async');

var QuarterService = function() {};

QuarterService.prototype.generateNotification = function() {};

QuarterService.prototype.setArchivedStatusTo = function (id, flag, callback) {
	
	async.waterfall([
		(callback) => {
			QuarterRepository.getByIdPopulate(id, (err, result) => {
				if(err)
					return callback(err, null)
				return callback(null, result)
			})
		},
		(quarter, callback) => {
			async.eachSeries(quarter.userObjectives, (item, callback) => {
				UserObjectiveRepository.findByIdAndUpdateArchive(item._id, flag, (err) => {
					if(err)
						return callback(err)
					callback()
				})
			}, (err, result) => {
				if(err)
					return callback(err, null)
				return callback(null)
			})
		},
		(callback) => {
			QuarterRepository.setArchivedStatusTo(id, flag, (err, result) => {
				return callback(err, result);
			})
		}

	], (err, result) => {
		return callback(err, result);
	})
}

module.exports = new QuarterService();