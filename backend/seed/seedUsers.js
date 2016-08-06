var User = require('../schemas/user');
var Chance = require('chance');

var chance = new Chance();
module.exports = function () {
    var users = [];
    for (var i = 0; i < 100; i++) {
        var user = new User({
            followObjectives: [],
            objectives: [],
            lastVisitDate: chance.date({ year: 2016 }),
            historyWatchDate: chance.date({ year: 2016 }),
            isDeleted: i % 10 === 0
        });
        users.push(user);
    }
    return users;
};