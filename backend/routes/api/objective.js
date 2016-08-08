const router = require('express').Router();
const repository = require('../../repositories/objective');
const session = require('../../config/session');
const userMentorRepository = require('../../repositories/userMentor');
const service = require('../../services/objective');
const ValidateService = require('../../utils/ValidateService');

// Done
router.get('/', (req, res, next) => {
	return repository.getAll(res.callback);
});

router.post('/', (req, res, next) => {
	if(!session.isAdmin) {
		return res.forbidden();
	}

	var title = req.body.title;
	var description = req.body.description;
	var keys = req.body.keys || [];

	if( ValidateService.isEmpty(title) 
		|| ValidateService.isEmpty(description)
		|| !ValidateService.isArray(keys)) {
		return res.badRequest();
	}

	var data = {
		createdBy: session._id,
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

// Admin ONLY
// Done
router.get('/deleted/', (req, res, next) => {
	if(!session.isAdmin) {
		return res.forbidden();
	}

	return repository.getAllDeleted(res.callback);
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

router.post('/user/:id', (req, res, next) => {
	var id = req.params.id;

	if(id !== session._id && !userMentorRepository.checkUserMentor(id, session._id)) {
		return res.forbidden();
	}

	return repository.add(req.body, res.callback);
});

router.get('/user/:id', (req, res, next) => {
	return repository.getByUserId(req.params.id, res.callback);
});

router.get('/title/:title', (req, res, next) => {
	return service.autocomplete(req.params.title, res.callback);
});

module.exports = router;