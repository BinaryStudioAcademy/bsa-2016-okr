var _ = require('lodash');
var KeyRepository = require('../repositories/key.js');

var KeysService = function(){


};

KeysService.prototype.generateNotification = function(){


};

KeysService.prototype.getKeysByObjId(id, callback){
	KeyRepository.getkeyByObjectiveId(id, function(err, keys){
		if (err){
			return callback(err, null);
		};

		callback(err, keys);
	});
};

KeysService.prototype.approveKey(id, callback){
	KeyRepository.setIsApprovedToTrue(id, function(err, keys){
		if (err){
			return callback(err, null);
		};

		callback(err, keys);
	});
};

module.exports = new KeysService();