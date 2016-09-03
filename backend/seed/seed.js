var seedCollections = require('./seedCollections');
var util = require('util');
var mongoose = require('mongoose');
var async = require('async');
var dbConfig = require('../config/db');

mongoose.connect(dbConfig.uri, dbConfig.opts);

mongoose.connection.once('open', () => {
	var items = seedCollections();
	seed(items);
});

function seed(items) {
	async.forEach(mongoose.connection.collections, function (collection, done) {
		collection.drop(function (err) {
			if (err && err.message != 'ns not found') {
				done(err);
			}

			console.log('Collection ' + collection.name + ' dropped successfully');

			var seedItems = items[collection.name];
			if (seedItems) {
				collection.insertMany(seedItems, (err) => {
					if (err) {
						console.log(`Error inserting into ${collection.name}`);
						console.log(err);
						done(err);
					} else {
						console.log(`${seedItems.length} item inserted into ${collection.name}`);
						done();
					}
				});
			} else {
				done();
			}
		});
	}, (err, result) => {
		if (!err) {
			console.log('All collections dropped and seeded');
			mongoose.connection.close();
		} else {
			console.log(err);
		}
	});
}