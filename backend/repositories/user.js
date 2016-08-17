var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var User = require('../schemas/user');

var UserRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = User;
};

UserRepository.prototype = new Repository();

UserRepository.prototype.getById = function(id, callback) {
	User
		.findOne({ _id: id })
		.populate('objectives.objectiveId')
		.populate('objectives.keys.keyId')
		.exec((err, user) => {
			return callback(err, user);
		});
};

UserRepository.prototype.getByObjId = function (id, callback) {
	User.findOne({'objectives.objectivesId': id}).exec(callback);
};

module.exports = new UserRepository();