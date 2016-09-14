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

UserObjectiveRepository.prototype.getByIdPopulate = function(id, callback) {
	var model = this.model;

	model
		.findOne({ _id: id })
		.populate('templateId keyResults.templateId')
		.exec(callback);
};

UserObjectiveRepository.prototype.getByUserIdPopulate = function(userId, callback) {
	var model = this.model;

	model
		.find({ userId: userId })
		.populate({
			path: "templateId",
			populate: {
				path: 'category'
			}
		})
		.populate('keyResults.templateId')
		.populate({
			path: "keyResults.deletedBy",
			populate: {
				path: 'userInfo'
			}
		})
		.exec(callback);
};

UserObjectiveRepository.prototype.findByIdAndUpdateArchive = function (id, flag, callback) {
	var model = this.model;

	model.findByIdAndUpdate(id, {'$set': {"isArchived":flag}}).exec(callback);
}

UserObjectiveRepository.prototype.getTemplateFieldByObjectiveIds = function(objectiveIds, callback) {
	var model = this.model;

	var options = {
		_id: { $in: objectiveIds }, 
		isDeleted: false ,
	};

	var fields = { 
		templateId: true, 
		_id: false 
	};

	model
		.find(options, fields)
		.populate({
			path: 'templateId',
		})
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
			path: "deletedBy",
			populate: {
				path: 'userInfo'
			}
		})
		.exec(callback);
}

module.exports = new UserObjectiveRepository();