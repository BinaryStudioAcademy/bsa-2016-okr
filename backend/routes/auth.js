var defaultSession = require('../config/session');
var ValidateService = require('../utils/ValidateService');

module.exports = function(req, res, next) {

	var _id = req.get('_id');
	var isAdmin = req.get('isAdmin');

	req.session = {};
	req.session._id = ValidateService.isCorrectId(_id) ? _id : defaultSession._id;
	req.session.isAdmin = isAdmin || defaultSession.isAdmin;

	return next();
}