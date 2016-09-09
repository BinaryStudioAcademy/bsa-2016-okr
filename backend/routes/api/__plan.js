const router = require('express').Router();
const repository = require('../../repositories/plan');
const ValidateService = require('../../utils/ValidateService');
const service = require('../../services/plan')
const adminOnly = require('../adminOnly');

router.get('/', (req, res, next) => {
	repository.getAll(res.callback);
});

router.post('/', (req, res, next) => {
	var userId = req.body.userId || req.session.id;
	var title = req.body.title.trim() || '';
	var isDeleted = req.body.isDeleted || false;
	var objectives = req.body.objectives || {"1": [], "2": [], "3": [], "4": []};

	function objectivesValidation (obj = {}){
		var isValid = true;
		var quartals = ["1", "2", "3", "4"];

		for (var key in obj) {
			if( quartals.indexOf(key) === -1){
				console.log("quartals incorrect " + key);
				return false;
			};
			
			if(!ValidateService.isArray(obj[key])){
				console.log( key);
				console.log("array incorrect ");
				return false;
			}

			obj[key].forEach( function(element, index) {
				if(!ValidateService.isCorrectId(element)){
					console.log("validate id incorrect " + element + " i: " + index);
					isValid = false;
				}
			});
		};

		return isValid;
	};

	if(! ValidateService.isCorrectId(userId)
		|| ValidateService.isEmpty(title)
		|| !(typeof (isDeleted) === 'boolean')
		|| !objectivesValidation(objectives)) {
		return res.badRequest();
	}

	var plan = {
		userId,
		title,
		isDeleted,
		objectives
	};

	service.add(req.session._id, plan, res.callback);
});

router.get('/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	repository.getById(id, res.callback);
});

router.put('/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	service.update(req.session._id, id, req.body, res.callback);
});

router.delete('/:id', adminOnly, (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	service.delete(req.session._id, id, res.callback);
});

router.get('/user/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	repository.getByUserId(id, res.callback);
});

module.exports = router;
