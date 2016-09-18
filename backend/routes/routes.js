const authOnly = require('./authOnly');
const response = require('./response');

module.exports = function(app) {

	const api = require('./api/routes')(app);
	
	app.use('/', response, authOnly);
	app.use('/api', api);
};
