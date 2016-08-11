var jsonwebtoken = require('jsonwebtoken');
var Cookies = require('cookies');

module.exports = function(req, res, next){

	console.log('I check token');

	var cookies = new Cookies(req, res);

	var token = cookies.get('x-access-token');

	if (token) {
		console.log('***** TRUE');
		jsonwebtoken.verify(token, 'superpupersecret', function(err, decoded) {
			if (err) {
				res.status(403).send({ success: false, message: "Failed to authenticate user"});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		console.log('***** FALSE');
		var current_url = req.protocol + '://' + req.get('host') + req.url;

		var cookies = new Cookies(req, res);

		cookies.set('referer', current_url);
		console.log('***** REDIRECT:',current_url);
		res.redirect('http://localhost:2020/');
	}
};