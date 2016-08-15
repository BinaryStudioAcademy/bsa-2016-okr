const router = require('express').Router();
const repository = require('../../repositories/key');
const service = require('../../services/key');
const ValidateService = require('../../utils/ValidateService');
const adminOnly = require('../adminOnly');
const session = require('../../config/session');

router.post('/', (req, res, next) => {
	return service.add(session._id, key, res.callback);
});

router.put('/:id', (req, res, next) => {
	var id = req.params.id;
	
	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};
	
	return service.update(session._id, id, req.body, res.callback);
});

router.delete('/:id', adminOnly, (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};
	
	return service.delete(session._id, id, res.callback);
});

// router.get('/objective/:id', (req, res, next) => {
// 	var id = req.params.id;

// 	if(!ValidateService.isCorrectId(id)) {
// 		return res.badRequest();
// 	};

// 	return repository.getByObjId(id, res.callback);
// });


router.get('/title/:title', (req, res, next) => {
	var title = req.params.title.trim();
	if(ValidateService.isEmpty(title)){
		return res.badRequest();
	};

	return service.autocomplete(title, res.callback);
});

router.put('/:id/approve', adminOnly, (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};
	
	return service.changeApprove(session._id, id, res.callback);
});


module.exports = router;