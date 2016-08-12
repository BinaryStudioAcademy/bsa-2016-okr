var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var UserMentor = require('../schemas/userMentor');
var ObjectId = require('mongoose').Types.ObjectId;

var UserMentorRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = UserMentor;
};

UserMentorRepository.prototype = new Repository();

UserMentorRepository.prototype.getByMentorId = function(mentorId, callback) {
	var model = this.model;
	var query = model.find({'mentorId': new ObjectId(mentorId)});
	query.exec(callback);
};

UserMentorRepository.prototype.getByUserId = function(userId, callback) {
	var model = this.model;
	var query = model.find({'userId': new ObjectId(userId)});
	query.exec(callback);
};

UserMentorRepository.prototype.checkUserMentor = function(userId, mentorId, callback) {
	var model = this.model;
	var query = model.findOne({'userId': new ObjectId(userId),
								'mentorId': new ObjectId(mentorId)});
	query.exec(callback);
};

UserMentorRepository.prototype.setMentorToUser = function(userId, mentorId, callback) {
	var model = this.model;
	var self = this;
	// try find record with  userId and mentorId
	var query = model.findOne({userId: userId, mentorId: mentorId});
	query.exec( function(err, data) {
		// If find something
		if (!!data) {
			// check data equal to our userId And mentorId
			if ((data.userId.equals(userId)) && (data.mentorId.equals(mentorId))) {
				callback();
			} else {
				// I think, here cannot enter, because findOne doesn't return data
				self.add({'userId': new ObjectId(userId),
					'mentorId': new ObjectId(mentorId)},callback);
			}
		} else {
			// If data is null, add new mentor record
			self.add({'userId': new ObjectId(userId),
				'mentorId': new ObjectId(mentorId)},callback);
		}
	});
};

UserMentorRepository.prototype.deleteByUserId = function(userId, callback) {
	var model = this.model;
	var self = this;
	var query = model.findOne({userId: userId});
	query.exec( function(err, data) {
		if (!!data) {
			self.delete({'_id': new ObjectId(data._id)}, callback);
		}
	});
};

UserMentorRepository.prototype.deleteByMentorId = function(mentorId, callback) {
	var model = this.model;
	var self = this;
	var query = model.findOne({mentorId: mentorId});
	query.exec( function(err, data) {
		if (!!data) {
			self.delete({'_id': new ObjectId(data._id)}, callback);
		}
	});
};

module.exports = new UserMentorRepository();