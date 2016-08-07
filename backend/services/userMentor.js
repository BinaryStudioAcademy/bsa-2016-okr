var UserMentorRepository = require('../repositories/userMentor.js'),
    async = require('async');

var UserMentorService = function() {};

/**
 *
 * @param data contain userId
 * @param callback
 */
UserMentorService.prototype.getByUserId = (data, callback) => {
    let userId = data.userId;

    // Get by userId
    UserMentorRepository.getByUserId(userId, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
    })
};

/**
 *
 * @param data contain mentorId
 * @param callback
 */
UserMentorService.prototype.getByMentorId = (data, callback) => {
    let mentorId = data.mentorId;

    // Get by mentorId
    UserMentorRepository.getByMentorId(mentorId, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
    })
};

/**
 *
 * @param data contain userId and mentorId
 * @param callback
 */
UserMentorService.prototype.setUserAsMentor = (data, callback) => {
    let userId = data.userId,
        mentorId = data.mentorId;

    // Add relations User to Mentor in collection
    UserMentorRepository.setMentorToUser(userId, mentorId, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
    })
};

/**
 *
 * @param data contain userId and mentorId
 * @param callback
 */
UserMentorService.prototype.checkUserMentor = (data, callback) => {
    let userId = data.userId,
        mentorId = data.mentorId;

    // Add relations User to Mentor in collection
    UserMentorRepository.checkUserMentor(userId, mentorId, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
    })
};

/**
 *
 * @param data contain id
 * @param callback
 */
UserMentorService.prototype.deleteByUserId = (data, callback) => {
    let userId = data.userId,
        mentorId = data.mentorId;

    // Delete by Id
    UserMentorRepository.deleteByUserId(userId, mentorId, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
    })
};

/**
 *
 * @param data contain id
 * @param callback
 */
UserMentorService.prototype.deleteByMentorId = (data, callback) => {
    let userId = data.userId,
        mentorId = data.mentorId;

    // Delete by Id
    UserMentorRepository.deleteByMentorId(userId, mentorId, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
    })
};
module.exports = new UserMentorService();