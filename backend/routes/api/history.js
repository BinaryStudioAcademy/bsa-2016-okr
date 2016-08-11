const router = require('express').Router();
const repository = require('../../repositories/history');
const session = require('../../config/session');
const ValidateService = require('../../utils/ValidateService');
const adminOnly = require('../adminOnly');

router.get('/', (req, res, next) => {
	repository.getAll(res.callback);
});

router.post('/', (req, res, next) => {
	repository.add(req.body, res.callback);
});

router.get('/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	repository.getById(id, res.callback);
});

router.get('/user/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	repository.getByAuthorId(id, res.callback);
});
module.exports = router;
