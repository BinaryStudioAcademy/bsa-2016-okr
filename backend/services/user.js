const UserRepository = require('../repositories/user');
const UserInfoRepository = require('../repositories/userInfo');
const RoleRepository = require('../repositories/role');
const QuarterRepository = require('../repositories/quarter');
const HistoryRepository = require('../repositories/history');
const UserObjectiveRepository = require('../repositories/userObjective');
const async = require('async');
const ObjectId = require('mongoose').Types.ObjectId;
const CONST = require('../config/constants');
const ValidateService = require('../utils/ValidateService');
const isEmpty = ValidateService.isEmpty;

var UserService = function() {};

UserService.prototype.createUser = function(data, callback) {

	async.waterfall([
		(callback) => {

			var body  = {};
			body.firstName = "FirstN";
			body.lastName = "LastN";
			body.email = data.email;
			body.globalRole = data.globalRole;

			UserInfoRepository.add(body, (err, userInfo) => {
				if (err) {
					return callback(err, null);
				}

				return callback(null, userInfo);
			});
		}, (userInfo, callback) => {
			var body = {
				globalId: data.id,
				localRole: CONST.user.localRole.DEFAULT,
				userInfo: userInfo._id,
			};

			UserRepository.add(body, (err, user) => {
				if (err) {
					return callback(err, null);
				}

				return callback(null, user);
			});
		}, (user, callback) => {
			var body = {
				userId: user._id,
			};

			QuarterRepository.add(body, (err, quarter) => {

				return callback(null, user);
			});
		}
	], (err, result) => {
		return callback(err, result);
	});
}

UserService.prototype.getByIdPopulate = function(userId, callback) {
	async.waterfall([
		(callback) => {
			UserRepository.getByIdPopulate(userId, (err, user) => {
				if(err) {
  				return callback(err, null);
				}

				if(!user) {
					err = new Error('User not found');
					err.status = 400;
					return callback(err);
				}

				return callback(null, user);
			});
		}, (user, callback) => {
			if(user.localRole === CONST.user.localRole.DEFAULT) {
				RoleRepository.findGlobal(user.userInfo.globalRole, (err, role) => {
					if(err) {
						return callback(err, null);
					}

					if(isEmpty(role)) {
						err = new Error('Role not found');
						err.status = 400;
						return callback(err);
					}

					user.localRole = role.localRole;

					return callback(null, user);
				});
			} else {
				return callback(null, user);
			}
		}
	], (err, result) => {
		return callback(err, result);
	});
};

UserService.prototype.getByGlobalIdPopulate = function(data, callback) {
	async.waterfall([
		(callback) => {
			UserRepository.getByGlobalIdPopulate(data.id, (err, user) => {
				if(err) {
	  				return callback(err, null);
				}

				return callback(null, user);
			});
		}, (user, callback) => {
			if (!user) {
				this.createUser(data, callback);
			}	else {
				return callback(null, user);
			}
		}, (user, callback) => {
			if(user.localRole === CONST.user.localRole.DEFAULT) {
				RoleRepository.findGlobal(user.userInfo.globalRole, (err, role) => {
					if(err) {
						return callback(err, null);
					}

					if(isEmpty(role)) {
						err = new Error('Role not found');
						err.status = 400;
						return callback(err);
					}

					user.localRole = role.localRole;

					return callback(null, user);
				});
			} else {
				return callback(null, user);
			}
		}
	], (err, result) => {
		return callback(err, result);
	});
};


UserService.prototype.getByIdWithQuarters = function(id, callback) {
	async.waterfall([
		(callback) => {
			this.getByIdPopulate(id, function(err, user) {
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

				quarters = quarters.map((quarter) => {
					var userObjectivesNew = quarter.userObjectives.map((objective) => {
						//var keyResultsNotDeleted = objective.keyResults.filter((keyResult) => {
						//	return keyResult.isDeleted == false;
						//});

						objective = objective.toObject();
						//objective.keyResults = keyResultsNotDeleted;

						return objective;
					});

					quarter = quarter.toObject();
					quarter.userObjectives = userObjectivesNew;

					return quarter;
				});

				user.quarters = quarters;

				return callback(null, user);
			});
		},
		(user, callback) => {
			UserObjectiveRepository.getByUserIdBacklogPopulate(user._id, (err, objectives) => {
				if (err) {
					return callback(err, null);
				}

				user.backlog = objectives;

				return callback(null, user);
			});
		},
	], (err, result) => {
		return callback(err, result);
	});
};

