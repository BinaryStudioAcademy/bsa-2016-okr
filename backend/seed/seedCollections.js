// Timestamp from mongoose schema options not working because of
// using native mongoDb driver collection.insertMany function
// for high performance in ./seed.js

var User = require('../schemas/user');
var Objective = require('../schemas/objective');
var KeyResult = require('../schemas/keyResult');
var Category = require('../schemas/category');
var UserObjective = require('../schemas/userObjective');
var Quarter = require('../schemas/quarter');
var UserInfo = require('../schemas/userInfo');
// var Comment = require('../schemas/comment');
var History = require('../schemas/history');
// var Plan = require('../schemas/plan');
// var UserMentor = require('../schemas/userMentor');

var Role = require('../schemas/role');

var Chance = require('chance');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var CONST = require('../config/constants');
var mock = require('./mockData');
var globalRoles = getGlobalRoles();

var chance = new Chance();

function getRandomId(set) {
	var index = chance.integer({ min: 0, max: set.length - 1 });
	return set[index]._id;
}

function returnCategoryId(categoryTitle, categories) {
	var id = '';
	categories.forEach(category => {
		if (category.title == categoryTitle) {
			id = category._id;
		}
	})
	return id
}

function randomUser() {

	var createdAt = chance.date({ year: 2016, month: 4 });
	var updatedAt = new Date(createdAt.getTime() + chance.integer({ min: 0, max: 200000000 }));

	var randomValue = chance.integer({ min: 1, max: 100 });

	var localRole;

	if (randomValue <= 10)
		localRole = CONST.user.localRole.USER;
	else if (randomValue > 10 && randomValue < 26)
		localRole = CONST.user.localRole.MENTOR;
	else if (randomValue > 25 && randomValue < 36)
		localRole = CONST.user.localRole.DEFAULT;
	else
		localRole = CONST.user.localRole.ADMIN;

	return new User({
		localRole: localRole,
		createdAt: createdAt,
		updatedAt: updatedAt,
		mentor: null
	});
}

function generateMentors(users) {

	var isCompleted, apprenticeNumbers;

	for (var i = 0; i < users.length; i++) {

		if (users[i].localRole === CONST.user.localRole.MENTOR) {

			apprenticeIndex = 0;
			apprenticeNumbers = chance.integer({ min: 0, max: users.length });

			if (apprenticeNumbers > 3)
				apprenticeNumbers = 3;

			while (apprenticeIndex < users.length && apprenticeNumbers > 0) {

				if (apprenticeIndex === users.length)
					break;

				if (apprenticeIndex === i || users[apprenticeIndex].localRole != CONST.user.localRole.USER) {
					++apprenticeIndex;
					continue;
				}

				if (users[apprenticeIndex].mentor != null) {
					++apprenticeIndex;
					continue;
				}

				users[apprenticeIndex].mentor = ObjectId(users[i]._id);

				--apprenticeNumbers;
				++apprenticeIndex

			}

		}

	}

}

function randomObjective(users, categories, i) {

	var createdAt = chance.date({ year: 2016 });
	var updatedAt = new Date(createdAt.getTime() + chance.integer({ min: 0, max: 20000000 }));

	var isDeleted =  i % 10 === 0;
	var deletedDate = null;
	var deletedBy = null;

	if (isDeleted) {
		var isDone = false;
		var userWhoDidDeletionIndex;

		deletedDate = new Date(createdAt.getTime() + chance.integer({ min: 0, max: 20000000 }));

		while(!isDone) {
			userWhoDidDeletionIndex = chance.integer({ min: 0, max: users.length - 1 });
			if (users[userWhoDidDeletionIndex].localRole === CONST.user.localRole.ADMIN) {
				isDone = true;
			}
		}

		deletedBy = users[userWhoDidDeletionIndex]._id;
	}

	return new Objective({
		title: mock.objectivesMock[i].title,
		description: mock.objectivesMock[i].description,
		category: returnCategoryId(mock.objectivesMock[i].category, categories),
		defaultKeyResults: [],
		used: 0,
		creator: getRandomId(users),
		isApproved: i % 5 !== 0,
		isDeleted: i % 10 === 0,
		isDeleted: isDeleted,
		deletedBy: deletedBy,
		deletedDate: deletedDate,
		createdAt: createdAt,
		updatedAt: updatedAt
	});
/*
	return new Objective({
		title: chance.sentence({ words: chance.integer({ min: 1, max: 5 }) }),
		description: chance.sentence({ words: chance.integer({ min: 5, max: 15 }) }),
		category: getRandomId(categories),
		defaultKeyResults: [],
		used: 0,
		creator: getRandomId(users),
		isApproved: i % 5 !== 0,
		isDeleted: i % 10 === 0,
		isDeleted: isDeleted,
		deletedBy: deletedBy,
		deletedDate: deletedDate,
		createdAt: createdAt,
		updatedAt: updatedAt
	});
	*/
}

