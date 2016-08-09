const router = require('express').Router();
const repository = require('../../repositories/key');
const service = require('../../services/key');
const ValidateService = require('../../utils/ValidateService');

router.post('/', (req, res, next) => {
	repository.add(req.body, res.callback);
});

router.put('/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};
	
	repository.update(id, req.body, res.callback);
});

router.delete('/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};
	
	repository.delete(id, res.callback);
});

router.get('/objective/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	repository.getByObjId(id, res.callback);
});


router.get('/title/:title', (req, res, next) => {
	service.autocomplete(req.params.title, res.callback);
});

router.put('/:id/approve', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};
	
	service.changeApprove(id, res.callback);
});


module.exports = router;