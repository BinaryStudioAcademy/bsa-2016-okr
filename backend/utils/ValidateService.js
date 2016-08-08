var mongoose = require('mongoose');

module.exports = {
	isCorrectId: isCorrectId,
	isEmpty: isEmpty,
	isArray: isArray
};

function isCorrectId(id) {
	var id = '' + id.trim();
	
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