const router = require('express').Router();
const adminOnly = require('../adminOnly');
const repository = require('../../repositories/userObjective');
const service = require('../../services/userObjective');

const ValidateService = require('../../utils/ValidateService');
const HelpService = require('../../utils/HelpService');
const isCorrectId = ValidateService.isCorrectId;
const isEmpty = ValidateService.isEmpty;
const CONST = require('../../config/constants');

router.post('/', (req, res, next) => {
	var title = req.body.title || '';
	var categoryId = req.body.categoryId || '';
	var quarterId = req.body.quarterId || '';
	// Not necessary field
	var objectiveId = req.body.objectiveId || '';
	var userId = req.body.userId;
	var isApproved = false;
	var session = req.session;

	if(isEmpty(title) || !isCorrectId(categoryId)
	|| !isCorrectId(quarterId)) {
		return res.badRequest();
	}

	return service.add(session, userId, categoryId, quarterId, objectiveId, title, isApproved, res.callback)
});

router.put('/movetobacklog/:objectiveId', (req, res) => {
	var objectiveId = req.params.objectiveId;
	var userId = req.body.userId;
	var session = req.session;
	return service.moveToBacklog(session, objectiveId, userId, res.callback);
});

router.post('/me/backlog', (req, res, next) => {
	var title = req.body.title || '';
	var categoryId = req.body.categoryId || '';
	// Not necessary field
	var objectiveId = req.body.objectiveId || '';
	var userId = req.body.userId;
	var isApproved = false;
	var session = req.session;

	if (isEmpty(title) || !isCorrectId(categoryId)) {
		return res.badRequest();
	}

	return service.addToBacklog(session, userId, categoryId, objectiveId, title, isApproved, res.callback)
});

router.put('/me/backlog/:objectiveId', (req, res, next) => {
	var objectiveId = req.params.objectiveId || '';
	var userId = req.body.userId || req.session._id;
	var session = req.session;
	var quarterInd = req.body.quarterInd;
	if (!isCorrectId(objectiveId) || !isCorrectId(userId) || !ValidateService.isValidQuarter(quarterInd)) {
		return res.badRequest();
	}

	return service.addToQuarter(session, userId, objectiveId, quarterInd, res.callback)
});

router.post('/clone', (req, res, next) => {
	var userObjectiveId = req.body.userObjectiveId || '';
	var quarterId = req.body.quarterId || '';
	var session = req.session;

	if(!isCorrectId(userObjectiveId)
	|| !isCorrectId(quarterId)) {
		return res.badRequest('Wrong input params');
	}

	service.cloneUserObjective(session, userObjectiveId, quarterId, res.callback);
});

router.get('/me/', (req, res, next) => {
	return repository.getByUserIdPopulate(req.session._id, res.callback);
});

router.get('/:userId/backlog/:categoryId*', (req, res, next) => {
	if (!isCorrectId(req.params.userId)) {
		return res.badRequest('Wrong user id');
	}

	var params = {
		categoryId: req.params.categoryId,
		userId: req.params.userId
	};

	return service.getFromBacklog(params, res.callback);
});

router.get('/me/deleted', (req, res, next) => {

	return repository.getDeletedByUserIdPopulate(req.session._id, res.callback);
});


router.get('/user/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	}

	return repository.getByUserIdPopulate(id, res.callback);
});

// Soft delete key result from objective
router.delete('/:id/keyResult/:keyResultId/:flag', (req, res, next) => {

	var flag = req.params.flag || '';
	var userObjectiveId = req.params.id || '';
	var keyResultId = req.params.keyResultId || '';
	var session = req.session;

	if(!ValidateService.isCorrectId(userObjectiveId)
			|| !ValidateService.isStringBoolean(flag)
			|| !ValidateService.isCorrectId(keyResultId)) {
		return res.badRequest();
	}

	flag = HelpService.stringToBoolean(flag);

	return service.softDeleteKeyResult(session, userObjectiveId, keyResultId, flag, res.callback);
});

