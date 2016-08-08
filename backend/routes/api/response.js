module.exports = function (req, res, next) {
	res.callback = (err, data) => {
		if (err) {
			return res.status(err.status || 500).send({
				message: err.message 
			});
		}

		return res.status(200).send(data);
	};

	res.forbidden = (message) => {
		var err = new Error(message || 'Access denied');
		err.status = 403;

		return res.callback(err);
	}

	next();
};