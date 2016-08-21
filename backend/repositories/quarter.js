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

module.exports = new QuarterRepository();
