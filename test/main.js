const expect = require('chai').expect;
const request = require('request');
const path = require('path');
const fs = require('fs');

const rootUrl = 'http://localhost:4444/';

describe('Server start test', () => {

	it('Server started', (done) => {
		var options = {
			url: rootUrl,
			method: 'GET'
		}

		request(options, (err, res, body) => {
			expect(res.statusCode).to.equal(200);
			done();
		});
	});

	describe('Server API test', () => {

		describe('Objective API', () => {

			const suffix = 'api/objective/';
			const unitUrl = rootUrl + suffix;

			var objectiveTests = {};

			var srcPath = path.join(__dirname, 'api/objective');
			var dirs = getDirectories(srcPath);

			dirs.forEach((dir) => {
				objectiveTests[dir] = require(path.join(srcPath, dir, 'test'))(unitUrl);
			});

			// GET /api/objective/
			describe('Get all objectives', objectiveTests.getAll);
			
			// POST /api/objective/
			describe('Create objective template', objectiveTests.createTemplate);

			// POST /api/objective/me
			describe('User creating an objective', objectiveTests.createObjectiveByUser);

		});
		// END Objective API ===============================
	});
	
});

function getDirectories(srcPath) {
  return fs.readdirSync(srcPath).filter(function(file) {
    return fs.statSync(path.join(srcPath, file)).isDirectory();
  });
}