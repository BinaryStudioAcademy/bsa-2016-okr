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
						return res.unauthorized('Wrong auth data');
					}

					req.session = {};
					req.session._id = user._id;
					req.session.mentor = user.mentor;
					req.session.userInfo = user.userInfo
					req.session.localRole = user.localRole;

					if (!cookies.get('user-id')) {
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
		if (!isEmpty(token)) {
			async.waterfall([
				(callback) => {
					jsonwebtoken.verify(token, 'superpupersecret', function(err, decoded) {
						if (err) {
							err.type = CONST.error.TOKEN;
							return callback(err);
						}

						req.decoded = decoded;
						return callback(null, decoded);
					});
				}, (decoded, callback) => {
					decoded.globalRole = decoded.globalRole || CONST.user.globalRole.HR;

					UserService.getByGlobalIdPopulate(decoded, (err, user) => {
						if(err) {
							return callback(err, null);
						}

						req.session = {};
						req.session._id = user._id;
						req.session.mentor = user.mentor;
						req.session.userInfo = user.userInfo
						req.session.localRole = user.localRole;

						if (!cookies.get('user-id')) {
							cookies.set('user-id', req.session._id, { httpOnly: false });
						}

						return callback(null);
					});
				}
			], (err, result) => {
				if(err && err.type === CONST.error.TOKEN) {
					return res.redirectToAuthServer();
				}

				return next();
			});
		} else {
			return res.redirectToAuthServer();
		}
	}
};
