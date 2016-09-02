var UserRepository = require('../repositories/user');
var QuarterRepository = require('../repositories/quarter');
var HistoryRepository = require('../repositories/history');
var async = require('async');
var ObjectId = require('mongoose').Types.ObjectId;
const CONST = require('../config/constants');

var UserService = function() {};

UserService.prototype.getById = function(id, callback) {

	async.waterfall([
		(callback) => {
			UserRepository.getByIdPopulate(id, function(err, user) {
				if(err) {
					return callback(err, null);
				};

				if(!user) {
					var err = new Error('User not found');
					err.status = 400;
					return callback(err);
				}

				return callback(err, user);
			});
		},
		(user, callback) => {
			user = user.toObject();
			QuarterRepository.getByUserIdPopulate(id, (err, quarters) => {
				if(err) {
					return callback(err, null);
				}

				user.quarters = quarters;

				return callback(null, user);
			});
		}
	], (err, result) => {
		return callback(err, result);
	});
};

UserService.prototype.takeApprentice = function(mentorId, userId, callback) {
  async.waterfall([
		(callback) => {
      UserRepository.getById(mentorId, (err, me) => {
				if(err) {
					return callback(err, null);
				}
				return callback(null, me);
			})
		}, (me, callback) => {
      if(me.localRole == CONST.user.role.ADMIN || me.localRole == CONST.user.role.MENTOR) {
        UserRepository.getById(userId, (err, myApprentice) => {
  				if(err) {
  					return callback(err, null);
  				}
  				return callback(null, myApprentice);
  			});
      }
    }, (myApprentice, callback) => {
      if(myApprentice.mentor == null) {
        var body = {
          mentor: mentorId
        }
        UserRepository.update(userId, body, (err, finish) => {
  				if(err) {
  					return callback(err, null);
  				}
// TODO add history log events
  				return callback(null, finish);
  			});
      }
    }
    ], (err, result) => {
  return callback(err, result);
});
};

// UserService.prototype.add = function(authorId, user, callback){
//  	console.log('user default '+ user.objectives[0].keys[0].keyId );
//  	var newUser = Object.assign({}, user);
//  	newUser.objectives[0].keys[0].keyId = ObjectId(user.objectives[0].keys[0].keyId);
//  	newUser.objectives[0].category = ObjectId(user.objectives[0].category);
//  	newUser.objectives[0].objectiveId = ObjectId(user.objectives[0].objectiveId);

//  	console.log('============ \n' + newUser);
// 	async.waterfall([
// 	(callback) => {
// 		console.log('user before adding ' + user);
// 		UserRepository.add(user, function(err, user){
// 			if(err){
// 				return callback(err, null);
// 			};
// 			return callback(null, user);
// 		});
// 	},
// 	(user, callback) => {
// 		HistoryRepository.addUserEvent(authorId, user, "add User", (err) => {
// 			if(err){
// 				return callback(err, null);
// 			};
// 			return callback(null, user);
// 		})
// 	}
// 	], (err, result) => {
// 		return callback(err, result);
// 	});
// };

// UserService.prototype.update = function(authorId, userId, body, callback){
// 	async.waterfall([
// 	(callback) => {
// 		UserRepository.update(userId, body, function(err, user){
// 			if(err){
// 				return callback(err, null);
// 			};
// 			return callback(null, user);
// 		});
// 	},
// 	(user, callback) => {
// 		HistoryRepository.addUserEvent(authorId, userId, "update User", (err) => {
// 			if (err){
// 				return callback(err, null);
// 			};
// 			return callback(null, user);
// 		});
// 	}
// 	], (err, result) => {
// 		return callback(err, result);
// 	});
// };

// UserService.prototype.changeArchive = function (authorId, userId, objectiveId, callback) {
// 	 async.waterfall([
// 	 	(callback) => {
// 	 		UserRepository.getByObjId(objectiveId, (err, user) => {
// 	 			if(err){
// 	 				return callback(err, null);
// 	 			};
// 	 			return callback(null, user);
// 	 		})
// 	 	},
// 	 	(user, callback) => {
// 	 		UserRepository.update(user._id, {isArchived: !user.isArchived}, (err) => {
// 	 			if(err){
// 	 				return callback(err, null);
// 	 			};
// 	 			return callback(null, user);
// 	 		})
// 	 	},
// 	 	(user, callback) => {
// 	 		HistoryRepository.addUserEvent(authorId, userId, "archived obj", (err) => {
// 	 			if(err){
// 	 				return callback(err, null);
// 	 			};
// 	 			return callback(null, user);
// 	 		})
// 	 	}
// 	 ], (err, result) => {
// 		return callback(err, result);
// 	});
// }

//not used yet
// UserService.prototype.setToDeleted = function(id, callback){
// 	UserRepository.setToDeleted(id, function(err, user){
// 		if(err){
// 			return callback(err, null);
// 		};

// 		callback(err, user);
// 	});
// };

//not used yet
// UserService.prototype.setToNotDeleted = function(id, callback){
// 	UserRepository.setToNotDeleted(id, function(err, user){
// 		if(err){
// 			return callback(err, null);
// 		};

// 		callback(err, user);
// 	});
// }

// UserService.prototype.delete = function(authorId, userId, callback){
// 	async.waterfall([
// 		(callback) => {
// 			UserRepository.delete(userId, function(err, user){
// 				if(err){
// 					return callback(err, null);
// 				};
// 				return callback(null, user);
// 			});
// 		},
// 		(user, callback) => {
// 			HistoryRepository.addUserEvent(authorId, userId, "delete User", (err) => {
// 				if(err){
// 					return callback(err, null);
// 				};
// 				return callback(null);
// 			});
// 		},
// 		(callback) => {
// 			UserMentorRepository.getByUserId(userId, function(err, userMentors){
// 				if(err){
// 					return callback(err, null);
// 				};
// 				return callback(null, userMentors);
// 			});
// 		},
// 		(userMentors, callback) => {
// 			userMentors.forEach(function(userMentor, i , arr){
// 				UserMentorRepository.delete(userMentor._id, function(err){
// 					if(err){
// 						return callback(err, null);
// 					};
// 				});
// 			});
// 			return callback(null);
// 		},
// 		(callback) => {
// 			UserMentorRepository.getByMentorId(userId, function(err, userMentors){
// 				if(err){
// 					return callback(err, null);
// 				};
// 				return callback(null, userMentors);
// 			});
// 		},
// 		(userMentors, callback) => {
// 			userMentors.forEach(function(userMentor, i ,arr){
// 				UserMentorRepository.delete(userMentor._id, function(err){
// 					if(err){
// 						return callback(err, null);
// 					};
// 				});
// 			});
// 			return callback(null);
// 		}
// 	], (err, result) => {
// 		return callback(err, result);
// 	})
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
// };

module.exports = new UserService();
