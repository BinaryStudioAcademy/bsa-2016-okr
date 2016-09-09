const router = require('express').Router();
const repository = require('../../repositories/keyResult');
const service = require('../../services/keyResult');
const adminOnly = require('../adminOnly');
const ValidateService = require('../../utils/ValidateService');
const isEmpty = ValidateService.isEmpty;
const isCorrectId = ValidateService.isCorrectId;
const HelpService = require('../../utils/HelpService');
const getValidDifficulty = HelpService.getValidDifficulty;

router.post('/', adminOnly, (req, res, next) => {
	let objectiveId = req.body.objectiveId || '';
	let userId = req.session._id;
	let title = req.body.title || '';
	let difficulty = req.body.difficulty || '';

	title = title.trim();
	difficulty = getValidDifficulty(difficulty.trim());
	
	if(!isCorrectId(objectiveId)
	|| isEmpty(title) 
	|| isEmpty(difficulty)) {
		return res.badRequest();
	}

	let data = {
		creator: userId,
		isApproved: true,
		difficulty: difficulty,
		objectiveId: objectiveId,
		title: title,
		used: 0,
	};

	return service.add(userId, data, res.callback);
});

router.get('/notApproved/', adminOnly, (req, res, next) => {
 	return repository.getAllNotApproved(res.callback);
});

router.get('/objective/:objectiveId/:title*?', (req, res, next) => {
	var title = req.params.title;
	var objectiveId = req.params.objectiveId;

	if (!isCorrectId(objectiveId)) {
		return res.badRequest();
	}

	return service.autocomplete(title, objectiveId, res.callback);
});

router.get('/deleted', adminOnly, (req, res, next) => {
	return repository.getAllDeletedPopulate(res.callback);
});

router.put('/myupdate/:id', (req, res, next) => {

 	var id = req.params.id;

 	if(!isCorrectId(id)) {
 		return res.badRequest();
 	};

 	repository.update(id, req.body, res.callback);
});

router.delete('/:id/:flag', adminOnly, (req, res, next) => {
	var id = req.params.id;
	let flag = req.params.flag;
	let deletedDate = new Date();
	let userId = req.session._id

	if(!isCorrectId(id)
	|| !ValidateService.isStringBoolean(flag)) {
		return res.badRequest();
	};

	let data = {
		isDeleted: HelpService.stringToBoolean(flag),
		deletedDate: deletedDate,
		deletedBy: userId
	}

	return service.softDelete(userId, id, data, res.callback);
});

router.put('/:id', adminOnly, (req, res, next) => {
 	let userId = req.session._id
 	let keyResultId = req.params.id;
 	let title = req.body.title || '';
 	let difficulty = req.body.difficulty || '';

 	title = title.trim();
 	difficulty = getValidDifficulty(difficulty.trim());

 	if(!isCorrectId(keyResultId)
 	|| (isEmpty(title) && isEmpty(difficulty))) {
 		return res.badRequest();
 	};

 	let data = {};

 	if(!isEmpty(title)) {
 		data.title = title;
 	}

 	if(!isEmpty(difficulty)) {
 		data.difficulty = difficulty;
 	}

 	return service.update(userId, keyResultId, data, res.callback);
});

module.exports = router;