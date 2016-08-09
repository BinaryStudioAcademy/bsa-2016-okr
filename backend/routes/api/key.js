const router = require('express').Router();
const repository = require('../../repositories/key');
const service = require('../../services/key')
const ValidateService = require('../../utils/ValidateService');

router.post('/', (req, res, next) => {
	repository.add(req.body, res.callback);
});

router.get('/objective/:id', (req, res, next) => {
	var id = req.params.id;

	if(id !== session._id && !userMentorRepository.checkUserMentor(id, session._id)) {
		return res.forbidden();
	};

	repository.getByObjId(id, res.callback);
});

router.put('/:id', (req, res, next) => {
	var id = req.params.id;

	if(id !== session._id && !userMentorRepository.checkUserMentor(id, session._id)) {
		return res.forbidden();
	};
	
	repository.update(id, req.body, res.callback);
});

router.get('/title/:title', (req, res, next) => {
	service.autocomplete(req.params.title, res.callback);
});

router.put('/:id/approve', (req, res, next) => {
	var id = req.params.id;

	if(id !== session._id && !userMentorRepository.checkUserMentor(id, session._id)) {
		return res.forbidden();
	};
	
	service.changeApprove(id, res.callback);
});

router.delete('/:id', (req, res, next) => {
	var id = req.params.id;

	if(id !== session._id && !userMentorRepository.checkUserMentor(id, session._id)) {
		return res.forbidden();
	};
	
	repository.delete(id, res.callback);
});

module.exports = router;