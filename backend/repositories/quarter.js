var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var Quarter = require('../schemas/quarter');
var CONST = require('../config/constants');

var QuarterRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = Quarter;
};

QuarterRepository.prototype = new Repository();

QuarterRepository.prototype.getByUserId = function(id, callback) {
	var model = this.model;

	model
	.find({ userId: id })
	.exec(callback);
};

QuarterRepository.prototype.getByUserIdObjectiveIds = function(id, year, quarter, callback) {
	var model = this.model;

	var options = { 
		userId: id,
		year: year,
		index: quarter,
	};

	var fields = {
		_id: false, 
		userObjectives: true
	};

	model
	.findOne(options, fields)
	.exec(callback);
};

QuarterRepository.prototype.getByUserIdPopulate = function(id, callback) {
	var model = this.model;

	model
	.find({ userId: id })
	.populate({
		path: 'userObjectives',
		match: { isDeleted: false},
		populate: {
			path: 'templateId keyResults.templateId',
		}
	})
	.exec(callback);
};

QuarterRepository.prototype.getCurrentQuarter = function(callback) {
	var model = this.model;
	var today = new Date();

	model
	.find({'index': CONST.currentQuarter, 'year': CONST.currentYear})
	.populate({
		path: 'userObjectives',
		match: { isDeleted: false},
		populate: {
			path: 'templateId keyResults.templateId',
			populate: {
				path:	'category'
			}
		}
	})
	.populate({
		path: 'userId',
		populate: {
			path: 'userInfo mentor',
			populate: {
				path: 'userInfo'
			}
		}
	})
	.exec(callback);
};
module.exports = new QuarterRepository();
