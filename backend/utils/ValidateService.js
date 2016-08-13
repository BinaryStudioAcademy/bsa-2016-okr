var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

module.exports = {
	isCorrectId: isCorrectId,
	isEmpty: isEmpty,
	isArray: isArray,
	isObject: isObject,
	isValidDifficulty: isValidDifficulty,
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

function isValidDifficulty(value) {
	var difficulties = ['low', 'intermediate', 'high'];

  return difficulties.some((difficulty) => {
  	return value.indexOf(difficulty) !== -1;
  });
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
