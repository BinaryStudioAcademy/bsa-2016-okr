const router = require('express').Router();
const repository = require('../../repositories/user');
const service = require('../../services/user');
const ValidateService = require('../../utils/ValidateService');
const adminOnly = require('../adminOnly');
const userMentorRepository = require('../../repositories/userMentor');

const ObjectId = require('mongoose').Types.ObjectId;

router.get('/', (req, res, next) => {
	repository.getAllPopulate(res.callback);
});

router.get('/quarter', (req, res, next) => {
	return service.getAll(res.callback)
});

router.put('/:id', (req, res, next) => {
	
	var id = req.params.id;

	repository.update(id, req.body, function(err, data){

		if (err) {
			console.log("Error!");
		}

		res.json(data);

	});

});

router.get('/me/', (req, res, next) => {
	var id = req.session._id;

	return service.getById(id, res.callback);
});

router.get('/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	return service.getById(id, res.callback);
});


// router.post('/', (req, res, next) => {
// 	service.add(session._id, req.body, res.callback);
// });

// router.put('/:id', (req, res, next) => {
// 	var id = req.params.id;

// 	if(!ValidateService.isCorrectId(id)) {
// 		return res.badRequest();
// 	};

// 	service.update(session._id, id, req.body, res.callback);
// });

// router.get('/me/:id', (req, res, next) => {
// 	var id = req.params.id;

// 	if(!ValidateService.isCorrectId(id)) {
// 		return res.badRequest();
// 	};

// 	if(session._id === id)
// 		service.getMe(id, res.callback)
// 	else res.forbidden();
// });

// router.put('/archive/:id', (req, res, next) => {
// 	var id = req.params.id;
// 	var objectiveId = req.body.objectiveId;

// 	if(ValidateService.isCorrectId(id) 
// 		&& ValidateService.isCorrectId(objectiveId))
// 	{
// 		return res.badRequest();
// 	};

// 	if(!ValidateService.isCorrectId(id)) {
// 		return res.badRequest();
// 	};

// 	if(!session._id === id && !session.isAdmin 
// 		&& !userMentorRepository.checkUserMentor(id, session._id))
// 	{
// 		return res.forbidden();
// 	};

// 	service.changeArchive(session._id, id, objectiveId, res.callback);

// })

// router.delete('/:id', adminOnly, (req, res, next) => {
// 	var id = req.params.id;

// 	if(!ValidateService.isCorrectId(id)) {
// 		return res.badRequest();
// 	};

// 	service.delete(session._id, id, res.callback);
// })

module.exports = router;