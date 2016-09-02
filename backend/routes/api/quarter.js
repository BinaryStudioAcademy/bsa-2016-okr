const router = require('express').Router();
const repository = require('../../repositories/quarter');
const service = require('../../services/quarter');
const ValidateService = require('../../utils/ValidateService');
const adminOnly = require('../adminOnly');

router.post('/',  (req, res, next) => {
	return repository.add(req.body, res.callback);
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

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	return repository.update(id, req.body, res.callback);
})


module.exports = router;