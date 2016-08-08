const router = require('express').Router();
const repository = require('../../repositories/objective');
const dbCallback = require('./response');
const session = require('../../config/session');
const userMentorRepository = require('../../repositories/userMentor');

router.get('/', (req, res, next) => {
	return repository.getAll(res.callback);
});

// Admin ONLY
router.get('/deleted/', (req, res, next) => {
	if(!session.isAdmin) {
		return res.forbidden();
	}

	return repository.getAllDeleted(res.callback);
});

router.get('/:id', (req, res, next) => {
	return repository.getById(req.params.id, res.callback);
});

router.post('/', (req, res, next) => {
	if(!session.isAdmin) {
		return res.forbidden();
	}

	var title = req.body.title.trim();

	var data = {
		createdBy: session._id,
		title: title,	
		cheers: [],
		views: [],
		forks: [],
		isApproved: true,
		isDeleted: false
	}

	return repository.add(data, res.callback);
});

router.post('/user/:id', (req, res, next) => {
	var id = req.params.id;

	if(id !== session._id && !userMentorRepository.checkUserMentor(id, session._id)) {
		return res.forbidden();
	}

	return repository.add(req.body, dbCallback(res));
});

router.put('/:id', (req, res, next) => {
	repository.update(req.params.id, req.body, dbCallback(res));
});

router.get('/user/:id', (req, res, next) => {
	repository.getByUserId(req.params.id, dbCallback(res));
});

router.get('/title/:title', (req, res, next) => {
	repository.getAllApprovedByTitle(req.params.title, dbCallback(res));
});

module.exports = router;