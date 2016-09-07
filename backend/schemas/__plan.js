var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var planSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    objectives: {
        1: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Objective' }],
        2: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Objective' }],
        3: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Objective' }],
        4: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Objective' }]
    },
    title: String,
    isDeleted: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);
