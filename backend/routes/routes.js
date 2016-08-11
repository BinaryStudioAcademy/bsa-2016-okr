const auth = require('./auth');
const authOnly = require('./authOnly')
const response = require('./response');
const checkToken = require('../middleware/checkToken');

module.exports = function(app) {
	const api = require('./api/routes')(app);
	app.use('/', response, auth);
	app.use('/api', authOnly, api);
	app.use(checkToken);
	const me = require('../middleware/me')(app);
};