function randomKeyResult(objectives, users, i) {

	var createdAt = chance.date({ year: 2016, month: 6 });
	var updatedAt = new Date(createdAt.getTime() + chance.integer({ min: 0, max: 20000000 }));

	var isDeleted =  i % 8 === 0;
	var deletedDate = null;
	var deletedBy = null;

	if (isDeleted) {

		deletedDate = new Date(createdAt.getTime() + chance.integer({ min: 0, max: 20000000 }));

		var isDone = false;

		var userWhoDidDeletionIndex;

		while(!isDone) {
			userWhoDidDeletionIndex = chance.integer({ min: 0, max: users.length-1});
			if (users[userWhoDidDeletionIndex].localRole === CONST.user.localRole.ADMIN) {
				isDone = true;
			}
		}

		deletedBy = users[userWhoDidDeletionIndex]._id;

	}

	var objectivePlace = mock.keyResultsMock[i].id
	return new KeyResult({
		title: mock.keyResultsMock[i].title,
		creator: getRandomId(users),
		objectiveId: objectives[objectivePlace]._id,
		isApproved: i % 6 !== 0,
		isDeleted: i % 8 === 0,
		isDeleted: isDeleted,
		deletedBy: deletedBy,
		deletedDate: deletedDate,
		difficulty: mock.keyResultsMock[i].difficulty,
		createdAt: createdAt,
		updatedAt: updatedAt
	});
}

function randomUserObjective(objectives, users, keyResults, i) {

	var createdAt = chance.date({ year: 2016, month: 7 });
	var updatedAt = new Date(createdAt.getTime() + chance.integer({ min: 0, max: 20000000 }));

	var isDeleted =  i % 10 === 0;
	var deletedDate = null;
	var deletedBy = null;

	if (isDeleted) {

		deletedDate = new Date(createdAt.getTime() + chance.integer({ min: 0, max: 20000000 }));

		var isDone = false;

		var userWhoDidDeletionIndex;

		while(!isDone) {
			userWhoDidDeletionIndex = chance.integer({ min: 0, max: users.length-1});
			if (users[userWhoDidDeletionIndex].localRole === "admin")
				isDone = true;
		}

		deletedBy = users[userWhoDidDeletionIndex]._id;

	}

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

		var keyIsDeleted =  chance.pickone([false, false, false, true]);
		var keyDeletedDate = null;
		var keyDeletedBy = null;

		if (keyIsDeleted) {

			keyDeletedDate = new Date(createdAt.getTime() + chance.integer({ min: 0, max: 20000000 }));

			var isDone = false;

			var userWhoDidDeletionIndex;

			while(!isDone) {
				userWhoDidDeletionIndex = chance.integer({ min: 0, max: users.length-1});
				if (users[userWhoDidDeletionIndex].localRole === "admin")
					isDone = true;
			}

			keyDeletedBy = users[userWhoDidDeletionIndex]._id;

		}

		return {
			templateId: userKeyResult._id,
			score: chance.floating({ min: 0, max: 1, fixed: 1 }),
			creator: user,
			deletedBy: keyDeletedBy,
			deletedDate: keyDeletedDate,
			isDeleted: keyIsDeleted
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
		deletedBy: deletedBy,
		deletedDate: deletedDate,
		isDeleted: i % 10 === 0,
		keyResults: userKeyResults
	});
};

function baseCategories(users) {
	var res = [];
	var categories = [CONST.objective.categories.PROJECTS];

	Object.getOwnPropertyNames(CONST.objective.categories).forEach(categoryName => {
		var category = new Category({
			title: CONST.objective.categories[categoryName],
			isDeleted: false
		});

		res.push(category.toObject());
	});

	var isDone = false;

	var userWhoDidDeletionIndex;

	while(!isDone) {
		userWhoDidDeletionIndex = chance.integer({ min: 0, max: users.length-1});
		if (users[userWhoDidDeletionIndex].localRole === "admin")
			isDone = true;
	}
/*
	var myCategory = new Category({
		title: "science",
		isDeleted: true,
		deletedBy: users[userWhoDidDeletionIndex]._id,
		deletedDate: new Date()
	})

	res.push(myCategory.toObject());
	*/
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

		const keyResultsCount = objectiveKeyResults.length;
		const maxDefaultKeyResultsCount = keyResultsCount > 4 ? 4 : keyResultsCount;

		var defaultKeyResultsCount = chance.integer({ min: 1, max: maxDefaultKeyResultsCount });

		var defaultKeyResults = chance
		.pickset(objectiveKeyResults, defaultKeyResultsCount)
		.map((keyResult) => {
			return ObjectId(keyResult._id);
		});

		objective.defaultKeyResults = defaultKeyResults;
	});

	return objectives;
}

