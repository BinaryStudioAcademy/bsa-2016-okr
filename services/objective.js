var UserRepository = require('../repositories/user.js'),
    ObjectiveRepository = require('../repositories/objective.js'),
    KeysRepository = require('../repositories/key.js'),
    async = require(async);

var ObjectiveService = function(){

};

/**
 *
 * @param data - contain three object: 1) objective 2) keys array 3) userId
 * @param callback
 */

ObjectiveService.prototype.addObjectiveToUser = function(data, callback) {
    async.waterfall([
        myFirstFunction,
        mySecondFunction,
        myLastFunction,
    ], function (err, result) {
        // result now equals 'done'
    });

    function myFirstFunction(callback) {
        if (!data.objective.objectiveId){
            ObjectiveRepository.add(data.objective, function(err, data){
                if (err){
                    return callback(err, null);
                };

                for (var i= 0, length=data.keys.length; i<length;i++ ) {
                    KeysRepository.add(data.keys[i], function (err, data) {
                        if (err) {
                            return callback(err, null);
                        };

                    });
                }
            });
        } else {
            ObjectiveRepository.getById(data.objective.objectiveId, function(err, data){
                if (err){
                    return callback(err, null);
                };

                data.forks.push(data.userId);

                ObjectiveRepository.update(data.objective.objectiveId,data,function(err, data){
                    if (err){
                        return callback(err, null);
                    };
                });
            });
        }

        callback(null, data);
    }
    function mySecondFunction(arg1, arg2, callback) {
        // arg1 now equals 'one' and arg2 now equals 'two'
        callback(null, 'three');
    }
    function myLastFunction(arg1, callback) {
        // arg1 now equals 'three'
        callback(null, 'done');
    }


};




module.exports = new ObjectiveService();