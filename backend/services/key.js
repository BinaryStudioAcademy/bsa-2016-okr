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
			if ((result['title'].toLowerCase().indexOf(title.toLowerCase()) == 0) &&
				(result['isApproved'] === true))
			{
				keys.push(result);
			}
		});

		callback(err, keys);
	});
}

KeysService.prototype.changeApprove = function(id, callback){
	KeyRepository.getById(id, function(err, key){
		if (err){
			return callback(err, null);
		};	

		if(key.isApproved){
			KeyRepository.setIsApprovedToFalse(id, function(err, key){
				if (err){
					return callback(err, null);
				};	
			});
		}
		else{
			KeyRepository.setIsApprovedToTrue(id, function(err, key){
				if (err){
					return callback(err, null);
				};	
			});
		};

		callback(err, key);
	});
};

module.exports = new KeysService();