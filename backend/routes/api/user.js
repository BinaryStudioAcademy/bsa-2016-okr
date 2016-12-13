const router = require('express').Router();
const repository = require('../../repositories/user');
const service = require('../../services/user');
const ValidateService = require('../../utils/ValidateService');
const adminOnly = require('../adminOnly');
const quarterRepository = require('../../repositories/quarter');

const ObjectId = require('mongoose').Types.ObjectId;

router.get('/', (req, res, next) => {
	repository.getAllPopulate(res.callback);
});

router.get('/quarter', (req, res, next) => {
	return quarterRepository.getCurrentQuarter(res.callback)
});

router.post('/takeApprentice/:id', (req, res, next) => {
  var userId = req.session._id || '';
  var apprenticeId = req.params.id || '';
	var userLocalRole = req.session.localRole || '';
  service.takeApprentice(userId, apprenticeId, userLocalRole, res.callback);
});

router.post('/removeApprentice/:id', (req, res, next) => {
  var userId = req.session._id || '';
  var apprenticeId = req.params.id || '';
	var userLocalRole = req.session.localRole || '';
  service.removeApprentice(userId, apprenticeId, userLocalRole, res.callback);
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

router.get('/autocomplete', (req, res, next) => {
	var userName = req.query.name;

	if (ValidateService.isEmpty(userName)) {
		return res.badRequest();
	};

	return service.autocomplete(userName.trim().toLowerCase(), res.callback);
});

router.get('/me/', (req, res, next) => {
	var id = req.session._id;

	return service.getByIdWithQuarters(id, res.callback);
});

router.get('/mebasic/', (req, res, next) => {
	var id = req.session._id;

	return service.getByIdPopulate(id, res.callback);
});

router.get('/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	return service.getByIdWithQuarters(id, res.callback);
});

module.exports = router;
