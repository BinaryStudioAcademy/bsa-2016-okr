const ValidateService = require('../utils/ValidateService');
const HelpService = require('../utils/HelpService');
const stringToBoolean = HelpService.stringToBoolean;
const CONST = require('../config/constants');

const Cookies = require('cookies');

module.exports = function (req, res, next) {
	res.callback = (err, data) => {
		if (err) {
			return res.status(err.status || 500).send({
				message: err.message
			});
		}

		if(ValidateService.isEmpty(data)) {
			return res.status(204).send();
		}

		return res.status(200).send(data);
	};

	res.forbidden = (message) => {
		var err = new Error(message || 'Access denied');
		err.status = 403;

		return res.callback(err);
	};

	res.badRequest = (message) => {
		var err = new Error(message || 'Bad request');
		err.status = 400;

		return res.callback(err);
	};

	res.unauthorized = (message) => {
		var err = new Error(message || 'Unauthorized');
		err.status = 401;

		return res.callback(err);
	};

	res.redirectToAuthServer = () => {
		var cookies = new Cookies(req, res);
		var currentUrl = req.protocol + '://' + req.get('host') + req.url;

		cookies.set('referer', currentUrl);

		res.clearCookie('user-id');
		res.clearCookie('x-access-token');

		if(CONST.LOCAL_PROD) {
			return res.redirect(CONST.links.LOCAL_AUTH);
		} else {
			return res.redirect(CONST.links.PROD_AUTH);
		}
	};

	return next();
};
