var util = require('util');
var mongoose = require('mongoose');
var async = require('async');
mongoose.connect('mongodb://localhost:27017/okr-app');

var seedObjectives = require('./seedObjectives');

var items = seedObjectives();

dropCollections();
items.users.forEach(u => u.save((err, data) => console.log(`data ${util.inspect(data)}`)));
items.objectives.forEach(o => o.save((err, data) => console.log(`data ${util.inspect(data)}`)));

function dropCollections() {
    var collections = Object.keys(mongoose.connection.collections);
    
    async.forEach(collections, function(collectionName, done) {
      var collection = mongoose.connection.collections[collectionName];
      
      collection.drop(function(err) {
        if (err && err.message != 'ns not found') {
        	done(err);
        }
        done(null);
      });
    }, (err, result) => {
    	if(!err) {
	    	console.log('Collections dropped');
    	}
    });
}