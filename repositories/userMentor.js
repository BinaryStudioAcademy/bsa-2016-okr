var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var UserMentor = require('../schemas/userMentor').model;

var UserMentorRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = UserMentor;
};

UserMentorRepository.prototype = new Repository();

UserMentorRepository.prototype.getAllMentors = function(queryString, callback) {
	this.getAll(callback);
};

UserMentorRepository.prototype.getMentorById = function(id, queryString, callback) {
	this.getById(id, callback);
};

UserMentorRepository.prototype.getMentorByMentorId = function(mentorId, queryString, callback) {
	this.model.findOne({'mentorId': mentorId}).exec(callback);
};

UserMentorRepository.prototype.createMentor = function(mentor, queryString, callback) {
	this.add(mentor, callback);
};

UserMentorRepository.prototype.deleteMentor = function(id, queryString, callback) {
	this.delete(id, callback);
};

module.exports = new UserMentorRepository();