var seedCollections = require('./seedCollections');
var util = require('util');
var mongoose = require('mongoose');
var async = require('async');
var dbConfig = require('../config/db');

mongoose.connect(dbConfig.uri, dbConfig.opts);

mongoose.connection.once('open', () => {
	seed();
});

function seed() {
	async.forEach(mongoose.connection.collections, function (collection, done) {
		collection.drop(function (err) {
			if (err && err.message != 'ns not found') {
				done(err);
			}

			done();
		});
	}, (err, result) => {
		if (!err) {
			console.log('All collections dropped');
			mongoose.connection.close();
		} else {
			console.log(err);
		}
	});
}