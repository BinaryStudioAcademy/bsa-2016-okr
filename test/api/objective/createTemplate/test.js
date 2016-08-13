var request = require('request');
var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');

// POST /api/objective/
module.exports = function(unitUrl) {
	return function() {
		const url = unitUrl;
		
		it('Should return status 200 and objective with keys', (done) => {
			var body = fs.readFileSync(path.join(__dirname, 'valid/full.json'), 'utf-8');
			var options = {
				url: url,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: body
			};

			request(options, (err, res, body) => {
				var data = JSON.parse(body);
				expect(res.statusCode).to.equal(200);
				expect(data).to.contain.all.keys(
					'_id', 
					'title', 
					'description', 
					'forks', 
					'isApproved', 
					'isDeleted', 
					'cheers', 
					'views', 
					'keys', 
					'createdAt',
					'createdBy',
					'updatedAt'
				);

				expect(data.keys).to.be.an('array');
				expect(data.keys).to.have.length(3);
				expect(data.keys[0]).to.contain.all.keys(
		      '_id',
		      'objectiveId',
		      'title',
		      'difficulty',
		      'forks',
		      'isApproved',
		      'isDeleted',
					'updatedAt',
		      'createdAt'
				);

				done();
			});
		});			

		it('Should return status 200 and objective without keys', (done) => {
			var body = fs.readFileSync(path.join(__dirname, 'valid/noKeys.json'), 'utf-8');
			var options = {
				url: url,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: body
			};

			request(options, (err, res, body) => {
				expect(res.statusCode).to.equal(200);
				done();
			});
		});

		it('Should return status 400 for body without objective description', (done) => {
			var body = fs.readFileSync(path.join(__dirname, 'invalid/noDescription.json'), 'utf-8');
			var options = {
				url: url,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: body
			};

			request(options, (err, res, body) => {
				expect(res.statusCode).to.equal(400);
				done();
			});
		});

		it('Should return status 400 for body with error in keys (no key difficulty)', (done) => {
			var body = fs.readFileSync(path.join(__dirname, 'invalid/noKeyDifficulty.json'), 'utf-8');
			var options = {
				url: url,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: body
			};

			request(options, (err, res, body) => {
				expect(res.statusCode).to.equal(400);
				done();
			});
		});

		it('Should return status 400 for body with error in keys (no key title)', (done) => {
			var body = fs.readFileSync(path.join(__dirname, 'invalid/noKeyTitle.json'), 'utf-8');
			var options = {
				url: url,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: body
			};

			request(options, (err, res, body) => {
				expect(res.statusCode).to.equal(400);
				done();
			});
		});

		it('Should return status 400 for body with no title', (done) => {
			var body = fs.readFileSync(path.join(__dirname, 'invalid/noTitle.json'), 'utf-8');
			var options = {
				url: url,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: body
			};

			request(options, (err, res, body) => {
				expect(res.statusCode).to.equal(400);
				done();
			});
		});
		
		it('Should return status 400 for body with wrong key difficulty', (done) => {
			var body = fs.readFileSync(path.join(__dirname, 'invalid/wrongKeyDifficulty.json'), 'utf-8');
			var options = {
				url: url,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
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