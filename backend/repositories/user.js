var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var User = require('../schemas/user');

var UserRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = User;
};

UserRepository.prototype = new Repository();

UserRepository.prototype.getAllPopulate = function(callback) {
	var model = this.model;

	model
		.find()
		.populate('userInfo')
		.populate({
			path: 'mentor',
			populate: {
				path: 'userInfo'
			}
		})
		.exec(callback);
};

UserRepository.prototype.getByIdPopulate = function(id, callback) {
	var model = this.model;

	model
		.findOne({ _id: id })
		.populate('userInfo')
		.populate({
			path: 'mentor',
			populate: {
				path: 'userInfo'
			}
		})
		.exec(callback);
};

UserRepository.prototype.getByGlobalIdPopulate = function(id, callback) {
	var model = this.model;

	model
		.findOne({ globalId: id })
		.populate('userInfo')
		.populate({
			path: 'mentor',
			populate: {
				path: 'userInfo'
			}
		})
		.exec(callback);
};

module.exports = new UserRepository();