const CONST = require('../../backend/config/constants');

const authOnly = require('./authOnly');
const response = require('./response');

module.exports = function(app) {

	const api = require('./api/routes')(app);

	if(CONST.isDeveloping || CONST.LOCAL_PROD) {
		app.use('/', response, authOnly);
		app.use('/api', api);
	} else {
		app.use('/okr/', response, authOnly);
		app.use('/okr/api', api);	
	}
};
