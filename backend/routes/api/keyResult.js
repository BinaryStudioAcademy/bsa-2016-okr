const router = require('express').Router();
const repository = require('../../repositories/keyResult');
const service = require('../../services/keyResult');
const adminOnly = require('../adminOnly');
const ValidateService = require('../../utils/ValidateService');
const isEmpty = ValidateService.isEmpty;
const isCorrectId = ValidateService.isCorrectId;
const HelpService = require('../../utils/HelpService');
const KeyResultHelpService = require('../../utils/KeyResultHelpService');
const getValidDifficulty = KeyResultHelpService.getValidDifficulty;
const UserObjectiveService = require('../../services/userObjective');

router.post('/', adminOnly, (req, res, next) => {
	var objectiveId = req.body.objectiveId || '';
	var userId = req.session._id;
	var title = req.body.title || '';
	var difficulty = req.body.difficulty || '';
	var isBacklog = req.body.isBacklog || false;

	title = title.trim();
	difficulty = getValidDifficulty(difficulty.trim());

	if(!isCorrectId(objectiveId)
	|| isEmpty(title)) {
		return res.badRequest();
	}

	var data = {
		creator: userId,
		isApproved: true,
		objectiveId: objectiveId,
		title: title,
		used: 0,
		isBacklog: isBacklog
	};

	if(!isEmpty(difficulty)) {
		data.difficulty = difficulty;
	}

	return service.add(userId, data, res.callback);
});

router.get('/notApproved/', adminOnly, (req, res, next) => {
	return UserObjectiveService.getNotApprovedKeyResults(res.callback);
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

router.put('/updateWithoutValidation/:id', adminOnly, (req, res, next) => {

 	var id = req.params.id;

 	if(!isCorrectId(id)) {
 		return res.badRequest();
 	};

 	repository.update(id, req.body, res.callback);
});

router.delete('/:id/:flag', adminOnly, (req, res, next) => {
	var id = req.params.id;
	var flag = req.params.flag;
	var deletedDate = new Date();
	var session = req.session;

	if(!isCorrectId(id)
	|| !ValidateService.isStringBoolean(flag)) {
		return res.badRequest();
	};

	var data = {
		isDeleted: HelpService.stringToBoolean(flag),
		deletedDate: deletedDate,
		deletedBy: session._id
	}

	return service.softDelete(session, id, data, res.callback);
});

router.put('/:id', adminOnly, (req, res, next) => {
 	var userId = req.session._id
 	var keyResultId = req.params.id;
 	var title = req.body.title || '';
 	var difficulty = req.body.difficulty || '';

 	title = title.trim();
 	difficulty = getValidDifficulty(difficulty.trim());

 	if(!isCorrectId(keyResultId)
 	|| (isEmpty(title) && isEmpty(difficulty))) {
 		return res.badRequest();
 	};

 	var data = {};

 	if(!isEmpty(title)) {
 		data.title = title;
 	}

 	if(!isEmpty(difficulty)) {
 		data.difficulty = difficulty;
 	}

 	return service.update(userId, keyResultId, data, res.callback);
});

module.exports = router;
