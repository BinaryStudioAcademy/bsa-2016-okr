// Timestamp from mongoose schema options not working because of
// using native mongoDb driver collection.insertMany function
// for high performance in ./seed.js

var User = require('../schemas/user');
var Objective = require('../schemas/objective');
var KeyResult = require('../schemas/keyResult');
var Category = require('../schemas/category');
var UserObjective = require('../schemas/userObjective');
var Quarter = require('../schemas/quarter');
// var Comment = require('../schemas/comment');
// var History = require('../schemas/history');
// var Plan = require('../schemas/plan');
// var UserMentor = require('../schemas/userMentor');

var Role = require('../schemas/role');

var Chance = require('chance');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
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
		used: 0,
		creator: getRandomId(users),
		isApproved: i % 5 !== 0,
		isDeleted: i % 10 === 0,
		createdAt: createdAt,
		updatedAt: updatedAt
	});
}

function randomKeyResult(objectives, users, i) {
	var createdAt = chance.date({ year: 2016, month: 6 });
	var updatedAt = new Date(createdAt.getTime() + chance.integer({ min: 0, max: 20000000 }));

	return new KeyResult({
		title: chance.sentence({ words: chance.integer({ min: 1, max: 5 }) }),
		creator: getRandomId(users),
		objectiveId: getRandomId(objectives),
		isApproved: i % 6 !== 0,
		isDeleted: i % 8 === 0,
		difficulty: chance.pickone(KeyResult.schema.path('difficulty').enumValues),
		createdAt: createdAt,
		updatedAt: updatedAt
	});
}

function randomUserObjective(objectives, users, keyResults, i) {
	var createdAt = chance.date({ year: 2016, month: 7 });
	var updatedAt = new Date(createdAt.getTime() + chance.integer({ min: 0, max: 20000000 }));
	var user = getRandomId(users);

	var objectiveTemplate;
	var objectiveKeyResults = [];

	while(objectiveKeyResults.length < 1) {
		objectiveTemplate = chance.pickone(objectives);

		objectiveKeyResults = keyResults.filter((keyResult) => {
			return keyResult.objectiveId.equals(objectiveTemplate._id);
		});
	}

	var userKeyCount = chance.integer({ min: 1, max: objectiveKeyResults.length });

	userKeyResults = chance
	.pickset(objectiveKeyResults, userKeyCount)
	.map((userKeyResult) => {
		var userKeyResultIndex = keyResults.findIndex((keyResult) => {
			return userKeyResult._id === keyResult._id;
		});

		keyResults[userKeyResultIndex].used += 1;

		return {
			templateId: userKeyResult._id,
			score: chance.floating({ min: 0, max: 1, fixed: 1 }),
			creator: user
		};
	});

	var userObjectiveIndex = objectives.findIndex((objective) => {
		return objective._id === objectiveTemplate._id;
	});

	objectives[userObjectiveIndex].used += 1;

	return new UserObjective({
		templateId: objectiveTemplate._id,
		userId: user,
		creator: user,
		isDeleted: i % 10 === 0,
		keyResults: userKeyResults
	});
};

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

function setDefaultKeyResultsForObjectives(objectives, keyResults) {
	objectives.forEach((objective) => {
		var objectiveKeyResults = keyResults.filter((keyResult) => {
			return keyResult.objectiveId.equals(objective._id);
		});

		if(objectiveKeyResults.length === 0) {
			return;
		}

		var keyResultsCount = chance.integer({ min: 1, max: objectiveKeyResults.length });

		var defaultKeyResults = chance
		.pickset(objectiveKeyResults, keyResultsCount)
		.map((keyResult) => {
			return ObjectId(keyResult._id);
		});

		objective.keyResults = defaultKeyResults;
	});

	return objectives;
}

function getQuarters(users, userObjectives) {
	var currentYear = CONST.currentYear;
	var quarters = [1, 2, 3, 4];
	var years = [currentYear, currentYear + 1];
	var res = [];

	users.forEach((user) => {
		var objectives = userObjectives.filter((userObjective) => {
			return userObjective.userId.equals(user._id);
		});

		objectiveIds = objectives.map((objective) => {
			return objective._id
		});

		years.forEach((year) => {
			quarters.forEach((index) => {
				var quarterObjectives;

				if((index !== 4) && (year !== currentYear + 1)) {
					quarterObjectives = chance.pickset(objectiveIds, chance.integer({ min: 0, max: objectiveIds.length }));
				} else {
					quarterObjectives = objectiveIds;
				}

				objectiveIds = objectiveIds.filter((objectiveId) => {
					return quarterObjectives.indexOf(objectiveId) === -1;
				});

				var createdAt = chance.date({ year: currentYear });
				var updatedAt = new Date(createdAt.getTime() + chance.integer({ min: 0, max: 20000000 }));
				var quarter = new Quarter({
					year: year,
					index: index,
					userId: user._id,
					userObjectives: quarterObjectives,
					createdAt: createdAt,
					updatedAt: updatedAt
				});

				res.push(quarter.toObject());
			});
		});
	});

	return res;
}

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
		// .toObject() to avoid bulk insert crashes
		// variables are lowercased because they need to be named as collections

		var users = new Array(100).fill(0).map((_, i) => randomUser(i).toObject());
		var categories = baseCategories();
		var objectives = new Array(1000).fill(0).map((_, i) => randomObjective(users, categories, i).toObject());
		var keyresults = new Array(5000).fill(0).map((_, i) => randomKeyResult(objectives, users, i).toObject());
		var userobjectives = new Array(1000).fill(0).map((_, i) => randomUserObjective(objectives, users, keyresults, i).toObject());
		var quarters = getQuarters(users, userobjectives);

		objectives = setDefaultKeyResultsForObjectives(objectives, keyresults);

		var roles = [];

		roles.push({globalRole: "ADMIN", localRole: "Admin"});
		roles.push({globalRole: "DEVELOPER", localRole: "User"});
		roles.push({globalRole: "HR", localRole: "User"});
		roles.push({globalRole: "CEO", localRole: "Admin"});
		roles.push({globalRole: "Tech Lead", localRole: "Admin"});

		// var histories = new Array(10000).fill(0).map((_, i) => randomHistory(users, keys, i).toObject());


		// keys in returned object should be names of collections in DB
		return {
			users: users,
			objectives: objectives,
			keyresults: keyresults,
			categories: categories,
			userobjectives: userobjectives,
			quarters: quarters,
			roles: roles
			// histories: histories
		};
	}
