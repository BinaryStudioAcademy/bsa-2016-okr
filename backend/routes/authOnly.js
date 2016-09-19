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
							console.log("Wrong x-access-token error");
							res.clearCookie('x-access-token');
							res.clearCookie('user-id');
							return callback(err);
						} else {
							req.decoded = decoded;
							callback(null, decoded);
						}
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
				if(err) {
					return res.redirectToAuthServer();
				}

				console.log('¯\\_(ツ)_/¯: Token Valid...');
				console.log('¯\\_(ツ)_/¯: Сalling next route...');

				return next();
			});
		} else {
			console.log('¯\\_(ツ)_/¯: Not authenticated...');
			console.log('¯\\_(ツ)_/¯: Redirect to auth...');

			return res.redirectToAuthServer();
		}
	}
};


/*

	_id = ValidateService.isCorrectId(_id) ? _id : defaultSession._id;

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
				
				return callback(null);
			});
		},
	], (err, result) => {
		return next();
	});
}
*/