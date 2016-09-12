const async = require('async');
const defaultSession = require('../config/session');
const ValidateService = require('../utils/ValidateService');
const isEmpty = ValidateService.isEmpty;
const CONST = require('../config/constants');

const UserService = require('../services/user');

module.exports = function(req, res, next) {

	var _id = req.get('_id');

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