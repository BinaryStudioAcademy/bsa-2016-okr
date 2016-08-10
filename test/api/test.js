const expect = require('chai').expect;
const server = require('../../server');
const request = require('request');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose')

mongoose.set('debug', false);

const jsonDataDir = path.resolve(__dirname, '../json');

describe('Server API response', () => {
	
	it('Server started', () => {
		var options = {
			url: 'http://localhost:3000/',
			method: 'GET'
		}

		request(options, (err, res, body) => {
			expect(res.statusCode).to.equal(200);
		});
	});

	describe('Objective API', () => {
		
		describe('Objective creation', () => {
			
			it('Should return 204 for correct body', () => {
				var body = fs.readFileSync(path.join(jsonDataDir, 'objective/create/valid/1.json'), 'utf-8');
				
				var options = {
					url: 'http://localhost:3000/api/objective/',
					method: 'POST',
					body: body
				}

				request.get(options, (err, res, body) => {
					expect(res.statusCode).to.equal(204);
				});
			});

			it('Should return 400 for body without objective description', () => {
				var body = fs.readFileSync(path.join(jsonDataDir, 'objective/create/invalid/noDescription.json'), 'utf-8');
				var options = {
					url: 'http://localhost:3000/api/objective/',
					method: 'POST',
					body: body
				}

				request.get(options, (err, res, body) => {
					expect(res.statusCode).to.equal(400);
				});
			});

		});

	});


	after(function() {
		server.close();
	})
});