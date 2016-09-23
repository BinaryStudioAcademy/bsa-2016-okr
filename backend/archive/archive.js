
// mongoose.connect(dbConfig.uri, dbConfig.opts);

// mongoose.connection.once('open', () => {
// 	archive();
// });

module.exports = function () {
	var util = require('util');
	var mongoose = require('mongoose');
	var async = require('async');
	var dbConfig = require('../config/db');
	var UserObjective = require('../schemas/userObjective');
	var Quarter = require('../schemas/quarter');
	var QuarterRepository = require('../repositories/quarter.js');
	var CONST = require('../config/constants.js');
	var Objective = require('../schemas/objective.js');
	var KeyResult = require('../schemas/keyResult.js');
	// mongoose.connect(dbConfig.uri, dbConfig.opts);

	// mongoose.connection.once('open', () => {
	// 	archive();
	// });

	var quarterModel = Quarter;
	var userObjectiveModel = UserObjective;
	var idList =[];
	var options = { multi: true };

	async.waterfall([
	(callback) => {
			quarterModel.find({ isArchived: false }, (err, docs) => {
				if (err)
					return callback(err);
				docs.forEach((quarter)=>{
					if(quarter.year <= CONST.currentYear && quarter.index < CONST.currentQuarter)
						quarter.userObjectives.forEach((userobjective) => {
								idList.push(userobjective);
						})
				})
				// console.log('finded: ' + idList.length);
				return callback(null);
			})
	},
	(callback) =>{
			idList.forEach((id) => {
				userObjectiveModel.findByIdAndUpdate(id, {'$set': {isArchived:true}}, options, (err) => {
					if (err)
						return callback(err)
				})
			})
			// console.log('updated obj');
			return callback(null);
	},
	(callback) => {
			quarterModel.update({
								isArchived: false,
								year:{$lte: CONST.currentYear} ,
								index:{$lt: CONST.currentQuarter}
							}, {'$set': {isArchived:true}}, options, (err) => {
				if (err)
					return callback(err);
				// console.log('updated quarter')
				return callback(null)
			})
	}
	], (err) => {
		if(err)
			console.log(err);
		//mongoose.connection.close();
	})
}
