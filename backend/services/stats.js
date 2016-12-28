const async = require('async');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const UserObjective = require('../schemas/userObjective');
const User = require('../schemas/user');
const CONST = require('../config/constants');
const QuarterRepository = require('../repositories/quarter.js');
const UserRepository = require ('../repositories/user.js')

const validateService = require('../utils/ValidateService')

const isEmpty = validateService.isEmpty;

var StatsService = function() {};

StatsService.prototype.getAllUsersStatsWithQuarters = function (sort, limit, currentUserId, year, callback) {
	var statsObj = {};
	var selectedUser = null;

	async.waterfall([
		(callback) => {
			QuarterRepository.getYear(year, (err, quarterList) => {
				if(err) {
					return callback(err, null)
				}

				return callback(null, new Object(quarterList));
			});
		}, (quarterList, callback) => {
			quarterList.forEach((quarter) => {
				let userId = quarter.userId._id;
			 	statsObj[userId] = statsObj[userId] || {};// creating object with quarters for each user
			 	statsObj[userId][quarter.index] = quarter;
			});

			return callback(null);
		}, (callback) => {
			
			for(user in statsObj) { //for each user
				let yearScore = 0; // score for year
				let quartersCount = 0; // count of quarters in year
				
				let anyQuarter = Object.keys(statsObj[user])[0];

				if(isEmpty(anyQuarter)) {
					break;
				}

				let userInfo = statsObj[user][anyQuarter].userId.userInfo;
				
				for (quarter in statsObj[user]) { // for each user's quarter
					let quarterScore = 0; //score for quarter
					let userObjectivesCount = 0; // count of objectives in quarter

					statsObj[user][quarter]['userObjectives'].forEach( (objective) => {
						if(!objective.isDeleted){
							let objectiveScore = 0; // score of obj
							let keyResCount = 0;// count of keyRes in obj
							objective.keyResults.forEach( (keyResult) => {
								if (!keyResult.isDeleted) {
									 objectiveScore += keyResult.score;
									 keyResCount++;
								 }
							});
							if(keyResCount != 0)
								quarterScore += objectiveScore / keyResCount; // sum up keyRes scores
							userObjectivesCount ++;
						}
					});

					if(userObjectivesCount != 0) { // if there was no objectives
						quarterScore = quarterScore / userObjectivesCount;

						statsObj[user][quarter] = quarterScore;//set quarter score

						quartersCount ++;
						yearScore += quarterScore;// sum up quarter's scores}
					}	else {
						statsObj[user][quarter] = 0;
					}
				}
				
				if(statsObj[user].userInfo == undefined){
					statsObj[user].userInfo = userInfo;	
				}

				if(quartersCount != 0) {
					yearScore = yearScore / quartersCount;
					statsObj[user].totalScore = yearScore;// set year's score}
				} else {
					statsObj[user].totalScore = 0;
				}

				console.log("USER !!!!!!!", user);
				console.log("CURRENT USER ID !!!", currentUserId);

				if(user == currentUserId) {
					selectedUser = Object.assign({}, statsObj[user]);
				}
			}

			return callback(null);
		},
		(callback) => { // transforming obj into arr
			let statsArr = [];
			
			for(user in statsObj) {
				statsArr.push(statsObj[user]);
			}

			return callback(null, statsArr);
		}, (statsArr, callback) => { // sorting
			statsArr.sort((a,b) => {
				return b.totalScore - a.totalScore;
			});

			return callback(null, statsArr);
		}, (statsArr, callback) => { // setting the limit

			var statArr = statsArr.slice(0, limit)
			var userStats = null;
			if(selectedUser){
				var inTop = statArr.some((elem) => {
					return selectedUser.userInfo._id === elem.userInfo._id;
				});
	
				if (inTop) {
					userStats = {
						totalScore: selectedUser.totalScore,
						inTop: true,
					};
				}	else {
					userStats = selectedUser;
				}
			}
			else 
				userStats = {
					inTop: false,
					totalScore: 0
				}
			
			var bottomStats = statsArr[statsArr.length - 1];
			var respObj = {
				statArr,
				userStats,
				bottomStats
			};
			
			return callback(null, respObj);
		}
	], (err, result) => {
		return callback(err, result);
	});
}

