var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var CONST = require('../config/constants');

module.exports = {
	isCorrectId: isCorrectId,
	isEmpty: isEmpty,
	isArray: isArray,
	isObject: isObject,
	getValidDifficulty: getValidDifficulty,
	isStringBoolean: isStringBoolean
};

function isCorrectId(id) {
	var id = '' + id;
	var regex = /^[a-fA-F0-9]{24}$/;

	id = id.trim();

	if(!id || !regex.test(id)) {
		return false;
	}

	return true;

}

function isEmpty(value) {
	return (value == null || value.length === 0);
}

function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
}

function isObject(value) {
  return typeof value === 'object';
}

function getValidDifficulty(value) {
	return CONST.key[value.toUpperCase()];
}

function isStringBoolean(value) {
	switch (value.toLowerCase()) {
	    case "0":
			case "1":
			case "true":
			case "false":
	        var result = true;
	        break;
	    default:
	        var result = false;
	}
	return result
}
