const router = require('express').Router();
const adminOnly = require('../adminOnly');
const ValidateService = require('../../utils/ValidateService');
const repository = require('../../repositories/userObjective');
const session = require('../../config/session');
const service = require('../../services/userObjective');

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
	if( ValidateService.isEmpty(title) || !ValidateService.isCorrectId(category))

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

router.get('/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	return repository.getById(id, res.callback);
});

// TODO: Body validation
router.put('/:id', (req, res, next) => {
	var id = req.params.id;
	var body = req.body;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	return service.update(session._id, id, body, res.callback);
});

router.delete('/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	return service.delete(session._id, id, res.callback);
});

module.exports = router;
