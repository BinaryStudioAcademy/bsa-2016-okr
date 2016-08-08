const user = require('./user');
const objective = require('./objective');
const key = require('./key');
const comment = require('./comment');
const category = require('./category');
const plan = require('./plan');
const history = require('./history');
const userMentor = require('./userMentor');
const response = require('./response');

module.exports = function(app) {
	app.use('/api/', response);
	app.use('/api/user', user);
	app.use('/api/objective', objective);
	app.use('/api/key', key);
	app.use('/api/comment', comment);
	app.use('/api/category', category);
	app.use('/api/plan', plan);
	app.use('/api/history', history);
	app.use('/api/userMentor', userMentor);
};
