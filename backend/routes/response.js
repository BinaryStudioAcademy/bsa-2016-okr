var ValidateService = require('../utils/ValidateService');
var Cookies = require('cookies');

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
	}

	res.redirectToAuthServer = () => {
		//var current_url = req.protocol + '://' + 'team.binary-studio.com'; 
		var current_url = req.protocol + '://' + req.get('host') + req.url;

		var cookies = new Cookies(req, res);
		cookies.set('referer', current_url);

		// return res.redirect('http://team.binary-studio.com/auth');
		return res.redirect('http://localhost:2020/');
	}

	next();
};