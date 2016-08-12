var _ = require('lodash');
var KeyRepository = require('../repositories/key');
var HistoryRepository = require('../repositories/history');
var async = require('async');

var KeysService = function(){

};

KeysService.prototype.generateNotification = function(){

};

KeysService.prototype.update = function(userId, keyId, key, callback){
	async.waterfall([
		(callback) => {
			KeyRepository.update(keyId, key, (err, key) => {
				if(err){
					return  callback(err, null);
				};
				return callback(null, key);
			});
		},
		(key, callback) => {
			HistoryRepository.addKeyEvent(userId, keyId, 'update Key', (err, key) => {
					if(err){
					return  callback(err, null);
				};
				return callback(null, key);
			});
		}
	], (err, result) => {
		return callback(err, result);
	});

};


KeysService.prototype.delete =function(userId, keyId, callback){
	async.waterfall([
		(callback) => {
			KeyRepository.delete(keyId, (err, key) => {
				if(err){
					return callback(err, null);
				};
				return callback(null, key);
			});
		},
		(key, callback) => {
			HistoryRepository.addKeyEvent(userId, keyId, 'delete Key', (err, key) => {
					if(err){
					return callback(err, null);
				};
				return callback(null, key);
			});	
		}
	], (err, result) => {
		return callback(err, result);
	});
};

KeysService.prototype.add = function(userId, key, callback){
	async.waterfall([
		(callback) => {
			KeyRepository.add(key, (err, key) => {
				if(err){
					return  callback(err, null);
				};
			});
			return callback(null, key);
		},
		(key, callback) => {
			HistoryRepository.addKeyEvent(userId, key._id, 'add Key', (err) => {
				if(err){
					return callback(err, null);
				};
				return callback(null, key);
			});
		}
	], (err, result) => {
		return callback(err, result);
	});
};

KeysService.prototype.autocomplete = function(title, callback){
	let keys = [];

	async.waterfall([
		(callback) => {
			KeyRepository.getAllNotDeleted(function(err, keysArr){
				if (err){
					return callback(err, null);
				};	
				return callback(null, keysArr);
			});
		},
		(keysArr, callback) => {
			keysArr.forEach(function(result, index){
				if ((result['title'].toLowerCase().indexOf(title.toLowerCase()) !== -1) &&
					(result['isApproved'] === true))
				{
					keys.push(result);
				};
			});
			return callback (null, keys);
		}
	], (err, callback) => {
			return callback(err, result);
	});
//	KeyRepository.getAllN =>otDeleted(function(err, keysArr){
//			if (err){
//				return callback(err, null);
//			};	
//
//		keysArr.forEach(function(result, index){
//			if ((result['title'].toLowerCase().indexOf(title.toLowerCase()) == 0) &&
//				(result['isApproved'] === true))
//			{
//				keys.push(result);
//			}
//		});
//
//		callback(err, keys);
//	});
}

KeysService.prototype.changeApprove = function(userId, keyId, callback){
	async.waterfall([
		(callback) => {
			KeyRepository.getById(keyId, function(err, key){
				if (err){
					return callback(err, null);
				};	
				return callback(null, userId, key);
			});
		},
		(userId, key, callback) => {
			HistoryRepository.addKeyEvent(userId, keyId, 'change Key approve to ' + !key.isApproved, (err) =>{
				if (err){
					return callback(err, null);
				};	
			});
			return callback(null, key);
		},
		(key, callback) => {
			if(key.isApproved){
				KeyRepository.setIsApprovedToFalse(keyId, function(err, key){
					if (err){
						return callback(err, null);
					};	
					return callback(null, key);
				});
			}
			else{
				KeyRepository.setIsApprovedToTrue(keyId, function(err, key){
					if (err){
						return callback(err, null);
					};
					return callback(null, key);	
				});
			};
		}
	], (err, key) => {
		return callback(err, key);
	});

	/*KeyRepository.getById(id, function(err, key){
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
	});*/
};

module.exports = new KeysService();