function getQuarters(users, userObjectives) {
	var currentYear = CONST.currentYear;
	var quarters = [1, 2, 3, 4];
	var years = [currentYear];
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
				var objectivesCount = objectiveIds.length > 4 ? 4 : objectiveIds.length;

				if((index !== 4) && (year !== currentYear + 1)) {
					quarterObjectives = chance.pickset(objectiveIds, chance.integer({ min: 0, max: objectivesCount}));
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

				// Two way binding for userObjective and quarter
				// userObjective should have field quarterId
				// and quarter should have an array of objectives
				setQuarterIdToObjectives(userObjectives, quarterObjectives, quarter);

				res.push(quarter.toObject());
			});
		});
	});

	return res;
}

function setQuarterIdToObjectives(userObjectives, quarterObjectives, quarter) {
	userObjectives.forEach((userObjective) => {
		let belongsToThisQuarter = quarterObjectives.some((id) => {
			return userObjective._id.equals(id);
		});

		if(belongsToThisQuarter) {
			userObjective.quarterId = quarter._id;
		}
	});
}

function setArchivedToUserObjectives(userObjectives, quarters) {
	var currentYear = CONST.currentYear;
	var currentQuarter = CONST.currentQuarter;

	var pastQuarters = quarters.filter((quarter) => {
		return quarter.year <= currentYear && quarter.index < currentQuarter
	});

	pastQuarters.forEach((quarter) => {
		quarter.userObjectives.forEach((userObjectiveId) => {
			var index = userObjectives.findIndex((userObjective) => {
				return userObjective._id.equals(userObjectiveId);
			});

			userObjectives[index].isArchived = true;
		});
	});

	return userObjectives;
}

function randomUserInfo(users) {
	var info = {
		firstName: chance.first(),
		lastName: chance.last(),
		globalRole: chance.pickone(globalRoles),
		email: chance.email()
	};

	return new UserInfo(info);
};

function setInfoToUser(users, userinfos) {
	users.forEach((user, i) => {

		if (userinfos[i].globalRole === CONST.user.globalRole.ADMIN) {
			users[i].localRole = CONST.user.localRole.ADMIN;
		}

		user.userInfo = userinfos[i]._id;
	});
}

function getRoles() {
	return [
	{
		globalRole: CONST.user.globalRole.ADMIN,
		localRole: CONST.user.localRole.ADMIN
	}, {
		globalRole: CONST.user.globalRole.HR,
		localRole: CONST.user.localRole.USER,
	}, {
		globalRole: CONST.user.globalRole.DEVELOPER,
		localRole: CONST.user.localRole.USER,
	}, {
		globalRole: CONST.user.globalRole.CEO,
		localRole: CONST.user.localRole.ADMIN,
	}, {
		globalRole: CONST.user.globalRole.TECH_LEAD,
		localRole: CONST.user.localRole.ADMIN,
	}
	];
}

function getGlobalRoles() {
	var globalRoles = [];

	for(var role in CONST.user.globalRole) {
		if(CONST.user.globalRole.hasOwnProperty(role)) {
			globalRoles.push(CONST.user.globalRole[role]);
		}
	}

	return globalRoles;
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
		var usersCount = 30;
		var userinfos = new Array(usersCount).fill(0).map((_, i) => randomUserInfo().toObject());
		var users = new Array(usersCount).fill(0).map((_, i) => randomUser().toObject());
		generateMentors(users);
		setInfoToUser(users, userinfos);
		var categories = baseCategories(users);
		var objectives = new Array(mock.objectivesMock.length).fill(0).map((_, i) => randomObjective(users, categories, i).toObject());
		var keyresults = new Array(mock.keyResultsMock.length).fill(0).map((_, i) => randomKeyResult(objectives, users, i).toObject());
		var userobjectives = new Array(240).fill(0).map((_, i) => randomUserObjective(objectives, users, keyresults, i).toObject());
		var quarters = getQuarters(users, userobjectives);
		var roles = getRoles();

		userobjectives = setArchivedToUserObjectives(userobjectives, quarters);
		objectives = setDefaultKeyResultsForObjectives(objectives, keyresults);

		// var histories = new Array(10000).fill(0).map((_, i) => randomHistory(users, keys, i).toObject());


		// keys in returned object should be names of collections in DB
		return {
			users: users,
			objectives: objectives,
			keyresults: keyresults,
			categories: categories,
			userobjectives: userobjectives,
			quarters: quarters,
			roles: roles,
			userinfos: userinfos
			// histories: histories
		};
	}
