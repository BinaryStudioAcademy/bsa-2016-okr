const router = require('express').Router();

const user = require('./user');
const objective = require('./objective');
const key = require('./key');
const comment = require('./comment');
const category = require('./category');
const plan = require('./plan');
const history = require('./history');
const userMentor = require('./userMentor');
const role = require('./role');

module.exports = function(app) {
	
	router.use('/user', user);
	router.use('/objective', objective);
	router.use('/key', key);
	router.use('/comment', comment);
	router.use('/category', category);
	router.use('/plan', plan);
	router.use('/history', history);
	router.use('/userMentor', userMentor);
	router.use('/role', role);
	router.use('/*', (req, res) => {
		return res.badRequest();
	});

	return router;
};
