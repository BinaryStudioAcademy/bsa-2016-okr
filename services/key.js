var _ = require('lodash');
var KeyRepository = require('../repositories/key.js');

var KeysService = function(){


};

KeysService.prototype.generateNotification = function(){


};

KeysService.prototype.autocomplete = function(title, callback){
	let keys = [];

	KeyRepository.getAllNotDeleted(function(err, keysArr){
			if (err){
				return callback(err, null);
			};	

		keysArr.forEach(function(result, index){
			if (result['title'].toLowerCase().indexOf(title.toLowerCase()) == 0){
				keys.push(result);
			}
		});

		callback(err, keys);
	});
}

module.exports = new KeysService();