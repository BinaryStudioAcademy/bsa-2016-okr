const router = require('express').Router();
const adminOnly = require('../adminOnly');
const ValidateService = require('../../utils/ValidateService');
const repository = require('../../repositories/userObjective');
const session = require('../../config/session');
const service = require('../../services/userObjective');

router.post( '/', (req, res, next) => {
	var body = req.body;

	return service.add(session._id, body, res.callback)
})

router.get('/:id', (req, res, next) => {
	var id = req.params.id;
	
	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	return repository.getById(id, res.callback);
})

router.put('/:id', (req, res, next) => {
	var id = req.params.id;
	var body = req.body;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	return service.update(session._id, id, body, res.callback);
})

router.delete('/:id', (req, res, next) => {
	var id = req.params.id;
	
	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	return service.delete(session._id, id, res.callback);
})

module.exports = router;