UserService.prototype.takeApprentice = function(userId, apprenticeId, userLocalRole, callback) {
  async.waterfall([
		(callback) => {
			if(userId == apprenticeId) {
				var err = new Error("You can't mentor yourself");
				err.status = 400;
				return callback(err);
			}
      if(userLocalRole == CONST.user.localRole.ADMIN || userLocalRole == CONST.user.localRole.MENTOR) {
        UserRepository.getById(apprenticeId, (err, myApprentice) => {
  				if(err) {
  					return callback(err, null);
  				}
  				return callback(null, myApprentice);
  			});
      } else {
				var err = new Error('You are not admin/mentor');
				err.status = 400;
				return callback(err);
			}
    }, (myApprentice, callback) => {
      if(myApprentice.mentor == null) {
        var body = {
          mentor: userId
        }
        UserRepository.update(apprenticeId, body, (err, apprentice) => {
  				if(err) {
  					return callback(err, null);
  				}
  				return callback(null, apprentice);
  			});
      } else {
				var err = new Error('This user already has mentor');
				err.status = 400;
				return callback(err);
			}
    }, (apprentice, callback) => {
        HistoryRepository.addApprenticeEvent(userId, apprenticeId, CONST.history.type.TOOK_APPRENTICE, (err, historyEvent) => {
  				if(err) {
  					return callback(err, null);
  				}
  				return callback(null, historyEvent);
  			});
      }
    ], (err, result) => {
  		return callback(err, result);
		});
};

UserService.prototype.removeApprentice = function(userId, apprenticeId, userLocalRole, callback) {
  async.waterfall([
		(callback) => {
			/*
			if(userId != apprenticeId) {
				var err = new Error("You can only remove your apprentices");
				err.status = 400;
				return callback(err);
			}
			*/
      if(userLocalRole == CONST.user.localRole.ADMIN || userLocalRole == CONST.user.localRole.MENTOR) {
        UserRepository.getById(apprenticeId, (err, myApprentice) => {
  				if(err) {
  					return callback(err, null);
  				}
  				return callback(null, myApprentice);
  			});
      } else {
				var err = new Error('You are not admin/mentor');
				err.status = 400;
				return callback(err);
			}
    }, (myApprentice, callback) => {
      if(myApprentice.mentor != null) {
        var body = {
          mentor: null
        }
        UserRepository.update(apprenticeId, body, (err, apprentice) => {
  				if(err) {
  					return callback(err, null);
  				}
  				return callback(null, apprentice);
  			});
      } else {
				var err = new Error("This doesn't mentor");
				err.status = 400;
				return callback(err);
			}
    }, (apprentice, callback) => {
        HistoryRepository.addApprenticeEvent(userId, apprenticeId, CONST.history.type.REMOVED_APPRENTICE, (err, historyEvent) => {
  				if(err) {
  					return callback(err, null);
  				}
  				return callback(null, historyEvent);
  			});
      }
    ], (err, result) => {
    	return callback(err, result);
    });
};

UserService.prototype.autocomplete = function(userName, callback) {

	async.waterfall([

		(callback) => {
			UserRepository.getAllPopulate((err, users) => {
				if (err) {
					return callback(err);
				}
				return callback(null, users);
			});
		},

		(users, callback) => {
			var data = users.filter((user) => {
				var name = new RegExp('^' + userName, 'i');
				return user.userInfo.firstName.match(name) || user.userInfo.lastName.match(name) ;
			});

			return callback(null, data);
		}

	], (err, res) => {
		return callback(err, res);
	});
};

module.exports = new UserService();
