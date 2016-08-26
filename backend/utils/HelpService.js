var CONST = require('../config/constants');

module.exports = {
	stringToBoolean: stringToBoolean
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