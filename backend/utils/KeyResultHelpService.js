var CONST = require('../config/constants');

module.exports = {
  getDifficultyNumber: getDifficultyNumber,
  getNumberDifficulty: getNumberDifficulty,
  getValidDifficulty: getValidDifficulty,
};

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
