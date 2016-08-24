var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var UserObjective = require('../schemas/userObjective');

var UserObjectiveRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = UserObjective;
};

UserObjectiveRepository.prototype = new Repository();

UserObjectiveRepository.prototype.getByUserId = function(userId, callback) {
	var model = this.model;

	model
		.find({ userId: userId })
		.exec(callback);
};

UserObjectiveRepository.prototype.getByUserIdPopulate = function(userId, callback) {
	var model = this.model;

	model
		.find({ userId: userId })
		.populate('templateId')
		.populate('keyResults.templateId')
		.exec(callback);
};

UserObjectiveRepository.prototype.getDeletedByUserIdPopulate = function(userId, callback) {
	
	var model = this.model;

	model
		.find({ userId: userId, isDeleted: true})
		.populate({
			path: "templateId",
			populate: {
				path: 'category'
			}
		})
		.populate({
			path: "creator",
			populate: {
				path: 'userInfo'
			}
		})
		.exec(callback);
}

module.exports = new UserObjectiveRepository();