router.post('/:id/keyresult/', (req, res, next) => {
	var userObjectiveId = req.params.id || '';
	var session = req.session;
	var userId = req.body.userId;
	var title = req.body.title || '';
	var keyResultId = req.body.keyResultId || '';
	var isApproved = false;

	var keyResultTitle = title.trim();

	if (!isCorrectId(userObjectiveId)
		|| (isEmpty(title) && isEmpty(keyResultId))
		|| (!isEmpty(keyResultId) && !isCorrectId(keyResultId))) {
		return res.badRequest();
	}

	// if (req.session.localRole === CONST.user.localRole.ADMIN) {
	// 	isApproved = true;
	// }

	service.addKeyResult(session, userId, userObjectiveId, keyResultId, keyResultTitle, isApproved, res.callback);
});

router.put('/:id/keyresult/score', (req, res, next) => {
	var objectiveId = req.params.id || '';
	var userId = req.body.userId;
	var keyResultId = req.body.keyResultId || '';
	var score = req.body.score || '';
	var session = req.session;

	score = Number.parseFloat(score);

	if(!isCorrectId(objectiveId)
	|| !isCorrectId(keyResultId)
	|| Number.isNaN(score)) {
		return res.badRequest();
	}

	score = Number.parseFloat(score.toFixed(1));

	if (score < 0 || score > 1) {
		return res.badRequest('Score should be from 0.1 to 1.0');
	}

	service.setScoreToKeyResult(session, userId, objectiveId, keyResultId, score, res.callback);
});

router.put('/:id/keyresult/titleanddifficulty', (req, res, next) => {
	var userId = req.session._id;
	var objectiveId = req.params.id || '';
	var keyResultId = req.body.keyResultId || '';
	var title = req.body.title || '';
	var difficulty = req.body.difficulty || '';

	if(!isCorrectId(objectiveId)
			|| !isCorrectId(keyResultId)) {
		return res.badRequest();
	}

	service.setTitleAndDifficultyToKeyResult(userId, objectiveId, keyResultId, title, difficulty, res.callback);
});

router.delete('/:id/:flag', (req, res, next) => {
	var flag = req.params.flag || '';
	var userObjectiveId = req.params.id || '';
	var session = req.session;

	if(!ValidateService.isCorrectId(userObjectiveId)
			|| !ValidateService.isStringBoolean(flag)) {
		return res.badRequest();
	}

	flag = HelpService.stringToBoolean(flag);

	return service.softDelete(session, userObjectiveId, flag, res.callback);
});

router.get('/:id', (req, res, next) => {
	var id = req.params.id;

	if(!isCorrectId(id)) {
		return res.badRequest();
	};

	return repository.getById(id, res.callback);
});

router.put('/:id', (req, res, next) => {
	var userObjectiveId = req.params.id;
	var title = req.body.title || '';
	var description = req.body.description || '';
	var session = req.session;

	title = title.trim();
	description = description.trim();

	if(!ValidateService.isCorrectId(userObjectiveId)
	|| (isEmpty(title) && isEmpty(description))) {
		return res.badRequest();
	};

	var data = {};

	if(!isEmpty(title)) {
		data.title = title;
	}

	if(!isEmpty(description)) {
		data.description = description;
	}

	return service.update(session, userObjectiveId, data, res.callback);
});


router.put('/:id/archive/:flag', adminOnly, (req, res, next) => {
	var id = req.params.id;
	var flag = req.params.flag === "true" ? true : false;

	if(!isCorrectId(id)) {
		return res.badRequest();
	};


	return service.changeArchiveStatus(req.session._id, id, flag, res.callback);
})


//this is temporary  solution
router.put('/updateWithoutValidation/:id',  (req, res, next) => {

	var id = req.params.id;
	var body = req.body;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	return service.updateWithoutValidation(req.session._id, id, body, res.callback)
	//return repository.update(id, body, res.callback);
});

module.exports = router;
