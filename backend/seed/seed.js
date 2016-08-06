var seedObjectives = require('./seedObjectives');
var util = require('util');
var mongoose = require('mongoose');
var async = require('async');

mongoose.connect('mongodb://localhost:27017/okr-app');

mongoose.connection.once('open', () => {
	var items = seedObjectives();
	seedCollections(items);
});

function seedCollections(items) {
	var collections = Object.keys(mongoose.connection.collections);

	async.forEach(collections, function(collection, done) {
		var collection = mongoose.connection.collections[collection];
		collection.drop(function(err) {
			if (err && err.message != 'ns not found') {
				done(err);
			}

			console.log('Collection ' + collection.name + ' dropped successfully');

			if(items[collection.name]) {
				async.forEach(items[collection.name], ((item, done) => item.save((err, data) => {
					console.log(`data ${util.inspect(data)}`);
					return done(err);
				})), (err, res) => {
					done(err);
				});
			}
		});
	}, (err, result) => {
		if(!err) {
			console.log('All collections dropped and seeded');
			mongoose.connection.close();
		}
	});
}