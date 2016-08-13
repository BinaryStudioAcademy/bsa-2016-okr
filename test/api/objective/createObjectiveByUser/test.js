var request = require('request');
var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');

// POST api/objective/me
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
		      '_id': '57a9ad22374676a81926ccfd'
		    },
				body: body
			};

			request(options, (err, res, body) => {
				var data = JSON.parse(body);
				expect(res.statusCode).to.equal(200);
				expect(data).to.contain.all.keys(
					'objectiveId',
				  'isArchived',
				  'feedback',
				  'isDeleted',
				  'keys'
				);

				expect(data.objectiveId).to.be.an('object');
				expect(data.objectiveId).to.contain.all.keys(
					'title',
					'description'
				);

				expect(data.keys).to.be.an('array');
				expect(data.keys).to.have.length(3);
				expect(data.keys[0]).to.contain.all.keys(
		      'keyId',
		      'score'
		    );

		    expect(data.keys[0].keyId).to.contain.all.keys(
		      'title',
		      'difficulty'
				)

				done();
			});
		});

		it('Should return status 400 and objective with keys', (done) => {
			var body = fs.readFileSync(path.join(__dirname, 'invalid/wrongAssignedTo.json'), 'utf-8');
			var options = {
				url: url,
				method: 'POST',
				headers: {
		      'Content-Type': 'application/json',
		    },
				body: body
			};

			request(options, (err, res, body) => {
				expect(res.statusCode).to.equal(400);
				done();
			});
		});
	};
};