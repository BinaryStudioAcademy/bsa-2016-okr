var mongoose = require('mongoose');

module.exports = {
	isCorrectId: isCorrectId,
	isEmpty: isEmpty,
	isArray: isArray,
	isObject: isObject,
	isValidDifficulty: isValidDifficulty
};

function isCorrectId(id) {
	var id = '' + id;

	id = id.trim();
	
	if(!id || !mongoose.Types.ObjectId.isValid(id)) {
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