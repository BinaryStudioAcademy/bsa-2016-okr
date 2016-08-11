var request = require('request');
var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');

module.exports = function(unitUrl) {
	return function() {
		const url = unitUrl + '/me';

		it('Should return status 200 and objective with keys', (done) => {
			var body = fs.readFileSync(path.join(__dirname, 'valid/full.json'), 'utf-8');
			
			var options = {
				url: url,
				method: 'POST',
				headers: {
		      'Content-Type': 'application/json',
		    },
				body: body
			};

			request(options, (err, res, body) => {
				expect(res.statusCode).to.equal(200);
				done();
			});
		});
	};
};