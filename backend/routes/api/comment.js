const router = require('express').Router();
const repository = require('../../repositories/comment');
const service = require('../../services/comment');
const ValidateService = require('../../utils/ValidateService');
const adminOnly = require('../adminOnly');
const session = require('../../config/session');

router.post('/', (req, res, next) => {
	//repository.create(req.body, res.callback);
	//repository.getCount();
	service.add(session._id, req.body, res.callback);
});

router.get('/', (req, res, next) => {
	repository.getAll(res.callback);
});	

router.get('/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	repository.getById(id, res.callback);
});

router.delete('/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	service.delete(session._id, id, res.callback);
});

router.get('/objective/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	repository.getByObjId(id, res.callback);
});


module.exports = router;
