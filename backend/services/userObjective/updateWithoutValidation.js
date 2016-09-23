const async = require('async');
const CONST = require('../../config/constants.js');

const HistoryRepository = require('../../repositories/history');
const UserObjectiveRepository = require('../../repositories/userObjective');

module.exports = function updateWithoutValidation(author, id, body, callback){
	async.waterfall([
	(callback) => {
		UserObjectiveRepository.update(id, body, (err) => {
			if(err)
				return callback(err)
			return callback(null)
		})
	},
	(callback) => {
		if(typeof(body.isDeleted) ==='boolean')
			HistoryRepository.addUserObjective(author, id, CONST.history.type.RESTORE, (err) =>{
				if(err)
					return callback(err)
				return callback(null)
			})
		else return callback(null)
	}
	], (err, res) => {
		return callback(err, res);
	})
}