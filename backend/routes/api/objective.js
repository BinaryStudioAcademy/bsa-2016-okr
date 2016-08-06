const router = require('express').Router();
const repository = require('../../repositories/objective');
const dbCallback = require('./response');
const session = require('../../config/session');
const userMentorRepository = require('../../repositories/userMentor');

router.get('/', (req, res, next) => {
	repository.getAll(dbCallback(res));
});

router.get('/:id', (req, res, next) => {
	repository.getById(req.params.id, dbCallback(res));
});

router.post('/', (req, res, next) => {
	if(!session.isAdmin) {
		var err = new Error('You are not allowed to do this');
		err.status = 403;
		return dbCallback(err);
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

	repository.add(data, dbCallback(res));
});

router.post('/user/:id', (req, res, next) => {
	var id = req.params.id;

	if(id !== session._id && !userMentorRepository.checkUserMentor(id, session._id)) {
		var err = new Error('You are not allowed to do this');
		err.status = 403;
		return dbCallback(err);
	}

	repository.add(req.body, dbCallback(res));
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