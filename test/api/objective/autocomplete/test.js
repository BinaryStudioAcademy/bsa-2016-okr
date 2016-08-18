const request = require('request');
const expect = require('chai').expect;
const path = require('path');
const fs = require('fs');

const CategoryModel = require('../../../../backend/schemas/category');
var url;

// POST /api/objective/
module.exports = function(unitUrl) {
	return function() {

		before((done) => {
			CategoryModel.findOne((err, category) => {
				url = unitUrl + 'category/' + category._id + '/';
				done();
			});
		});
		
		it('Should get top-10 objectives', (done) => {

			var options = {
				url: url,
				method: 'GET'
			};

			request(options, (err, res, body) => {
				if(!body) {
					expect(res.statusCode).to.equal(204);
				} else {
					var data = JSON.parse(body);
					expect(res.statusCode).to.equal(200);
					expect(data).to.be.an('array');
					expect(data).to.have.length.of.at.most(10);
				}

				done();
			});
		});	

		it('Should get top-10 objectives contains `:testTitle` in title', (done) => {
			var testTitle = 'age';
			var options = {
				url: url + testTitle,
				method: 'GET'
			};

			request(options, (err, res, body) => {
				if(!body) {
					expect(res.statusCode).to.equal(204);
				} else {
					var data = JSON.parse(body);
					expect(res.statusCode).to.equal(200);
					expect(data).to.be.an('array');
					expect(data).to.have.length.of.at.most(10);
					data.forEach((objective) => {
						expect(objective.title).to.match(new RegExp(testTitle, 'i'));
					});
				}

				done();
			});
		});		
	};
};