var CONST = require('../config/constants');

module.exports = {
	isCorrectId: isCorrectId,
	isEmpty: isEmpty,
	isEmptyObject: isEmptyObject,
	isString: isString,
	isNumber: isNumber,
	isObject: isObject,
	isArray: isArray,
	isStringBoolean: isStringBoolean,
	isValidYear: isValidYear,
	isValidQuarter: isValidQuarter,
	isMentorActionAllowed: isMentorActionAllowed,
	isAdmin: isAdmin
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
	return value == null || value.length === 0 || isEmptyObject(value);
}

function isEmptyObject(obj) {
	return (typeof obj === "object" && Object.getOwnPropertyNames(obj).length == 0);
}

function isString(value) {
	return typeof value === typeof '';
}

function isNumber(value) {
	return typeof value === typeof 1;
}

function isObject(value) {
	return typeof value === typeof {};
}

function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
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

function isValidYear(year) {
	return year >= 2016;
}

function isValidQuarter(index) {
	return (index >= 1) && (index <= 4);
}

function isMentorActionAllowed(user, session) {
	let mentorId = '' + user.mentor;
	let userId = '' + user._id;
	let sessionId = '' + session._id;

	return (
		(userId === sessionId)
		|| (mentorId === sessionId)
		|| (session.localRole === CONST.user.localRole.ADMIN)
	);
}

function isAdmin(user) {
	return user.localRole === CONST.user.localRole.ADMIN;
}