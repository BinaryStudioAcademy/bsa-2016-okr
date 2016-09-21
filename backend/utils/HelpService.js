const CONST = require('../config/constants.js')

module.exports = {
	stringToBoolean: stringToBoolean,
	debounce: debounce,
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
