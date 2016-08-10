var ObjectiveRepository = require('../repositories/objective.js'),
  UserRepository = require('../repositories/user.js'),
  HistoryRepository = require('../repositories/history'),
  KeyRepository = require('../repositories/key'),
  ObjectId = require('mongoose').Types.ObjectId;

var CloneObjective = function() {};

CloneObjective.prototype.clone = function(id, obj, callback){
  ObjectiveRepository.getById(id, function(err, query){
    console.log(query);
    var objId = new ObjectId(id);
    KeyRepository.getByObjId(objId, function(errr, keys){
      var body = {
        objectives: [{
          description: "hardcoded description",
          objectiveId: objId,
          keys : keys
        }]
      }
      var userId = '57a9005eaa76244c0cc61ab3';
      UserRepository.update(userId, body, callback);
      console.log("DONE");
      console.log(keys);
    });
  });
};

module.exports = new CloneObjective();
