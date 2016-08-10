const router = require('express').Router();
const repository = require('../../repositories/plan');
const ValidateService = require('../../utils/ValidateService');

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

	repository.getById(req.params.id, res.callback);
});

router.put('/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	repository.update(req.params.id, req.body, res.callback);
});

router.delete('/:id',  (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	repository.delete(req.params.id, res.callback);
});

router.get('/user/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	repository.getByUserId(req.params.id, res.callback);
});

module.exports = router;
