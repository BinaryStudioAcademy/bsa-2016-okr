const request = require('request');
const expect = require('chai').expect;
const path = require('path');
const fs = require('fs');
const async = require('async');

const CategoryModel = require('../../../../backend/schemas/category');
const mongoose = require('mongoose');
var randomCategory;

// POST /api/objective/
module.exports = function(unitUrl) {
	return function() {
		before((done) => {
			require('../../../../backend/db/dbConnect');

			CategoryModel.findOne((err, category) => {
				randomCategory = category;
				done();
			});
		});

		const url = unitUrl;
		
		it('Should return status 200 and objective with keys', (done) => {
			var body = JSON.parse(fs.readFileSync(path.join(__dirname, 'valid/full.json'), 'utf-8'));
			body.category = randomCategory._id;

			var options = {
				url: url,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			};
					
			request(options, (err, res, body) => {
				var data = JSON.parse(body);
				expect(res.statusCode).to.equal(200);
				expect(data).to.contain.all.keys(
					'_id', 
					'title', 
					'description',
					'category',
					'creator', 
					'createdAt',
					'updatedAt',
					'isDeleted', 
					'isApproved', 
					'keyResults'
				);

				expect(data.keyResults).to.be.an('array');
				expect(data.keyResults).to.have.length(3);
				data.keyResults.forEach((keyResult) => {
					expect(keyResult).to.contain.all.keys(
			      '_id',
			      'title',
			      'creator',
			      'objectiveId',
			      'createdAt',
						'updatedAt',
			      'isDeleted',
			      'isApproved',
			      'difficulty'
					);	
				});

				done();
			});
		});

		// it('Should return status 200 and objective without keys', (done) => {
		// 	var body = fs.readFileSync(path.join(__dirname, 'valid/noKeys.json'), 'utf-8');
		// 	var options = {
		// 		url: url,
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json'
		// 		},
		// 		body: body
		// 	};

		// 	request(options, (err, res, body) => {
		// 		expect(res.statusCode).to.equal(200);
		// 		done();
		// 	});
		// });

		// it('Should return status 400 for body without objective description', (done) => {
		// 	var body = fs.readFileSync(path.join(__dirname, 'invalid/noDescription.json'), 'utf-8');
		// 	var options = {
		// 		url: url,
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json'
		// 		},
		// 		body: body
		// 	};

		// 	request(options, (err, res, body) => {
		// 		expect(res.statusCode).to.equal(400);
		// 		done();
		// 	});
		// });

		// it('Should return status 400 for body with error in keys (no key difficulty)', (done) => {
		// 	var body = fs.readFileSync(path.join(__dirname, 'invalid/noKeyDifficulty.json'), 'utf-8');
		// 	var options = {
		// 		url: url,
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json'
		// 		},
		// 		body: body
		// 	};

		// 	request(options, (err, res, body) => {
		// 		expect(res.statusCode).to.equal(400);
		// 		done();
		// 	});
		// });

		// it('Should return status 400 for body with error in keys (no key title)', (done) => {
		// 	var body = fs.readFileSync(path.join(__dirname, 'invalid/noKeyTitle.json'), 'utf-8');
		// 	var options = {
		// 		url: url,
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json'
		// 		},
		// 		body: body
		// 	};

		// 	request(options, (err, res, body) => {
		// 		expect(res.statusCode).to.equal(400);
		// 		done();
		// 	});
		// });

		// it('Should return status 400 for body with no title', (done) => {
		// 	var body = fs.readFileSync(path.join(__dirname, 'invalid/noTitle.json'), 'utf-8');
		// 	var options = {
		// 		url: url,
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json'
		// 		},
		// 		body: body
		// 	};

		// 	request(options, (err, res, body) => {
		// 		expect(res.statusCode).to.equal(400);
		// 		done();
		// 	});
		// });
		
		// it('Should return status 400 for body with wrong key difficulty', (done) => {
		// 	var body = fs.readFileSync(path.join(__dirname, 'invalid/wrongKeyDifficulty.json'), 'utf-8');
		// 	var options = {
		// 		url: url,
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json'
		// 		},
		// 		body: body
		// 	};

		// 	request(options, (err, res, body) => {
		// 		expect(res.statusCode).to.equal(400);
		// 		done();
		// 	});
		// });

		after(() => {
			mongoose.connection.close();
		});
	};
};