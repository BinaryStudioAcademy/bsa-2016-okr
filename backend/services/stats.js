const async = require('async');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const UserObjective = require('../schemas/userObjective');
const User = require('../schemas/user');

var StatsService = function() {};

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