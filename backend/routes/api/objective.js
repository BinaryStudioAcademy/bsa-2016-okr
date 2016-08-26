const router = require('express').Router();
const adminOnly = require('../adminOnly');
const repository = require('../../repositories/objective');
const userMentorRepository = require('../../repositories/userMentor');
const service = require('../../services/objective');
const cloneObjective = require('../../services/cloneObjective');
const session = require('../../config/session');
const ValidateService = require('../../utils/ValidateService');
const isEmpty = ValidateService.isEmpty;

router.get('/', (req, res, next) => {
	return service.getAll(res.callback);
});

router.post('/', adminOnly, (req, res, next) => {

	var title = req.body.title || '';
	var description = req.body.description || '';
	var category = req.body.category || '';
	var keyResults = req.body.keyResults || [];

	keyResults.forEach((keyResult) => {
		keyResult.difficulty = ValidateService.getValidDifficulty(keyResult.difficulty || '');
	});

	var isKeyResultsInvalid = keyResults.some((keyResult) => {
		return !ValidateService.isObject(keyResult)
		|| isEmpty(keyResult.title)
	});

	if( isEmpty(title)
		|| isEmpty(description)
		|| isEmpty(keyResults)
		|| !ValidateService.isCorrectId(category)
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

router.get('/category/:categoryId/:title*?', (req, res, next) => {
	var title = req.params.title;
	var categoryId = req.params.categoryId;

	if(!ValidateService.isCorrectId(categoryId)) {
		return res.badRequest();
	}

	return repository.autocomplete(title, categoryId, res.callback);
});

router.put('/:id', adminOnly, (req, res, next) => {
	let objectiveId = req.params.id;
	let title = req.body.title || '';
	let description = req.body.description || '';
	let userId = req.session._id;

	title = title.trim();
	description = description.trim();

	if(!ValidateService.isCorrectId(objectiveId)
	|| (isEmpty(title) && isEmpty(description))) {
		return res.badRequest();
	};

	let data = {};
	
	if(!isEmpty(title)) {
		data.title = title;
	}

	if(!isEmpty(description)) {
		data.description = description;
	}

	return service.update(userId, objectiveId, data, res.callback);
});

router.delete('/:id', adminOnly, (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	return service.delete(session._id, id, res.callback);
});

router.put('/softDelete/:id', adminOnly, (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	return repository.setToDeleted(id, res.callback);
});

// router.post('/me/', (req, res, next) => {
// 	var title = req.body.title || '';
// 	var description = req.body.description || '';
// 	var keys = req.body.keys || [];
// 	var assignedTo = req.body.assignedTo;
// 	var isApproved = false;

// 	// Validate assignedTo param
// 	// Should be correct ObjectId of user
// 	if(!assignedTo) {
// 		assignedTo = req.session._id;
// 	} else {
// 		if(!ValidateService.isCorrectId(assignedTo)) {
// 			return res.badRequest();
// 		}

// 		// If assignedTo is correct ObjectId,
// 		// but it doesn't equal to current userId
// 		// then check current user to be a mentor for assinedTo or admin
// 		if(assignedTo !== req.session._id
// 			&& ( !userMentorRepository.checkUserMentor(assignedTo, req.session._id) || !req.session.isAdmin) )
// 		{
// 			return res.forbidden();
// 		}
// 	}

// 	keys.forEach((key) => {
// 		key.difficulty = ValidateService.getValidDifficulty(key.difficulty);
// 	});

// 	var isKeysInvalid = keys.some((key) => {
// 		return !ValidateService.isObject(key)
// 		|| ValidateService.isEmpty(key.title)
// 		|| ValidateService.isEmpty(key.difficulty)
// 		|| !key.difficulty;
// 	});

// 	if( ValidateService.isEmpty(title)
// 		|| ValidateService.isEmpty(description)
// 		|| !ValidateService.isArray(keys)
// 		|| isKeysInvalid)
// 	{
// 		return res.badRequest();
// 	}

// 	if(req.session.isAdmin) {
// 		isApproved = true;
// 	}

// 	var objective = {
// 		createdBy: req.session._id,
// 		title: title,
// 		description: description,
// 		keys: [],
// 		cheers: [],
// 		views: [],
// 		forks: 1,
// 		isApproved: isApproved,
// 		isDeleted: false
// 	}

// 	keys = keys.map((item) => {
// 		var key = {
// 			title: item.title,
// 			difficulty: item.difficulty,
// 			forks: 1,
// 			isApproved: isApproved,
// 			isDeleted: false
// 		};

// 		return key;
// 	});

// 	return service.addToUser(objective, keys, assignedTo, res.callback);
// });

// router.post('/user/:id', (req, res, next) => {
// 	var id = req.params.id;

// 	if(id !== req.session._id && !userMentorRepository.checkUserMentor(id, req.session._id)) {
// 		return res.forbidden();
// 	}

// 	return repository.add(req.body, res.callback);
// });

// router.get('/user/:id', (req, res, next) => {
// 	return repository.getByUserId(req.params.id, res.callback);
// });

// router.get('/deleted/', adminOnly, (req, res, next) => {
// 	return repository.getAllDeleted(res.callback);
// });

// router.get('/notApproved/', adminOnly, (req, res, next) => {
// 	return repository.getAllNotApproved(res.callback);
// });

// to clone template objective with keys to the user, id - objective id
// router.get('/clone/:id', (req, res, next) => {
// 	if(!ValidateService.isCorrectId(req.params.id)
// 		|| !ValidateService.isCorrectId(req.session._id)){
// 	return res.badRequest();
// 	}
// 	var data = {
// 		objectiveId: req.params.id,
// 		userId: req.session._id
// 	}
// 	cloneObjective.clone(data, res.callback);
// });

// router.get('/:id', (req, res, next) => {
// 	var id = req.params.id;

// 	if(!ValidateService.isCorrectId(id)) {
// 		return res.badRequest();
// 	}

// 	return repository.getById(id, res.callback);
// });

// router.put('/:id', (req, res, next) => {
// 	return repository.update(req.params.id, req.body, res.callback);
// });

module.exports = router;
