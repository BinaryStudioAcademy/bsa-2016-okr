var UserRepository = require('../repositories/user.js');
var Objective = require('../schemas/objective');
var User = require('../schemas/user');
var Key = require('../schemas/key');
var ObjectiveRepository = require('../repositories/objective.js');
var KeyRepository = require('../repositories/key.js');
var async = require('async');

var ObjectiveService = function() {};

// 1) Create new objective with empty keys array
// 2) Create all keys with corresponding objectiveId
// 3) Push key ids to objective.keys
// 4) Save objective and keys in DB
// 5) Profit =)
ObjectiveService.prototype.add = function(objective, keys, callback) {
	objective = new Objective(objective);

	keys = keys.map((key) => {
		key.objectiveId = objective._id;
		key = new Key(key);
		objective.keys.push(key._id);

		return key;
	});

	async.waterfall([
		(callback) => {
			objective.save((err, obj) => {
				return err ? callback(err) : callback(null, obj);
			});
		}, (obj, callback) => {
			obj = obj.toObject();
			obj.keys = [];
			async.forEach(keys, (key, callback) => {
				key.save((err, key) => {
					if(err) { return callback(err); }
					
					obj.keys.push(key.toObject());
					return callback(null);
				});
			}, (err) => {
				return callback(err, obj);
			});
		}
	], (err, result) => {
		return callback(err, result);	
	});
};

ObjectiveService.prototype.addToUser = function(objective, keys, assignedTo, callback) {

	async.waterfall([
		(callback) => {
			return ObjectiveService.prototype.add(objective, keys, callback);
		}, (objectiveTemplate, callback) => {
			UserRepository.getById(assignedTo, (err, user) => {
				return callback(err, user, objectiveTemplate);
			});
		}, (user, objectiveTemplate, callback) => {
			var objective = {
			  'objectiveId': objectiveTemplate._id,
			  'feedback': '',
			  'isArchived': false,
			  'isDeleted': false,
			  'keys': []
			}

			objectiveTemplate.keys.forEach((key) => {
				return objective.keys.push({
					'keyId': key._id,
					'score': 0
				});
			});

			user = user.toObject();
			user.objectives.push(objective);

			UserRepository.update(user._id, user, (err) => {
				return callback(err, user, objective.objectiveId);
			});
		}, (user, objectiveId, callback) => {
			UserRepository.getById(user._id, (err, user) => {
				user = user.toObject();
				var objective = user.objectives.find((objective) => {
					return objective.objectiveId._id.equals(objectiveId);
				});
				
				return callback(err, objective);
			});
		}
	], (err, result) => {
		return callback(err, result);
	});
};

ObjectiveService.prototype.autocomplete = function(title, callback) {
	async.waterfall([
		(callback) => {
			ObjectiveRepository.getAll(function(err, objArr) {
				if (err) {
					return callback(err, null);
				}

				return callback(null, objArr);
			});
		}, 
		(objArr, callback) => {
			let objectives = [];
			
			objArr.forEach((objective) => {
				if (objective.title.toLowerCase().indexOf(title.toLowerCase()) !== -1) {
					objectives.push(objective);
				}
			});

			return callback(null, objectives);
		}
	], (err, result) => {
		return callback(err, result);
	});
};

module.exports = new ObjectiveService();