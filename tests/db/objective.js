var Objective = require('../../schemas/objective');

const dbConnect = require('../../db/dbConnect');

var id = '57a46142892cb2c007b8a4b4';
var wrongId = '1';

Objective.find().limit(20).exec((err, data) => {
		console.log('Some result from db');
		if(err) {
			console.log('Error: ' + err);
			// callback(err);
		} else {
			console.log('Found one. NO errors');
			console.log(data);
			// callback(null, data);
		}
});

Objective.findOne({ '_id': wrongId }, (err, data) => {
		if(err) {
			console.log('Error: ' + err);
			// callback(err);
		} else {
			console.log('Found one. NO errors');
			console.log(data);
			// callback(null, data);
		}
});

// console.log(Objective);