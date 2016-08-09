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

router.post('/', adminOnly, (req, res, next) => {
	var title = req.body.title;
	var description = req.body.description;
	var keys = req.body.keys || [];

	if( ValidateService.isEmpty(title)
		|| ValidateService.isEmpty(description)
		|| !ValidateService.isArray(keys)) 
	{
		return res.badRequest();
	}

	var data = {
		createdBy: req.session._id,
		title: title,
		description: description,
		keys: keys,
		cheers: [],
		views: [],
		forks: [],
		isApproved: true,
		isDeleted: false
	}

	return service.add(data, res.callback);
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
	console.log(req.params.id);
	var obj = {};
	cloneObjective.clone(req.params.id, obj, res.callback);
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
