const CONST = require('../config/constants');

module.exports = function(req, res, next) {
	return (req.session.localRole === CONST.user.localRole.ADMIN) ? next() : res.forbidden();
}