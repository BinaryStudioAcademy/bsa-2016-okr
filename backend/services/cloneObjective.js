var ObjectiveRepository = require('../repositories/objective.js'),
  UserRepository = require('../repositories/user.js'),
  HistoryRepository = require('../repositories/history'),
  KeyRepository = require('../repositories/key'),
  ObjectId = require('mongoose').Types.ObjectId;
  async = require('async');

var CloneObjective = function() {};

CloneObjective.prototype.clone = function(data, callback) {
	async.waterfall([
		(callback) => {
			ObjectiveRepository.getById(data.objectiveId, function(err, objective) {
				if (err) {
					return callback(err, null);
				}
				return callback(null, data, objective);
			});
		},
		(data, objective, callback) => {
      if (objective == null){
        return callback(true);
      }
      //^ to hadle nulls, this becomes null if objective for given id wasn't found
      var objId = objective._id;
      KeyRepository.getByObjId(objId, function(err, keys) {
				if (err) {
					return callback(err, null);
				}
        data.objectiveId = objId;
				return callback(null, data, keys);
			});
		},
    (data, keys, callback) => {
      var keysResult = [];
      keys.forEach(function(result, index){
        //result is immutalbe data, can't add props on the fly
        var tmpResult = result.toObject();
        tmpResult.score = 0;
        keysResult.push(tmpResult);
      });
      return callback(null, data, keysResult);
  	},
    (data, keysResult, callback) => {
      var body = { $push: {
        objectives: [{
          keys : keysResult,
          objectiveId: data.objectiveId
        }]
        }
      }
      var userId = data.userId;
      UserRepository.update(userId, body, callback);
  	},
    (body, callback) => {
      var body = {
        authorId: ObjectId(data.userId),
        keyId: ObjectId(data.objectiveId),
        type: "cloned objective"
      }
      HistoryRepository.add(body, callback);
    },
	], (err, result) => {
		return callback(err, result);
	});
}

module.exports = new CloneObjective();
