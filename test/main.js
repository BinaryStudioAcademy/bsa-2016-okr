const async = require('async');
const chai = require('chai');
const expect = chai.expect;
const request = require('request');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const CONST = require('../backend/config/constants');
const ValidateService = require('../backend/utils/ValidateService');
const isEmpty = ValidateService.isEmpty;

const UserInfo = require('../backend/schemas/userInfo');
const User = require('../backend/schemas/user');

const rootUrl = 'http://localhost:4444/';

var users = [];
var userInfos = [];

describe('Server start test', () => {

	before((done) => {
		require('../backend/db/dbConnect');
		mongoose.set('debug', false);

		mongoose.connection.on('connected', () => {
			async.waterfall([
				(callback) => { createDefaultUser(callback); },
				(callback) => { createMentor(callback); },
				(callback) => { createMentee(callback); },
				(callback) => { createAdmin(callback); },
			], (err, result) => {
				done(err);
			});
		});
	});

	it('Server started', (done) => {
		var options = {
			url: rootUrl,
			method: 'GET'
		}

		request(options, (err, res, body) => {
			expect(res.statusCode).to.equal(200);
			done();
		});
	});

	describe('Server API test', () => {

		describe('Objective API', () => {

			const suffix = 'api/objective/';
			const unitUrl = rootUrl + suffix;

			var objectiveTests = {};

			var srcPath = path.join(__dirname, 'api/objective');
			var dirs = getDirectories(srcPath);

			dirs.forEach((dir) => {
				objectiveTests[dir] = require(path.join(srcPath, dir, 'test'))(unitUrl);
			});

			// GET /api/objective/
			describe('Get all objectives', objectiveTests.getAll);
			
			// POST /api/objective/
			// describe('Create objective template', objectiveTests.createTemplate);

			// GET /api/objective/title/:title*?
			// describe('Get objectives by title (autocomplete)', objectiveTests.autocomplete);

			// POST /api/objective/me
			// describe('User creating an objective', objectiveTests.createObjectiveByUser);

		});
		// END Objective API ===============================
	});

	after(() => {
		async.waterfall([
			(callback) => {
				async.forEach(users, (id, callback) => {
			    User.remove({ _id: id }, (err) => {
			    	return callback(err);
			    });
				}, (err) => {
			    return callback(err);
			  });
			}, (callback) => {
				async.forEach(userInfos, (id, callback) => {
			    UserInfo.remove({ _id: id }, (err) => {
			    	return callback(err);
			    });
				}, (err) => {
			    return callback(err);
			  });
			},
		], (err, result) => {
			mongoose.connection.close();
		});
	});
	
});

function getDirectories(srcPath) {
  return fs.readdirSync(srcPath).filter(function(file) {
    return fs.statSync(path.join(srcPath, file)).isDirectory();
  });
}

function createUser(userInfo, user, callback) {
	async.waterfall([
		(callback) => {
			var userInfoData = {
				firstName: userInfo.firstName,
				lastName: userInfo.lastName,
				globalRole: userInfo.globalRole,
				email: userInfo.email,
			};
			
			userInfo = new UserInfo(userInfoData);

			userInfo.save((err, result) => {
				if(err) {
					return callback(err);
				}

				userInfos.push(userInfo._id);

				return callback(null, userInfo)
			});
		}, (userInfo, callback) => {
			var userData = {
				localRole: user.localRole,
				mentor: user.mentor,
				userInfo: userInfo._id,
			};

			user = new User(userData);
			user.save((err, result) => {
				if(err) {
					return callback(err);
				}

				users.push(user._id);

				return callback(null);
			});
		}
	], (err, result) => {
		callback(err);
	});
}

function createDefaultUser(callback) {
	var userInfoData = {
		firstName: "User",
		lastName: "Testerovich",
		globalRole: "QA",
		email: "user.testerovich@okr.bsa",
	};

	var userData = {
		localRole: CONST.user.role.USER,
		mentor: null,
	};

	createUser(userInfoData, userData, callback);
}

function createMentor(callback) {
	var userInfoData = {
		firstName: "Mentor",
		lastName: "Testerovich",
		globalRole: "Team Lead",
		email: "mentor.testerovich@okr.bsa",
	};

	var userData = {
		localRole: CONST.user.role.MENTOR,
		mentor: null,
	};

	createUser(userInfoData, userData, callback);
}

function createMentee(callback) {
	async.waterfall([
		(callback) => {
			User.findOne({ localRole: CONST.user.role.MENTOR }, (err, mentor) => {
				if(err) {
					return callback(err);
				}

				if(isEmpty(mentor)) {
					err = new Error('Mentor not found');
					return callback(err);
				}

				return callback(null, mentor);
			})
		}, (mentor, callback) => {
			var userInfoData = {
				firstName: "Mentee",
				lastName: "Testerovich",
				globalRole: "Developer",
				email: "mentee.testerovich@okr.bsa",
			};

			var userData = {
				localRole: CONST.user.role.USER,
				mentor: mentor._id,
			};

			return createUser(userInfoData, userData, callback);
		}
	], (err, result) => {
		return callback(err);
	});
}

function createAdmin(callback) {
	var userInfoData = {
		firstName: "Admin",
		lastName: "Testerovich",
		globalRole: "CEO",
		email: "admin.testerovich@okr.bsa",
	};

	var userData = {
		localRole: CONST.user.role.ADMIN,
		mentor: null,
	};

	createUser(userInfoData, userData, callback);
}