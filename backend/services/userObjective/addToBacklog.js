const async = require('async');
const ValidateService = require('../../utils/ValidateService');
const isEmpty = ValidateService.isEmpty;
const isMentorActionAllowed = ValidateService.isMentorActionAllowed;
const CONST = require('../../config/constants');

const ObjectiveRepository = require('../../repositories/objective');
const UserObjectiveRepository = require('../../repositories/userObjective');
const QuarterRepository = require('../../repositories/quarter');
const HistoryRepository = require('../../repositories/history');
const UserRepository = require('../../repositories/user');

module.exports = function(session, userId, categoryId, objectiveId, title, isApproved, callback) {

    async.waterfall([
        // (callback) => {
        //     QuarterRepository.getByUserIdPopulate(userId, (err, quarters) => {
        //         var objective;
        //         quarters.forEach((quarter) => {
        //             objective = quarter.userObjectives.find((objective) => {
        //                 return objective.templateId._id.equals(objectiveId);
        //             });
        //         });
        //
        //         if (objective) {
        //             err = new Error('Objective already exists in your okr list');
        //             return callback(err, null);
        //         }
        //
        //         return callback(null);
        //     });
        // },

        (callback) => {
            UserRepository.getById(userId, (err, user) => {

                if (err) {
                    return callback(err, null);
                }

                if (isEmpty(user)) {
                    err = new Error('User not found');
                    return callback(err, null);
                }

                if (!isMentorActionAllowed(user, session)) {
                    err = new Error('You are not allowed to perform this action');
                    return callback(err, null);
                }

                return callback(null);
            });
        },

        (callback) => {

            if (!isEmpty(objectiveId)) {
                // console.log('ObjectiveId not empty');
                ObjectiveRepository.getById(objectiveId, (err, objective) => {
                    if (err) {
                        return callback(err, null);
                    }

                    if (isEmpty(objective)) {
                        var error = new Error('Such objective does not exists');
                        return callback(error, null);
                    }

                    return callback(null, objective);
                });
            } else {
                return callback(null, {});
            }
        },

        (objective, callback) => {

            if (isEmpty(objective)) {
                ObjectiveRepository.getByTitleAndCategoryId(title, categoryId, (err, objective) => {
                    if(err) {
                        return callback(err, null);
                    }

                    return callback(null, objective);
                });
            } else {
                return callback(null, objective);
            }
        },

        (objective, callback) => {

            if (isEmpty(objective)) {
                var objectiveData = {
                    title: title,
                    description: '',
                    category: categoryId,
                    creator: session._id,
                    used: 1,
                    defaultKeyResults: [],
                    isApproved: isApproved,
                    isDeleted: false,
                };

                ObjectiveRepository.add(objectiveData, (err, objective) => {
                    if (err) {
                        return callback(err, null);
                    }

                    return callback(null, objective);
                });
            } else {
                objective.used += 1;

                objective.save((err, objective) => {
                    if (err) {
                        return callback(err, null);
                    }

                    return callback(null, objective);
                });
            }
        },

        (objective, callback) => {

            var keyResults = objective.defaultKeyResults.map((keyResultId) => {
                return {
                    templateId: keyResultId,
                    creator: session._id
                };
            });

            var userObjectiveData = {
                templateId: objective._id,
                userId: userId,
                creator: session._id,
                isDeleted: false,
                keyResults: keyResults,
                isBacklog: true,
                quarterId: null
            };

            UserObjectiveRepository.add(userObjectiveData, (err, userObjective) => {
                if (err) {
                    return callback(err, null);
                }

                return callback(null, userObjective);
            });
        },

        (userObjective, callback) => {
            if (session._id == userId) {
                HistoryRepository.addUserObjective(session._id, userObjective._id, CONST.history.type.ADD_TO_BACKLOG, (err) => {
                    if (err) {
                        return callback(err, null);
                    }

                    return callback(null, userObjective);
                });
            } else {
                HistoryRepository.addUserObjectiveToOtherUser(session._id, userId, userObjective._id, CONST.history.type.ADD_TO_BACKLOG, (err) => {
                    if (err) {
                        return callback(err, null);
                    }

                    return callback(null, userObjective);
                });
            }
        },

        (userObjective, callback) => {
            UserObjectiveRepository.getByIdPopulate(userObjective._id, (err, userObjective) => {

                if (err) {
                    return callback(err, null);
                }

                if (isEmpty(userObjective)) {
                    var error = new Error('Unexpected server error. How could that be? O_o');
                    error.status = 500;
                    return callback(err, null);
                }

                return callback(null, userObjective);
            });
        }
    ], (err, result) => {
        return callback(err, result);
    });
};
