const defaultSession = require('../config/session');
const ValidateService = require('../utils/ValidateService');
const isEmpty = ValidateService.isEmpty;

const UserRepository = require('../repositories/user');

module.exports = function(req, res, next) {

	var _id = req.get('_id');

	_id = ValidateService.isCorrectId(_id) ? _id : defaultSession._id;

	UserRepository.getById(_id, (err, user) => {
		if(err) {
			return res.badRequest('Wrong user ID');
		}

		req.session = {};
		
		if(!isEmpty(user)) {
			req.session._id = user._id;
			req.session.localRole = user.localRole;
			req.session.mentor = user.mentor;
		}

		return next();
	});
}