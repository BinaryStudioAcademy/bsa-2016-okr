const router = require('express').Router();
const adminOnly = require('../adminOnly');
const ValidateService = require('../../utils/ValidateService');
const repository = require('../../repositories/userObjective');
const session = require('../../config/session');
const service = require('../../services/userObjective');

// TODO: Body validation and separate logic for adding by templateId and new
// NOT ready yet!
router.post('/', (req, res, next) => {
	var title = req.body.title;
	var description = req.body.description;
	var keyResults = req.body.keyResults;
	var userId = req.session._id;
	var creator = req.session._id;

	var data = {
		title: title,
		description: description,
		userId: userId,
		creator: creator,
		keyResults: keyResults
	};

	return service.add(req.session._id, data, res.callback)
});

router.get('/me/', (req, res, next) => {
	return repository.getByUserIdPopulate(req.session._id, res.callback);
});

router.get('/:id', (req, res, next) => {
	var id = req.params.id;
	
	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	return repository.getById(id, res.callback);
});

// TODO: Body validation
router.put('/:id', (req, res, next) => {
	var id = req.params.id;
	var body = req.body;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	return service.update(session._id, id, body, res.callback);
});

router.delete('/:id', (req, res, next) => {
	var id = req.params.id;
	
	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	return service.delete(session._id, id, res.callback);
});

module.exports = router;