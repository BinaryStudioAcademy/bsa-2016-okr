const async = require('async');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const UserObjective = require('../schemas/userObjective');
const User = require('../schemas/user');

const QuarterRepository = require('../repositories/quarter.js');
const UserRepository = require ('../repositories/user.js')

var StatsService = function() {};

StatsService.prototype.getAllUsersStatsWithQuarters = function (sort, limit, currentUserId,year, callback) {
	var statsObj = {};
	var selectedUser = null;

	async.waterfall([
		(callback) => {
			QuarterRepository.getYear(year, (err, result) => {
				if(err)
					return callback(err, null)
				return callback(null, new Object(result));
			})

		},
		(quarterList, callback) => {
			async.each(quarterList,
			 (quarter, callback) => {
			 	statsObj[quarter.userId._id] = statsObj[quarter.userId._id] || {};// creating object with quarters for each user
			 	statsObj[quarter.userId._id][quarter.index] = quarter;
			 	callback();
			}, (err) => {
				if(err)
					return callback(err);
				return callback(null);
			})

		},
		(callback) => {
			for(user in statsObj) { //for each user
				let yearScore = 0; // score for year
				let quartersCount = 0; // count of quarters in year
				let userInfo = statsObj[user]['1'].userId.userInfo || null;
				
				for (quarter in statsObj[user]){ // for each user's quarter
					let quarterScore = 0; //score for quarter
					let userObjectivesCount = 0; // count of objectives in quarter

					statsObj[user][quarter]['userObjectives'].forEach( (objective) => {
						if(!objective.isDeleted){
							let objectiveScore = 0; // score of obj
							let keyResCount = 0;// count of keyRes in obj
							objective.keyResults.forEach( (keyResult) => {
								 objectiveScore += keyResult.score;
								 keyResCount++;
							})
							if(keyResCount != 0)
								quarterScore += objectiveScore / keyResCount; // sum up keyRes scores
							userObjectivesCount ++;
						}
					})

					if(userObjectivesCount != 0){ // if there was no objectives
						quarterScore = quarterScore / userObjectivesCount;

						statsObj[user][quarter] = quarterScore;//set quarter score

						quartersCount ++;
						yearScore += quarterScore;// sum up quarter's scores}
					}
					else 
						statsObj[user][quarter] = 0;
				}
				
				if(quartersCount != 0){
					yearScore = yearScore / quartersCount;
					statsObj[user].totalScore = yearScore;// set year's score}
					if(statsObj[user].userInfo == undefined){

						statsObj[user].userInfo = userInfo;	
					}
				}
				else
					statsObj[user].totalScore = 0;

				if(user == currentUserId){
					console.log('selected');
					selectedUser = Object.assign({}, statsObj[user]);

				}
			}
			return callback(null);
		},
		(callback) => { // transforming obj into arr
			let statsArr = []
			for(user in statsObj) {
				statsArr.push(statsObj[user]);
			} 
			return callback(null, statsArr);
		},
		(statsArr, callback) => { // sorting
			statsArr.sort( (a,b) => {
				return b.totalScore - a.totalScore;
			})
			return callback(null, statsArr);
		},
		(statsArr, callback) => { // setting the limit
			var statArr = statsArr.slice(0, limit)
			var userStats = null;
			if(selectedUser == null || selectedUser.userInfo == undefined  )
			{
				userStats= {
					totalScore: 0,
					inTop: false
				}
			}

			else {
				if (statArr.find( (elem) => {
					if (selectedUser.userInfo._id == elem.userInfo._id)
						return true
					return false
					}) 
					== undefined )
						userStats = selectedUser
				else 
					userStats = {
						totalScore:selectedUser.totalScore,
						inTop: true
					}
			}
			
			var bottomStats = statsArr[statsArr.length - 1];
			var respObj = {
				statArr,
				userStats,
				bottomStats
			}
			return callback(null,  respObj)
		}
	], (err, result) => {
		return callback(err, result);
	})
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

		return callback(null, data[0]);
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

		callback(null, { progress: data[0].progress });
	});
};

StatsService.prototype.getCategoriesStats = function(callback) {
	UserObjective.aggregate([
	{
		$match: {
			isDeleted: false
		}
	},
	{
		$project: {
			userId: "$userId",
			templateId: "$templateId",
			avgScore: { $avg: "$keyResults.score" },
		}
	},
	{
		$lookup: {
			from: "objectives",
			localField: "templateId",
			foreignField: "_id",
			as: "template"
		}
	},
	{
		$unwind: "$template"
	},
	{
		$project: {
			userId: "$userId",
			templateId: "$templateId",
			avgScore: "$avgScore",
			categoryId: "$template.category",
		}
	},
	{
		$lookup: {
			from: "categories",
			localField: "categoryId",
			foreignField: "_id",
			as: "category"
		}
	},
	{
		$unwind: "$category"
	},
	{
		$group: {
			_id: { _id: "$category._id", title: "$category.title" },
			avgScore: { $avg: "$avgScore" },
		}
	},
	{
		$project: {
			_id: "$_id._id",
			title: "$_id.title",
			score: "$avgScore"
		}
	}
	], (err, data) => {
		if(err) {
			return callback(err, null);
		}

		return callback(null, data);
	});
};

StatsService.prototype.getKeyResultsStats = function(callback) {
	UserObjective.aggregate([
	{
		$match: {
			isDeleted: false
		}
	},
	{
		$unwind: "$keyResults"
	},
	{
		$project: {
			score: "$keyResults.score",
			templateId: "$keyResults.templateId"
		}
	},
	{
		$lookup: {
			from: "keyresults",
			localField: "templateId",
			foreignField: "_id",
			as: "template"
		}
	},
	{
		$unwind: "$template"
	},
	{
		$group: {
			_id: "$template.difficulty",
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
		if(err) {
			return callback(err, null);
		}

		return callback(null, data);
	});
};

module.exports = new StatsService();