StatsService.prototype.getAllUsersStats = function(sort, limit, callback) {
	UserObjective.aggregate([
	{
		$match: {
			isDeleted: false
		}
	},
	{
		$lookup: {
			from: "users",
			localField: "userId",
			foreignField: "_id",
			as: "user",
		}
	},
	{
		$unwind: "$user",
	},
	{
		$lookup: {
			from: "userinfos",
			localField: "user.userInfo",
			foreignField: "_id",
			as: "userInfo",
		}
	},
	{
		$unwind: "$userInfo",
	},
	{
		$project: {
			userId: "$userId",
			avgScore: { $avg: "$keyResults.score" },
			userInfo: "$userInfo",
		}
	},
	{
		$group: {
			_id: "$userId",
			userInfo: { $first: "$userInfo" },
			avgByAllObjectives: { $avg: "$avgScore" },
		}
	},
	{
		$sort: {
			avgByAllObjectives: sort
		}
	},
	{
		$limit: limit
	},
	{
		$project: {
			user: "$_id",
			totalScore: "$avgByAllObjectives",
			userInfo: "$userInfo",
		},
	}
	], (err, data) => {
		if(err) {
			return callback(err, null);
		}

		return callback(null, data);
	});
};

StatsService.prototype.getUserStatsById = function(userId, callback) {
	UserObjective.aggregate([
	{
		$match: {
			isDeleted: false,
			userId: new ObjectId(userId)
		}
	},
	{
		$project: {
			userId: "$userId",
			avgScore: { $avg: "$keyResults.score" },
		}
	},
	{
		$group: {
			_id: "$userId",
			avgByAllObjectives: { $avg: "$avgScore" }
		}
	},
	{
		$project: {
			user: "$_id",
			totalScore: "$avgByAllObjectives",
		}
	}
	], (err, data) => {
		if(err) {
			return callback(err, null);
		}

		var response = isEmpty(data) ? data : data[0];

		return callback(null, response);
	});
};

StatsService.prototype.getProgressStats = function(callback) {
	UserObjective.aggregate([
	{
		$match: {
			isDeleted: false
		}
	},
	{
		$project: {
			userId: "$userId",
			avgScore: { $avg: "$keyResults.score" },
		}
	},
	{
		$group: {
			_id: null,
			progress: { $avg: "$avgScore" }
		}
	}
	], (err, data) => {
		if(err) {
			return callback(err, null);
		}

		var progress = isEmpty(data) ? data : data[0].progress;

		callback(null, { progress: progress });
	});
};

StatsService.prototype.createDbQueryParams = function (params) {
	var query = {};
	var userId = '';
	var year = '';
	var quarter = '';
	var createdAt = {};

	if (validateService.isCorrectId(params.userId)) {
		query['user._id'] = new ObjectId(params.userId);
	}

	if (!isNaN(Date.parse(params.date.to)) && !isNaN(Date.parse(params.date.from))) {
		query['objective.createdAt'] = { $gte: new Date(params.date.from), $lte: new Date(params.date.to) };
	} else if (!isNaN(Date.parse(params.date.to))) {
		query['objective.createdAt'] = { $lte: new Date(params.date.to) };
	} else if (!isNaN(Date.parse(params.date.from))) {
		query['objective.createdAt'] = { $gte: new Date(params.date.from) };
	}

	if (validateService.isValidYear(params.year)) {
		query['quarter.year'] = parseInt(params.year);
	}

	if (validateService.isValidQuarter(parseInt(params.quarter))) {
		query['quarter.index'] = parseInt(params.quarter);
	}

	return query;
};

