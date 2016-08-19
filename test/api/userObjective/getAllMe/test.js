var request = require('request');
var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');

// GET /api/objective/
module.exports = function(unitUrl) {
	return function() {
		const url = unitUrl + '/me/';

		it('Should return status 200 and list of objectives or status 204', (done) => {
			var options = {
				url: url,
				method: 'GET'
			};

			request(options, (err, res, body) => {
				if(body) {
					data = JSON.parse(body);
					expect(res.statusCode).to.equal(200);
					expect(data).to.be.an('array');
					done();
				} else {
					expect(res.statusCode).to.equal(204);
					done();
				}
			});
		});
	};
};