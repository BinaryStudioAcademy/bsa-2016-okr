const router = require('express').Router();
const adminOnly = require('../adminOnly');
const repository = require('../../repositories/objective');
const service = require('../../services/objective');
const ValidateService = require('../../utils/ValidateService');
const isEmpty = ValidateService.isEmpty;
const isValidYear = ValidateService.isValidYear;
const isValidQuarter = ValidateService.isValidQuarter;
const isCorrectId = ValidateService.isCorrectId;
const isString = ValidateService.isString;
const HelpService = require('../../utils/HelpService');
const getValidDifficulty = HelpService.getValidDifficulty;

router.get('/', (req, res, next) => {
	return service.getAll(res.callback);
});

 router.get('/notApproved/', (req, res, next) => {
 	return repository.getAllNotApproved(res.callback);
 });

router.get('/deleted', (req, res, next) => {
	return repository.getAllDeletedPopulate(res.callback);
});

router.post('/', adminOnly, (req, res, next) => {

	var title = req.body.title || '';
	var description = req.body.description || '';
	var category = req.body.category || '';
	var keyResults = req.body.keyResults || [];

	keyResults.forEach((keyResult) => {
		keyResult.difficulty = getValidDifficulty(keyResult.difficulty || '');
	});

	var isKeyResultsInvalid = keyResults.some((keyResult) => {
		return !ValidateService.isObject(keyResult)
		|| isEmpty(keyResult.title)
	});

	if( isEmpty(title)
		|| isEmpty(description)
		|| isEmpty(keyResults)
		|| !isCorrectId(category)
		|| !ValidateService.isArray(keyResults)
		|| isKeyResultsInvalid)
	{
		return res.badRequest();
	}

	var objective = {
		title: title,
		description: description,
		category: category,
		creator: req.session._id,
		defaultKeyResults: [],
		isApproved: true,
		isDeleted: false
	}

	defaultKeyResults = keyResults.map((item) => {
		var keyResult = {
			title: item.title,
			difficulty: item.difficulty,
			creator: req.session._id,
			isApproved: true,
			isDeleted: false
		};

		return keyResult;
	});

	return service.add(req.session._id, objective, defaultKeyResults, res.callback);
});

// Objective autocomplete
router.get('/category/:categoryId/year/:year/quarter/:quarter/:title*?', (req, res, next) => {

	console.log('/category/:categoryId/:title*?');
	var title = req.params.title || '';
	var categoryId = req.params.categoryId || '';
	var year = req.params.year || '';
	var quarter = req.params.quarter || '';
	var userId = req.session._id;

	if(!isCorrectId(categoryId)
	|| isEmpty(year) || isEmpty(quarter)) {
		return res.badRequest('Not enough arguments');
	}

	year = Number.parseInt(year, 10);
	quarter = Number.parseInt(quarter, 10);

	if(Number.isNaN(year) || Number.isNaN(quarter)
	|| !isValidYear(year) || !isValidQuarter(quarter)) {
		return res.badRequest('Year or quarter in wrong format');
	}

	service.autocomplete(userId, categoryId, year, quarter, title, res.callback);
});

router.put('/updateWithoutValidation/:id', adminOnly,(req, res, next) => {

	var id = req.params.id;
	var body = req.body;

	if(!isCorrectId(id)) {
		return res.badRequest();
	};

	return repository.update(id, body, res.callback);
});

router.put('/:objectiveId/keyresult/:keyResultId/default/:flag', adminOnly, (req, res, next) => {
	var objectiveId = req.params.objectiveId;
	var keyResultId = req.params.keyResultId;
	var userId = req.session._id;
	var flag = req.params.flag;

	if(!isCorrectId(objectiveId)
	|| !isCorrectId(keyResultId)) {
		return res.badRequest();
	};

	flag = HelpService.stringToBoolean(flag);

	return service.setDefaultKeyResult(userId, objectiveId, keyResultId, flag, res.callback);
});

router.delete('/:id/:flag', adminOnly, (req, res, next) => {
	var id = req.params.id;
	var flag = req.params.flag;
	var deletedDate = new Date();
	var userId = req.session._id || '';

	if(!isCorrectId(id)
		|| !ValidateService.isStringBoolean(flag)) {
		return res.badRequest();
	};


	var body = {
		isDeleted: HelpService.stringToBoolean(flag),
		deletedDate: deletedDate,
		deletedBy: userId
	}

	return service.softDelete(userId, id, body, res.callback);
});

router.put('/:id', adminOnly, (req, res, next) => {
	var objectiveId = req.params.id;
	var title = req.body.title;
	var category = req.body.category;
	var description = req.body.description;
	var userId = req.session._id;

	if(!isCorrectId(objectiveId)) {
		return res.badRequest('Wrong objective id');
	}

	var isWrongBody = ( 
		(isEmpty(title) || !isString(title))
		&& (description == null || !isString(description))
		&& (
			isEmpty(category)
			|| !isString(category)
			|| !isCorrectId(category)
		)
	);

	if(isWrongBody) {
		return res.badRequest('Wrong request params')
	}

	var data = {};
	
	if(!isEmpty(title) && isString(title)) {
		data.title = title;
	}

	if(isString(description)) {
		data.description = description;
	}

	if(isString(category) && isCorrectId(category)) {
		data.category = category;
	}

	console.log('Validation passed');

	return service.update(userId, objectiveId, data, res.callback);
});

module.exports = router;