StatsService.prototype.getCategoriesStats = function(callback, filters = {}) {
	var queryMatchParams = validateService.isEmptyObject(filters) ? {} : this.createDbQueryParams(filters);

	UserObjective.aggregate([
		{
			$match: { isDeleted: false }
		},
		{
			$lookup: {
				from: "objectives",
				localField: "templateId",
				foreignField: "_id",
				as: "objective"
			}
		},
		{
			$unwind: "$objective"
		},
		{
			$lookup: {
				from: "categories",
				localField: "objective.category",
				foreignField: "_id",
				as: "category"
			}
		},
		{
			$unwind: "$category"
		},
		{
			$match: { 'category.isDeleted': false }
		},
		{
			$lookup: {
				from: "quarters",
				localField: "quarterId",
				foreignField: "_id",
				as: "quarter"
			}
		},
		{
			$unwind: "$quarter"
		},
		{
			$lookup: {
				from: "users",
				localField: "userId",
				foreignField: "_id",
				as: "user"
			}
		},
		{
			$unwind: "$user"
		},
		{
			$project: {
				user: "$user",
				quarter: "$quarter",
				category: "$category",
				objective: "$objective",
				keyResultsAvg: { $avg: "$keyResults.score" }
			}
		},
		{
			$match: queryMatchParams
		},
		{
			$group: {
				_id: { _id: "$category._id", title: "$category.title" },
				title: { $first: "$category.title" },
				score: { $avg: "$keyResultsAvg" },
			}
		}

	], (err, data) => {
		if (err) {
			return callback(err, null);
		}

		if (isEmpty(data)) {
			return callback(null, this.getCategoriesEmptyScore());
		}

		return callback(null, data);
	});
};

StatsService.prototype.getCategoriesEmptyScore = function () {
	return Object.keys(CONST.objective.categories).map((key) => {
		return { title: CONST.objective.categories[key], score: 0 };
	});
};

StatsService.prototype.getKeyResultsEmptyScore = function () {
	return Object.keys(CONST.keyResult).map((key) => {
		return { title: CONST.keyResult[key], score: 0 };
	});
};

StatsService.prototype.getKeyResultsStats = function(callback, filters = {}) {
	var queryMatchParams = validateService.isEmptyObject(filters) ? {} : this.createDbQueryParams(filters);

	UserObjective.aggregate([
		{
			$match: { isDeleted: false }
		},
		{
			$unwind: "$keyResults"
		},
		{
			$match: { 'keyResults.isDeleted': false }
		},
		{
			$project: {
				score: "$keyResults.score",
				quarterId: "$quarterId",
				userId: "$userId",
				objectiveId: "$templateId",
				keyresultTemplateId: "$keyResults.templateId",
			}
		},

		{
			$lookup: {
				from: "objectives",
				localField: "objectiveId",
				foreignField: "_id",
				as: "objective"
			}
		},
		{
			$unwind: "$objective"
		},
		{
			$lookup: {
				from: "quarters",
				localField: "quarterId",
				foreignField: "_id",
				as: "quarter"
			}
		},
		{
			$unwind: "$quarter"
		},
		{
			$lookup: {
				from: "users",
				localField: "userId",
				foreignField: "_id",
				as: "user"
			}
		},
		{
			$unwind: "$user"
		},

		{
			$lookup: {
				from: "keyresults",
				localField: "keyresultTemplateId",
				foreignField: "_id",
				as: "keyresultInfo"
			}
		},
		{
			$unwind: "$keyresultInfo"
		},
		{
			$match: queryMatchParams
		},
		{
			$group: {
				_id: "$keyresultInfo.difficulty",
				avgScore: { $avg: "$score" },
			}
		},
		{
			$project: {
				title: "$_id",
				score: "$avgScore"
			}
		}
	], (err, data) => {
		if (err) {
			return callback(err, null);
		}

		if (isEmpty(data)) {
			return callback(null, this.getKeyResultsEmptyScore());
		}

		return callback(null, data);
	});
};

module.exports = new StatsService();