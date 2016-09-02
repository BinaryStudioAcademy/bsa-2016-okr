const router = require('express').Router();
const repository = require('../../repositories/keyResult');
const service = require('../../services/keyResult');
const adminOnly = require('../adminOnly');
const ValidateService = require('../../utils/ValidateService');
const HelpService = require('../../utils/HelpService');
const isEmpty = ValidateService.isEmpty;

router.get('/objective/:objectiveId/:title*?', (req, res, next) => {
	var title = req.params.title;
	var objectiveId = req.params.objectiveId;

	if (!ValidateService.isCorrectId(objectiveId)) {
		return res.badRequest();
	}

	return service.autocomplete(title, objectiveId, res.callback);
});

router.get('/deleted', (req, res, next) => {
	return repository.getAllDeletedPopulate(res.callback);
});

router.delete('/:id/:flag', (req, res, next) => {
	var id = req.params.id;
	let isDeleted = req.params.flag;
	let deletedDate = new Date();
	let userId = req.session._id

	if(!ValidateService.isCorrectId(id)
		|| !ValidateService.isStringBoolean(flag)) {
		return res.badRequest();
	};

	let body = {
		isDeleted: HelpService.stringToBoolean(flag),
		deletedDate: deletedDate,
		deletedBy: userId
	}

	return service.softDelete(userId, id, body, res.callback);
});

router.put('/:id', (req, res, next) => {
 	let userId = req.session._id
 	let keyResultId = req.params.id;
 	let title = req.body.title || '';
 	let difficulty = req.body.difficulty || '';

 	title = title.trim();
 	difficulty = ValidateService.getValidDifficulty(difficulty.trim());

 	if(!ValidateService.isCorrectId(keyResultId)
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

router.put('/myupdate/:id', (req, res, next) => {

 	var id = req.params.id;

 	if(!ValidateService.isCorrectId(id)) {
 		return res.badRequest();
 	};

 	repository.update(id, req.body, res.callback);
});

router.post('/', (req, res, next) => {
	let objectiveId = req.body.objectiveId || '';
	let userId = req.session._id;
	let title = req.body.title || '';
	let difficulty = req.body.difficulty || '';

	title = title.trim();
	difficulty = difficulty.trim();
	
	if(!ValidateService.isCorrectId(objectiveId)
	|| isEmpty(title) 
	|| isEmpty(difficulty)) {
		return res.badRequest();
	}

	let data = {
		creator: userId,
		isApproved: true,
		isDeleted: false,
		difficulty: difficulty,
		objectiveId: objectiveId,
		title: title,
		used: 0
	};

	return repository.add(data, res.callback);
});
// router.delete('/:id', adminOnly, (req, res, next) => {
// 	var id = req.params.id;

// 	if(!ValidateService.isCorrectId(id)) {
// 		return res.badRequest();
// 	};

// 	return service.delete(req.session._id, id, res.callback);
// });

// router.get('/objective/:id', (req, res, next) => {
// 	var id = req.params.id;

// 	if(!ValidateService.isCorrectId(id)) {
// 		return res.badRequest();
// 	};

// 	return repository.getByObjId(id, res.callback);
// });


//router.get('/title/:title', (req, res, next) => {
//	var title = req.params.title.trim();
//	if(ValidateService.isEmpty(title)){
//		return res.badRequest();
//	};
//
//	return service.autocomplete(title, res.callback);
//});

// router.put('/:id/approve', adminOnly, (req, res, next) => {
// 	var id = req.params.id;

// 	if(!ValidateService.isCorrectId(id)) {
// 		return res.badRequest();
// 	};

// 	return service.changeApprove(req.session._id, id, res.callback);
// });


module.exports = router;