var _ = require('lodash');
var UserRepository = require('../repositories/user');
var UserMentorRepository = require('../repositories/userMentor')

var UserService = function(){


};

UserService.prototype.generateNotification = function(){


};

UserService.prototype.add = function(user, callback){
	UserRepository.add(user, function(err, user){
		if(err){
			return callback(err, null);
		};

		callback(err, user);
	});
};

UserService.prototype.update = function(id, body, callback){
	UserRepository.update(id, body, function(err, user){
		if(err){
			return callback(err, null);
		};

		callback(err, user);
	});
};

UserService.prototype.getMe = function(id, callback){
	UserRepository.getById(id, function(err, user){
		if(err){
			return callback(err, null);
		};

		callback(err, user);
	});
};

UserService.prototype.setToDeleted = function(id, callback){
	UserRepository.setToDeleted(id, function(err, user){
		if(err){
			return callback(err, null);
		};

		callback(err, user);
	});
};

UserService.prototype.setToNotDeleted = function(id, callback){
	UserRepository.setToNotDeleted(id, function(err, user){
		if(err){
			return callback(err, null);
		};

		callback(err, user);
	});
}

UserService.prototype.delete = function(id, callback){
	UserRepository.delete(id, function(err, user){
		if(err){
			return callback(err, null);
		};

		UserMentorRepository.getByUserId(id, function(err, userMentor){
			if(err){
				return callback(err, null);
			};

			UserMentorRepository.delete(userMentor._id, function(err){
				if(err){
					return callback(err, null);
				};
			});
		});

		UserMentorRepository.getByMentorId(id, function(err, userMentor){
			if(err){
				return callback(err, null);
			};

			UserMentorRepository.delete(userMentor._id, function(err){
				if(err){
					return callback(err, null);
				};
			});
		});

		callback(err, user);
	});
};

module.exports = new UserService();