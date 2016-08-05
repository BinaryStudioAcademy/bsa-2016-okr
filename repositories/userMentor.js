var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var UserMentor = require('../schemas/userMentor').model;

var UserMentorRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = UserMentor;
};

UserMentorRepository.prototype = new Repository();

UserMentorRepository.prototype.getByMentorId = function(mentorId, callback) {
	var model = this.model;
	var query = findOne({'mentorId': mentorId});
	query.exec(callback);
};

module.exports = new UserMentorRepository();