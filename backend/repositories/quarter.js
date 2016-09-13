var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var Quarter = require('../schemas/quarter');
var CONST = require('../config/constants');

var QuarterRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = Quarter;
};

QuarterRepository.prototype = new Repository();

QuarterRepository.prototype.getByIdPopulate = function(id, callback) {
	var model = this.model;

	model
	.findOne({ _id: id })
	.populate('userObjectives')
	.exec(callback);
};

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
		match: { isDeleted: false },
		populate: {
			path: 'templateId keyResults.templateId',
		}
	})
	.exec(callback);
};

QuarterRepository.prototype.changeIsArchivedByObjectiveId = function(userObjectiveId, flag, callback) { // needed for archiving
	var model = this.model;

	model
	.update({'userObjectives': userObjectiveId},{$set: {"isArchived": flag}})
	.exec(callback);
}

QuarterRepository.prototype.getCurrentQuarter = function(callback) {
	var model = this.model;

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

QuarterRepository.prototype.getCurrentYear = function(callback) {
	var model = this.model;

	model
	.find({ 'year': CONST.currentYear })
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
