const router = require('express').Router();
const adminOnly = require('../adminOnly');
const repository = require('../../repositories/objective');
const userMentorRepository = require('../../repositories/userMentor');
const service = require('../../services/objective');
const ValidateService = require('../../utils/ValidateService');
const cloneObjective = require('../../services/cloneObjective');

// Done
router.get('/', (req, res, next) => {
	return repository.getAll(res.callback);
});

// Done
router.post('/', adminOnly, (req, res, next) => {
	var title = req.body.title;
	var description = req.body.description;
	var keys = req.body.keys || [];

	var isKeysInvalid = keys.some((key) => {
		return !ValidateService.isObject(key)
		|| ValidateService.isEmpty(key.title)
		|| ValidateService.isEmpty(key.difficulty)
		|| !ValidateService.isValidDifficulty(key.difficulty);
	});

	if( ValidateService.isEmpty(title)
		|| ValidateService.isEmpty(description)
		|| !ValidateService.isArray(keys)
		|| isKeysInvalid)
	{
		return res.badRequest();
	}

	var objective = {
		createdBy: req.session._id,
		title: title,
		description: description,
		keys: [],
		cheers: [],
		views: [],
		forks: 0,
		isApproved: true,
		isDeleted: false
	}

	keys = keys.map((item) => {
		var key = {
			title: item.title,
			difficulty: item.difficulty,
			forks: 0,
			isApproved: true,
			isDeleted: false
		};

		return key;
	});

	return service.add(objective, keys, res.callback);
});

router.post('/user/:id', (req, res, next) => {
	var id = req.params.id;

	if(id !== req.session._id && !userMentorRepository.checkUserMentor(id, req.session._id)) {
		return res.forbidden();
	}

	return repository.add(req.body, res.callback);
});

router.get('/user/:id', (req, res, next) => {
	return repository.getByUserId(req.params.id, res.callback);
});

router.get('/title/:title', (req, res, next) => {
	var title = req.params.title;

	if(ValidateService.isEmpty(title)) {
		return res.badRequest();
	}

	return service.autocomplete(req.params.title, res.callback);
});

// Done
router.get('/deleted/', adminOnly, (req, res, next) => {
	return repository.getAllDeleted(res.callback);
});

// Done
router.get('/notApproved/', adminOnly, (req, res, next) => {
	return repository.getAllNotApproved(res.callback);
});

// to clone template objective with keys to the user, id - objective id
router.get('/clone/:id', (req, res, next) => {
	if(!ValidateService.isCorrectId(req.params.id)
		|| !ValidateService.isCorrectId(req.session._id)){
	return res.badRequest();
	}
	var data = {
		objectiveId: req.params.id,
		userId: req.session._id
	}
	cloneObjective.clone(data, res.callback);
});

// Done
router.get('/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	}

	return repository.getById(id, res.callback);
});

router.put('/:id', (req, res, next) => {
	return repository.update(req.params.id, req.body, res.callback);
});

module.exports = router;
