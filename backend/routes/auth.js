const async = require('async');
const defaultSession = require('../config/session');
const ValidateService = require('../utils/ValidateService');
const isEmpty = ValidateService.isEmpty;
const CONST = require('../config/constants');

const UserRepository = require('../repositories/user');
const RoleRepository = require('../repositories/role');

module.exports = function(req, res, next) {

	var _id = req.get('_id');

	_id = ValidateService.isCorrectId(_id) ? _id : defaultSession._id;

	async.waterfall([
		(callback) => {
			UserRepository.getByIdPopulate(_id, (err, user) => {
				if(err) {
					return res.badRequest('Wrong user ID');
				}

				req.session = {};
				
				if(!isEmpty(user)) {
					req.session._id = user._id;
					req.session.mentor = user.mentor;
					req.session.userInfo = user.userInfo

					if(user.localRole === CONST.user.localRole.DEFAULT) {
						RoleRepository.findGlobal(user.userInfo.globalRole, (err, role) => {
							if(err) {
								return callback(err, null);
							}

							req.session.localRole = role.localRole;

							return callback(null);
						});
					} else {
						req.session.localRole = user.localRole;
						return callback(null);
					}
				} else {
					return callback(null);
				}
			});
		},
	], (err, result) => {
		return next();
	});
}