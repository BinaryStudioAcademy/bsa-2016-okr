const CONST = require('../config/constants');

module.exports = function(req, res, next) {
	return (req.session.localRole === CONST.user.role.ADMIN) ? next() : res.forbidden();
}