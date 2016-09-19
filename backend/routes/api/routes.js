const router = require('express').Router();

const user = require('./user');
const objective = require('./objective');
const keyResult = require('./keyResult');
const category = require('./category');
const history = require('./history');
const role = require('./role');
const userObjective = require('./userObjective');
const stats = require('./stats');
const quarter = require('./quarter');

module.exports = function (app) {

	router.use('/user', user);
	router.use('/objective', objective);
	router.use('/keyResult', keyResult);
	router.use('/category', category);
	router.use('/role', role);
	router.use('/history', history);
	router.use('/userObjective', userObjective);
	router.use('/stats', stats);
	router.use('/quarters', quarter);
	router.use('/*', (req, res) => {
		return res.badRequest();
	});

	return router;
};
