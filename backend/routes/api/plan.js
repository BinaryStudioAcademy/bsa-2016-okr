const router = require('express').Router();
const repository = require('../../repositories/plan');
const ValidateService = require('../../utils/ValidateService');
const service = require('../../services/plan')
const adminOnly = require('../adminOnly');
const session = require('../../config/session');

router.get('/', (req, res, next) => {
	repository.getAll(res.callback);
});

router.post('/', (req, res, next) => {
	service.add(session._id, req.body, res.callback);
});

router.get('/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	repository.getById(id, res.callback);
});

router.put('/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	service.update(session._id, id, req.body, res.callback);
});

router.delete('/:id', adminOnly, (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	service.delete(session._id, id, res.callback);
});

router.get('/user/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	repository.getByUserId(id, res.callback);
});

module.exports = router;
