var Objective = require('../schemas/objective');
var seedUsers = require('./seedUsers');
var Chance = require('chance');

var chance = new Chance();
function getRandomUserId(users) {
    return users[chance.integer({ min: 0, max: users.length - 1 })]._id;
};

module.exports = function () {
    var users = seedUsers();
    var objectives = [];

    for (var i = 0; i < 1000; i++) {
        var objective = new Objective({
            createdBy: users[i % users.length]._id,
            title: chance.sentence({ words: chance.integer({ min: 1, max: 5 }) }),
            description: chance.paragraph({ sentences: 3 }),
            cheers: [getRandomUserId(users), getRandomUserId(users)],
            createDate: chance.date({ year: 2016 }),
            editDate: chance.date({ year: 2016 }),
            views: [
                getRandomUserId(users),
                getRandomUserId(users),
                getRandomUserId(users),
                getRandomUserId(users),
                getRandomUserId(users)
            ],
            forks: chance.integer({ min: 0, max: 50 }),
            isDeleted: i % 10 === 0
        });
        objectives.push(objective);
    }
    return {
        users: users,
        objectives: objectives
    };
}