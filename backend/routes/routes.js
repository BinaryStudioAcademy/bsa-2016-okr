const authOnly = require('./authOnly');
const response = require('./response');

const checkToken = require('../../middleware/checkToken');


module.exports = function(app) {

	const api = require('./api/routes')(app);
	
	app.use('/', response, authOnly);
	app.use('/api', api);
};
