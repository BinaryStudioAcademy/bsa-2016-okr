const ValidateService = require('./ValidateService');
const isEmpty = ValidateService.isEmpty;
const CONST = require('../config/constants');
const HelpService = require('./HelpService');
const getUniqueValuesFromArray = HelpService.getUniqueValuesFromArray;

module.exports = {
  getTabForYear: getTabForYear,
  getYears: getYears,
  addNewQuarter: addNewQuarter,
  setScoreToKeyResult: setScoreToKeyResult
};

function getTabForYear(quarters, year) {
	let tab = null;
	let i;
	let yearQuarters = quarters.filter((quarter) => {
		return quarter.year === year;
	});

	if(isEmpty(yearQuarters)) {
		return tab;
	}

	if(year === CONST.currentYear) {
		let currentQuarterIndex = yearQuarters.findIndex((quarter) => {
			return quarter.index === CONST.currentQuarter;
		});

		i = (currentQuarterIndex === -1) ? 0 : currentQuarterIndex;
		tab = yearQuarters[i].index;
	} else {
		i = 0;
		tab = yearQuarters[i].index;
	}

	return tab;
}

function getYears(quarters) {
  quarters = !isEmpty(quarters) ? quarters : [];

  let years = quarters.map((quarter) => {
    return quarter.year;
  });

  years.push(CONST.currentYear);
  years.push(CONST.currentYear + 1);
  years = getUniqueValuesFromArray(years);
  years.sort((a, b) => { return b - a });

  return years;
}

function addNewQuarter(oldQuarters, newQuarter) {
	let quarters = [].concat(oldQuarters);

	let quarterIndex = quarters.findIndex((quarter) => {
		return (quarter.year === newQuarter.year) && (quarter.index === newQuarter.index);
	});

	if(quarterIndex === -1) {
		quarters.push(newQuarter);
	}

	return quarters;
}

function setScoreToKeyResult(me, objectiveId, keyResultId, score) {
	const meCopy = Object.assign({}, me);

	let quarterIndex = -1;
	let	userObjectiveIndex = -1;
	let	keyResultIndex = -1;

	let quarterFoundedIndex = meCopy.quarters.findIndex((quarter) => {
		let userObjectiveFoundedIndex = quarter.userObjectives.findIndex((userObjective) => {
			return userObjective._id === objectiveId
		});

		if(userObjectiveFoundedIndex !== -1) {
			userObjectiveIndex = userObjectiveFoundedIndex;
			return true;
		}

		return false;
	});

	if(quarterFoundedIndex !== -1) {
		quarterIndex = quarterFoundedIndex;

		if (userObjectiveIndex !== -1) {
			let keyResultFoundedIndex = meCopy.quarters[quarterIndex].userObjectives[userObjectiveIndex].keyResults.findIndex((keyResult) => {
				return keyResult._id === keyResultId;
			});

			if (keyResultFoundedIndex !== -1) {
				keyResultIndex = keyResultFoundedIndex;
				meCopy.quarters[quarterIndex].userObjectives[userObjectiveIndex].keyResults[keyResultIndex].score = score;
			}
		}
	}

	return meCopy;
}
