const request = require('request');
const chai = require('chai');
const expect = chai.expect;
const path = require('path');
const fs = require('fs');
const CONST = require('../../../../backend/config/constants');

const User = require('../../../../backend/schemas/user');
const UserInfo = require('../../../../backend/schemas/userInfo');

chai.use(require('chai-json-schema'));

// GET /api/objective/
module.exports = function(unitUrl) {
	return function() {
		const url = unitUrl;
		var id;

		before((done) => {
			User.findOne({ localRole: CONST.user.role.USER, mentor: null }, (err, user) => {
				if(err) {
					done(err);
				}

				id = user._id;

				done();
			});
		});

		it('Should return status 200 and list of objectives or status 204', (done) => {
			var options = {
				url: url,
				method: 'GET',
				headers: {
			    '_id': id,
			  }
			};

			var responseSchema = JSON.parse(fs.readFileSync(path.join(__dirname, './responseSchema.json'), 'utf-8'));

			request(options, (err, res, body) => {
				if(body) {
					data = JSON.parse(body);
					expect(res.statusCode).to.equal(200);
					expect(data).to.be.an('array');
					data.forEach((objective) => {
						expect(objective).to.be.jsonSchema(responseSchema);
					});
					done();
				} else {
					expect(res.statusCode).to.equal(204);
					done();
				}
			});
		});
	};
};