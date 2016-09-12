var CONST = require('../config/constants');

module.exports = {
	stringToBoolean: stringToBoolean,
	debounce: debounce,
	getDifficultyNumber: getDifficultyNumber,
	getNumberDifficulty: getNumberDifficulty,
	getValidDifficulty: getValidDifficulty,
	getUniqueValuesFromArray: getUniqueValuesFromArray,
	getUniqueValuesFromArrayOfObjects: getUniqueValuesFromArrayOfObjects,
};

function debounce(func, wait, immediate) {
	var timeout;
	return function () {
		var context = this, args = arguments;
		var later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function stringToBoolean(str) {
	switch(str) {
		case '1':
		case 'true':
			return true;
		case '0':
		case 'false':
			return false
	}

	return false;
}

function getDifficultyNumber(str) {
	switch(str) {
	case CONST.keyResult.EASY:
		return 1;
	case CONST.keyResult.INTERMEDIATE:
		return 2;
	case CONST.keyResult.ADVANCED:
		return 3;
	default: return 2;
	}
}

function getNumberDifficulty(num) {
	switch(num) {
	case 1:
		return CONST.keyResult.EASY;
	case 2:
		return CONST.keyResult.INTERMEDIATE;
	case 3:
		return CONST.keyResult.ADVANCED;
	default: return CONST.keyResult.INTERMEDIATE;
	}
}

function getValidDifficulty(value) {
	return CONST.keyResult[value.toUpperCase()];
}

function getUniqueValuesFromArray(arr) {
	var keys = {};
	var res = [];

	arr.forEach((el) => {
		if(!keys[el]) {
			keys[el] = true;
			res.push(el);
		}
	});

	return res;
}

function getUniqueValuesFromArrayOfObjects(arr, uniqueProp) {
	var keys = {};
	var res = [];

	arr.forEach((el) => {
		if(!keys[el[uniqueProp]]) {
			keys[el[uniqueProp]] = true;
			res.push(el);
		}
	});

	return res;
}