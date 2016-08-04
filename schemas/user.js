var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: mongoose.Schema.ObjectId,
    followObjectives: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            objectiveId: { type: mongoose.Schema.Types.ObjectId, ref: 'Objective' }
        }],
    objectives: [
        {
            objectiveId: { type: mongoose.Schema.Types.ObjectId, ref: 'Objective' },
            keys: [{
                keyId: { type: mongoose.Schema.Types.ObjectId, ref: 'KeyResult' },
                title: String,
                score: Number,
                forks: Number
            }],
            category: String,
            score: Number,
            status: Number,
            feedback: String
        }],
    lastVisitDate: Date,
    historyWatchDate: Date,
    isDeleted: Boolean
});

module.exports = mongoose.model('User', userSchema);