var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var Quarter = require('../schemas/quarter');

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

QuarterRepository.prototype.getByUserIdPopulate = function(id, callback) {
	var model = this.model;

	model
		.find({ userId: id })
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
		.exec(callback);
};
QuarterRepository.prototype.getCurrentQuarter = function(callback) {
	var model = this.model;
	var today = new Date();
	var currentYear = today.getFullYear();

	function getQuarter(){
	    let first = new Date('2016-03-31T10:42:12.643Z'),
	        second = new Date('2016-06-30T10:42:12.643Z'),
	        third = new Date('2016-09-30T10:42:12.643Z');
	    if (today < first)
	        return 1;
	    else if (today >= first && today <= second)
	        return 2;
	    else if(today > second && today <= third)
	        return 3;
	    else if(today > third)
	        return 4;
	}
	var  currentQuarter = getQuarter();

	model
		.find({'index': currentQuarter, 'year': currentYear})
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
		.populate('userId')
		.exec(callback);
};
module.exports = new QuarterRepository();
