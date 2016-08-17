// Timestamp from mongoose schema options not working because of
// using native mongoDb driver collection.insertMany function 
// for high performance in ./seed.js 

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
	var createdAt = chance.date({ year: 2016 });
	var updatedAt = new Date(createdAt.getTime() + chance.integer({ min: 0, max: 20000000 }));
	
	return new User({
		userName: chance.string({ min: 0, max: 10 }),
		mentor: chance.string({ min: 0, max: 10 }),
		followObjectives: [],
		objectives: [],
		lastVisitDate: chance.date({ year: 2016 }),
		historyWatchDate: chance.date({ year: 2016 }),
		isDeleted: i % 10 === 0,
		createdAt: createdAt,
		updatedAt: updatedAt
	});
}

function randomObjective(users, i) {
	var createdAt = chance.date({ year: 2016 });
	var updatedAt = new Date(createdAt.getTime() + chance.integer({ min: 0, max: 20000000 }));
	
	return new Objective({
		createdBy: getRandomId(users),
		title: chance.sentence({ words: chance.integer({ min: 1, max: 5 }) }),
		description: chance.sentence({ words: chance.integer({ min: 5, max: 15 }) }),
		keys: [],
		cheers: [
			getRandomId(users),
			getRandomId(users)
		],
		views: [
			getRandomId(users),
			getRandomId(users),
			getRandomId(users),
			getRandomId(users),
			getRandomId(users)
		],
		forks: chance.integer({ min: 0, max: 50 }),
		isApproved: i % 5 === 0,
		isDeleted: i % 10 === 0,
		createdAt: createdAt,
		updatedAt: updatedAt
	});
}

function randomKey(objectives, i) {
	var createdAt = chance.date({ year: 2016 });
	var updatedAt = new Date(createdAt.getTime() + chance.integer({ min: 0, max: 20000000 }));
	
	return new Key({
		objectiveId: getRandomId(objectives),
		title: chance.sentence({ words: chance.integer({ min: 1, max: 5 }) }),
		score: chance.integer({ min: 0, max: 100 }) / 100,
		forks: chance.integer({ min: 0, max: 50 }),
		difficulty: chance.pickset(['low', 'intermediate', 'high']),
		isApproved: i % 5 === 0,
		isDeleted: i % 10 === 0,
		createdAt: createdAt,
		updatedAt: updatedAt
	});
}

function randomComment(users, objectives, i) {
	var createdAt = chance.date({ year: 2016 });
	var updatedAt = new Date(createdAt.getTime() + chance.integer({ min: 0, max: 20000000 }));

	return new Comment({
		userId: getRandomId(users),
		objectiveId: getRandomId(objectives),
		text: chance.paragraph({ sentences: 3 }),
		isDeleted: i % 10 === 0,
		createdAt: createdAt,
		updatedAt: updatedAt
	});
}

function randomCategory(i) {
	return new Category({
		title: chance.pickset(['Knowledge', 'Expertise', 'Projects']),
		isDeleted: i % 3 === 0
	});
}

function baseCategories() {
	var res = [];
	var categories = ['Knowledge', 'Expertise', 'Projects'];
	
	categories.forEach(categoryName => {
		var category = new Category({
			title: categoryName,
			isDeleted: false
		});
		res.push(category.toObject());
	});

	return res;
}

function randomPlan(users, objectives, i) {
	var createdAt = chance.date({ year: 2016 });
	var updatedAt = new Date(createdAt.getTime() + chance.integer({ min: 0, max: 20000000 }));
	
	return new Plan({
		userId: getRandomId(users),
		objectives: {
			1: [getRandomId(objectives), getRandomId(objectives)],
			2: [getRandomId(objectives), getRandomId(objectives)],
			3: [getRandomId(objectives), getRandomId(objectives)],
			4: [getRandomId(objectives), getRandomId(objectives)]
		},
		title: chance.sentence({ words: chance.integer({ min: 1, max: 5 }) }),
		isDeleted: i % 10 === 0,
		createdAt: createdAt,
		updatedAt: updatedAt
	});
}

function randomUserMentor(users, i) {
	return new UserMentor({
		userId: getRandomId(users),
		mentorId: getRandomId(users)
	});
}

function randomHistory(users, keys, i) {
	var createdAt = chance.date({ year: 2016 });
	var updatedAt = new Date(createdAt.getTime() + chance.integer({ min: 100000, max: 2000000 }));
	
	return new History({
		authorId: getRandomId(users),
		typeId: getRandomId(keys),
		type: chance.pickset(['add', 'delete', 'update']),
		createdAt: createdAt,
		updatedAt: updatedAt
	});
}

module.exports = function () {
		//toObject to avoid bulk insert crashes
		var users = new Array(100).fill(0).map((_, i) => randomUser(i).toObject());
		var objectives = new Array(1000).fill(0).map((_, i) => randomObjective(users, i).toObject());
		var keys = new Array(10000).fill(0).map((_, i) => randomKey(objectives, i).toObject());
		var comments = new Array(10000).fill(0).map((_, i) => randomComment(users, objectives, i).toObject());
		var categories = baseCategories();
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