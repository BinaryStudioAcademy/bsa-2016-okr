var _ = require('lodash');
var UserRepository = require('../repositories/user');
var UserMentorRepository = require('../repositories/userMentor');
var HistoryRepository = require('../repositories/history');
var async = require('async');

var UserService = function(){


};

UserService.prototype.generateNotification = function(){


};

UserService.prototype.add = function(authorId, user, callback){
	async.waterfall([
	(callback) => {
		UserRepository.add(user, function(err, user){
			if(err){
				return callback(err, null);
			};
			return callback(null, user);
		});
	},
	(user, callback) => {
		HistoryRepository.addUserEvent(authorId, user, "add User", (err) => {
			if(err){
				return callback(err, null);
			};
			return callback(null, user);
		})
	}
	], (err, result) => {
		return callback(err, result);
	});	
};

UserService.prototype.update = function(authorId, userId, body, callback){
	async.waterfall([
	(callback) => {
		UserRepository.update(userId, body, function(err, user){
			if(err){
				return callback(err, null);
			};
			return callback(null, user);
		});
	},
	(user, callback) => {
		HistoryRepository.addUserEvent(authorId, userId, "update User", (err) => {
			if (err){
				return callback(err, null);
			};
			return callback(null, user);
		});
	}
	], (err, result) => {
		return callback(err, result);
	})
};

UserService.prototype.getMe = function(id, callback){
	UserRepository.getById(id, function(err, user){
		if(err){
			return callback(err, null);
		};

		return callback(err, user);
	});
};

//not used yet
UserService.prototype.setToDeleted = function(id, callback){
	UserRepository.setToDeleted(id, function(err, user){
		if(err){
			return callback(err, null);
		};

		callback(err, user);
	});
};

//not used yet
UserService.prototype.setToNotDeleted = function(id, callback){
	UserRepository.setToNotDeleted(id, function(err, user){
		if(err){
			return callback(err, null);
		};

		callback(err, user);
	});
}

UserService.prototype.delete = function(authorId, userId, callback){
	async.waterfall([
		(callback) => {
			UserRepository.delete(userId, function(err, user){
				if(err){
					return callback(err, null);
				};
				return callback(null, user);
			});
		},
		(user, callback) => {
			HistoryRepository.addUserEvent(authorId, userId, "delete User", (err) => {
				if(err){
					return callback(err, null);
				};
				return callback(null);
			});
		},
		(callback) => {
			UserMentorRepository.getByUserId(userId, function(err, userMentors){
				if(err){
					return callback(err, null);
				};
				return callback(null, userMentors);
			});
		},
		(userMentors, callback) => {
			userMentors.forEach(function(userMentor, i , arr){
				UserMentorRepository.delete(userMentor._id, function(err){
					if(err){
						return callback(err, null);
					};
				});
			});
			return callback(null);
		},
		(callback) => {
			UserMentorRepository.getByMentorId(userId, function(err, userMentors){
				if(err){
					return callback(err, null);
				};
				return callback(null, userMentors);
			});
		},
		(userMentors, callback) => {
			userMentors.forEach(function(userMentor, i ,arr){
				UserMentorRepository.delete(userMentor._id, function(err){
					if(err){
						return callback(err, null);
					};
				});
			});
			return callback(null);
		}
	], (err, result) => {
		return callback(err, result);
	})
/*
	UserRepository.delete(id, function(err, user){
		if(err){
			return callback(err, null);
		};

		UserMentorRepository.getByUserId(id, function(err, userMentors){
			if(err){
				return callback(err, null);
			};
			userMentors.forEach(function(userMentor, i , arr){
				UserMentorRepository.delete(userMentor._id, function(err){
					if(err){
						return callback(err, null);
					};
				});
			});
		});

		UserMentorRepository.getByMentorId(id, function(err, userMentors){
			if(err){
				return callback(err, null);
			};

			userMentors.forEach(function(userMentor, i ,arr){
				UserMentorRepository.delete(userMentor._id, function(err){
					if(err){
						return callback(err, null);
					};
				});
			});
		});

		callback(err, user);
	});*/
};

module.exports = new UserService();