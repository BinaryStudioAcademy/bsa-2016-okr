const router = require('express').Router();
const ValidateService = require('../../utils/ValidateService');
const isCorrectId = ValidateService.isCorrectId;

const service = require('../../services/stats');

// router.get('/users', (req, res, next) => {
// 	var sort = req.query.sort === "desc" ? 1 : -1;
// 	var limit = req.query.limit || 5;
	
// 	var limit = Number.parseInt(limit);

// 	if(Number.isNaN(limit)) {
// 		return res.badRequest('Limit param should be a number');
// 	}

// 	if(limit > 1000) {
// 		limit = 1000;
// 	}

// 	if(limit <= 0) {
// 		limit = 5;
// 	}

// 	service.getAllUsersStats(sort, limit, res.callback);
// });

router.get('/users', (req, res, next) => {
	var sort = req.query.sort === "desc" ? 1 : -1;
	var limit = req.query.limit || 5;
	var userId = req.query.id;

	var limit = Number.parseInt(limit);

	if(Number.isNaN(limit)) {
		return res.badRequest('Limit param should be a number');
	}

	if(!isCorrectId(userId)) {
		res.badRequest('Wrong user ID');
	}

	if(limit > 1000) {
		limit = 1000;
	}

	if(limit <= 0) {
		limit = 5;
	}
 	console.log("++++++++++++++++++++++++++++++"+userId);
	service.getAllUsersStatsWithQuarters(sort, limit, userId, res.callback);
});

router.get('/users/:id', (req, res, next) => {
	var userId = req.params.id;

	if(!isCorrectId(userId)) {
		res.badRequest('Wrong user ID');
	}

	service.getUserStatsById(userId, res.callback);
});

router.get('/progress', (req, res, next) => {
	service.getProgressStats(res.callback);
});

router.get('/categories', (req, res, next) => {
	service.getCategoriesStats(res.callback);
});

router.get('/keyresults', (req, res, next) => {
	service.getKeyResultsStats(res.callback);
});

module.exports = router;
