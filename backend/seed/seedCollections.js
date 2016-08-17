// Timestamp from mongoose schema options not working because of
// using native mongoDb driver collection.insertMany function 
// for high performance in ./seed.js 

var User = require('../schemas/user');
var Objective = require('../schemas/objective');
var Key = require('../schemas/key');
var Category = require('../schemas/category');
// var Comment = require('../schemas/comment');
// var History = require('../schemas/history');
// var Plan = require('../schemas/plan');
// var UserMentor = require('../schemas/userMentor');
// var UserObjective = require('../schemas/userObjective');

var Chance = require('chance');
var mongoose = require('mongoose');
var CONST = require('../config/constants');

var chance = new Chance();
function getRandomId(set) {
	var index = chance.integer({ min: 0, max: set.length - 1 });
	return set[index]._id;
}

function randomUser(i) {
	var createdAt = chance.date({ year: 2016, month: 4 });
	var updatedAt = new Date(createdAt.getTime() + chance.integer({ min: 0, max: 200000000 }));
	
	return new User({
		localRole: i % 10 === 0 ? 'admin' : '',
		createdAt: createdAt,
		updatedAt: updatedAt
	});
}

function randomObjective(users, categories, i) {
	var createdAt = chance.date({ year: 2016 });
	var updatedAt = new Date(createdAt.getTime() + chance.integer({ min: 0, max: 20000000 }));
	
	return new Objective({
		title: chance.sentence({ words: chance.integer({ min: 1, max: 5 }) }),
		description: chance.sentence({ words: chance.integer({ min: 5, max: 15 }) }),
		category: getRandomId(categories),
		keyResults: [],
		creator: getRandomId(users),
		isApproved: i % 5 !== 0,
		isDeleted: i % 10 === 0,
		createdAt: createdAt,
		updatedAt: updatedAt
	});
}

function randomKey(objectives, users, i) {
	var createdAt = chance.date({ year: 2016, month: 6 });
	var updatedAt = new Date(createdAt.getTime() + chance.integer({ min: 0, max: 20000000 }));
	
	return new Key({
		title: chance.sentence({ words: chance.integer({ min: 1, max: 5 }) }),
		creator: getRandomId(users),
		objectiveId: getRandomId(objectives),
		difficulty: chance.pickone(Key.schema.path('difficulty').enumValues),
		createdAt: createdAt,
		updatedAt: updatedAt
	});
}

/*function randomComment(users, objectives, i) {
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
}*/

function baseCategories() {
	var res = [];
	var categories = [CONST.objective.PROJECTS];
	
	Object.getOwnPropertyNames(CONST.objective).forEach(categoryName => {
		var category = new Category({
			title: CONST.objective[categoryName],
			isDeleted: false
		});
		
		res.push(category.toObject());
	});

	return res;
}

function setDefaultKeysForObjectives(objective, keys) {
	objectives.forEach((objective) => {
		var objectiveKeys = keys.filter((key) => {
			return key.objectiveId.equals(objective._id);
		});

		var defaultKeys = chance.pickset(objectiveKeys, 3).map((key) => {
			return key._id;
		});

		objective.keyResults = defaultKeys;
	});

	return objectives;
}

/*function randomPlan(users, objectives, i) {
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
}*/

/*function randomUserMentor(users, i) {
	return new UserMentor({
		userId: getRandomId(users),
		mentorId: getRandomId(users)
	});
}*/

/*function randomHistory(users, keys, i) {
	var createdAt = chance.date({ year: 2016 });
	var updatedAt = new Date(createdAt.getTime() + chance.integer({ min: 100000, max: 2000000 }));
	
	return new History({
		authorId: getRandomId(users),
		typeId: getRandomId(keys),
		type: chance.pickset(['add', 'delete', 'update']),
		createdAt: createdAt,
		updatedAt: updatedAt
	});
}*/

module.exports = function () {
		//toObject to avoid bulk insert crashes
		var users = new Array(100).fill(0).map((_, i) => randomUser(i).toObject());
		var categories = baseCategories();
		var objectives = new Array(1000).fill(0).map((_, i) => randomObjective(users, categories, i).toObject());
		var keys = new Array(10000).fill(0).map((_, i) => randomKey(objectives, users, i).toObject());

		objectives = setDefaultKeysForObjectives(objectives);

		// var comments = new Array(10000).fill(0).map((_, i) => randomComment(users, objectives, i).toObject());
		// var plans = new Array(100).fill(0).map((_, i) => randomPlan(users, objectives, i).toObject());
		// var usersMentors = new Array(100).fill(0).map((_, i) => randomUserMentor(users, i).toObject());
		// var histories = new Array(10000).fill(0).map((_, i) => randomHistory(users, keys, i).toObject());

		return {
			users: users,
			objectives: objectives,
			keys: keys,
			categories: categories,
			// comments: comments,
			// plans: plans,
			// usermentors: usersMentors,
			// histories: histories
		};
	}