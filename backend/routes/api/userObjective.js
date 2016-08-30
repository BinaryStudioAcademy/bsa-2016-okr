const router = require('express').Router();
const adminOnly = require('../adminOnly');
const repository = require('../../repositories/userObjective');
const session = require('../../config/session');
const service = require('../../services/userObjective');
const ValidateService = require('../../utils/ValidateService');
const isCorrectId = ValidateService.isCorrectId;
const isEmpty = ValidateService.isEmpty;

// TODO: Body validation and separate logic for adding by templateId and new
// NOT ready yet!
router.post('/', (req, res, next) => {
	var title = req.body.title || '';
	//var description = req.body.description || '';
	//var keyResults = req.body.keyResults || [];
	var category = req.body.category || '';
	var userId = req.session._id || '';
	var creator = req.session._id || '';
	var quarterId = req.body.quarterId || '';
/*
	keyResults.forEach((keyResult) => {
		keyResult.difficulty = ValidateService.getValidDifficulty(keyResult.difficulty || '');
	});

	var isKeyResultsInvalid = keyResults.some((keyResult) => {
		return !ValidateService.isObject(keyResult)
		|| ValidateService.isEmpty(keyResult.title)
	});
*/
	if( isEmpty(title) || !isCorrectId(category))

	{
		return res.badRequest();
	}
/*
	var keyResultsF = keyResults.map((item) => {
		var keyResult = {
			title: item.title,
			difficulty: item.difficulty,
			creator: req.session._id,
			isApproved: true,
			isDeleted: false
		};

		return keyResult;
	});
*/
	var data = {
		title: title,
		description: '',
		category: category,
		creator: creator,
		keyResults: [],
		isApproved: true,
		isDeleted: false
	};

	return service.add(data, quarterId, res.callback)
});

router.get('/me/', (req, res, next) => {
	return repository.getByUserIdPopulate(req.session._id, res.callback);
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

router.post('/:id/keyresult/', (req, res, next) => {
	let objectiveId = req.body.objectiveId || '';
	let userId = req.session._id;
	let isAdmin = req.session.isAdmin;
	let title = req.body.title || '';
	let keyResultId = req.body.keyResultId || '';

	title = title.trim();
	
	if(!isCorrectId(objectiveId)
	|| (isEmpty(title) && isEmpty(keyResultId))
	|| (!isEmpty(keyResultId) && !isCorrectId(keyResultId))) {
		return res.badRequest();
	}

	let data = {
		userId: userId,
		objectiveId: objectiveId,
		keyResultId: keyResultId,
		keyResultTitle: title,
		isAdmin: isAdmin
	};

	service.addKeyResult(data, res.callback);
});

router.put('/:id/keyresult/score', (req, res, next) => {
	console.log('On server in route ', '/:id/keyresult/score');
	let userId = req.session._id;
	let objectiveId = req.params.id || '';
	let keyResultId = req.body.keyResultId || '';
	let score = req.body.score || '';

	score = Number.parseFloat(score);

	if(!isCorrectId(objectiveId)
	|| !isCorrectId(keyResultId)
	|| Number.isNaN(score)) {
		return res.badRequest();
	}

	score = Number.parseFloat(score.toFixed(1));
	console.log(score);

	if (score < 0 || score > 1) {
		return res.badRequest('Score should be from 0.1 to 1.0');
	}

	service.setScoreToKeyResult(userId, objectiveId, keyResultId, score, res.callback);
});

router.get('/:id', (req, res, next) => {
	var id = req.params.id;

	if(!isCorrectId(id)) {
		return res.badRequest();
	};

	return repository.getById(id, res.callback);
});

// TODO: Body validation
router.put('/:id', (req, res, next) => {
	var id = req.params.id;
	var body = req.body;

	if(!isCorrectId(id)) {
		return res.badRequest();
	};

	return service.update(session._id, id, body, res.callback);
});

router.delete('/:id', (req, res, next) => {
	var id = req.params.id;

	if(!isCorrectId(id)) {
		return res.badRequest();
	};

	return service.delete(session._id, id, res.callback);
});

module.exports = router;
