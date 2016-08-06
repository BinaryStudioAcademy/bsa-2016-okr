var User = require('../schemas/user');
var Objective = require('../schemas/objective');
var Key = require('../schemas/key');
var Category = require('../schemas/category');
var Comment = require('../schemas/comment');
var History = require('../schemas/history');
var Plan = require('../schemas/plan');
var UserMentor = require('../schemas/userMentor');

var Chance = require('chance');
var mongoose = require('mongoose');

var chance = new Chance();
function getRandomId(set) {
    var index = chance.integer({ min: 0, max: set.length - 1 });
    return set[index]._id;
}

function randomUser(i) {
    return new User({
        followObjectives: [],
        objectives: [],
        lastVisitDate: chance.date({ year: 2016 }),
        historyWatchDate: chance.date({ year: 2016 }),
        isDeleted: i % 10 === 0
    });
}

function randomObjective(users, i) {
    return new Objective({
        createdBy: getRandomId(users),
        title: chance.sentence({ words: chance.integer({ min: 1, max: 5 }) }),
        cheers: [
            getRandomId(users),
            getRandomId(users)
        ],
        createDate: chance.date({ year: 2016 }),
        editDate: chance.date({ year: 2016 }),
        views: [
            getRandomId(users),
            getRandomId(users),
            getRandomId(users),
            getRandomId(users),
            getRandomId(users)
        ],
        forks: chance.integer({ min: 0, max: 50 }),
        isApproved: i % 5 === 0,
        isDeleted: i % 10 === 0
    });
}

function randomKey(objectives, i) {
    return new Key({
        objectiveId: getRandomId(objectives),
        title: chance.sentence({ words: chance.integer({ min: 1, max: 5 }) }),
        score: chance.integer({ min: 0, max: 100 }) / 100,
        forks: chance.integer({ min: 0, max: 50 }),
        difficulty: chance.pickset(['low', 'intermediate', 'high']),
        isApproved: i % 5 === 0,
        isDeleted: i % 10 === 0
    });
}

function randomComment(users, objectives, i) {
    return new Comment({
        userId: getRandomId(users),
        objectiveId: getRandomId(objectives),
        text: chance.paragraph({ sentences: 3 }),
        isDeleted: i % 10 === 0,
        createDate: chance.date({ year: 2016 }),
        editDate: chance.date({ year: 2016 })
    });
}

function randomCategory(i) {
    return new Category({
        title: chance.pickset(['Knowledge', 'Expertise', 'Projects']),
        isDeleted: i % 3 === 0
    });
}

function randomPlan(users, objectives, i) {
    return new Plan({
        userId: getRandomId(users),
        objectives: {
            1: [getRandomId(objectives), getRandomId(objectives)],
            2: [getRandomId(objectives), getRandomId(objectives)],
            3: [getRandomId(objectives), getRandomId(objectives)],
            4: [getRandomId(objectives), getRandomId(objectives)]
        },
        title: chance.sentence({ words: chance.integer({ min: 1, max: 5 }) }),
        isDeleted: i % 10 === 0
    });
}

function randomUserMentor(users, i) {
    return new UserMentor({
        userId: getRandomId(users),
        mentorId: getRandomId(users)
    });
}

function randomHistory(users, keys, i) {
    return new History({
        authorId: getRandomId(users),
        typeId: getRandomId(keys),
        type: chance.pickset(['add', 'delete', 'update']),
        date: chance.date({ year: 2016 })
    });
}

module.exports = function () {
    //toObject to avoid bulk insert crashes
    var users = new Array(100).fill(0).map((_, i) => randomUser(i).toObject());
    var objectives = new Array(1000).fill(0).map((_, i) => randomObjective(users, i).toObject());
    var keys = new Array(10000).fill(0).map((_, i) => randomKey(objectives, i).toObject());
    var comments = new Array(10000).fill(0).map((_, i) => randomComment(users, objectives, i).toObject());
    var categories = new Array(15).fill(0).map((_, i) => randomCategory(i).toObject());
    var plans = new Array(100).fill(0).map((_, i) => randomPlan(users, objectives, i).toObject());
    var usersMentors = new Array(100).fill(0).map((_, i) => randomUserMentor(users, i).toObject());
    var histories = new Array(10000).fill(0).map((_, i) => randomHistory(users, keys, i).toObject());

    return {
        users: users,
        objectives: objectives,
        keys: keys,
        comments: comments,
        categories: categories,
        plans: plans,
        usermentors: usersMentors,
        histories: histories
    };
}