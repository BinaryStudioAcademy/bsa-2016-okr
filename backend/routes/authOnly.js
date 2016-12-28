const async = require('async');
const ValidateService = require('../utils/ValidateService');
const isEmpty = ValidateService.isEmpty;
const CONST = require('../config/constants');
const isDeveloping = CONST.isDeveloping;
const defaultSession = require('../config/session');

var jsonwebtoken = require('jsonwebtoken');
var Cookies = require('cookies');

const UserService = require('../services/user');

module.exports = function(req, res, next) {
	var cookies = new Cookies(req, res);
	var token = cookies.get('x-access-token');

	if(isDeveloping) {
		let _id = defaultSession._id;

		if(!isEmpty(token)) {
			res.clearCookie('x-access-token');
			res.clearCookie('user-id');
		}

		async.waterfall([
			(callback) => {
				UserService.getByIdPopulate(_id, (err, user) => {
					if(err) {
						console.log('user id ' + _id);
					    console.log(err);
						return res.unauthorized('Wrong auth data');
					}

					req.session = {};
					req.session._id = user._id;
					req.session.mentor = user.mentor;
					req.session.userInfo = user.userInfo;
					req.session.localRole = user.localRole;

					if (cookies.get('user-id') !== user._id) {
						cookies.set('user-id', req.session._id, { httpOnly: false });
					}

					return callback(null);
				});
			},
		], (err, result) => {
			return next();
		});
	} else {
		// Production
		console.log('---===¯\\_(ツ)_/¯===---token', token);
		if (!isEmpty(token)) {
			async.waterfall([
				(callback) => {
					jsonwebtoken.verify(token, 'superpupersecret', function(err, decoded) {
						if (err) {
							err.type = CONST.error.TOKEN;
							return callback(err);
						}
						console.log('---===¯\\_(ツ)_/¯===---decoded', decoded);
						req.decoded = decoded;
						return callback(null, decoded);
					});
				}, (decoded, callback) => {
					decoded.globalRole = decoded.globalRole || CONST.user.globalRole.HR;
					console.log('---===¯\\_(ツ)_/¯===---decoded.globalRole', decoded.globalRole);
					UserService.getByGlobalIdPopulate(decoded, (err, user) => {
						if(err) {
							return callback(err, null);
						}
						console.log('---===¯\\_(ツ)_/¯===---decoded', user);
						req.session = {};
						req.session._id = user._id;
						req.session.mentor = user.mentor;
						req.session.userInfo = user.userInfo
						req.session.localRole = user.localRole;

						console.log('---===¯\\_(ツ)_/¯===---BackEnd1');

						if (cookies.get('user-id') !== user._id) {
							cookies.set('user-id', req.session._id, { httpOnly: false });
							console.log('---===¯\\_(ツ)_/¯===---BackEnd1');
						}
						console.log('---===¯\\_(ツ)_/¯===---BackEnd2');
						return callback(null);
					});
				}
			], (err, result) => {
				if(err && err.type === CONST.error.TOKEN) {
					console.log('---===¯\\_(ツ)_/¯===---BackEnd3');
					return res.redirectToAuthServer();
				}
				console.log('---===¯\\_(ツ)_/¯===---BackEnd4');
				return next();
			});
		} else {
			console.log('---===¯\\_(ツ)_/¯===---BackEnd5');
			return res.redirectToAuthServer();
		}
	}
};
