const router = require('express').Router();
const repository = require('../../repositories/keyResult');
const service = require('../../services/keyResult');
const adminOnly = require('../adminOnly');
const ValidateService = require('../../utils/ValidateService');
const isEmpty = ValidateService.isEmpty;

router.get('/objective/:objectiveId/:title*?', (req, res, next) => {
	var title = req.params.title;
	var objectiveId = req.params.objectiveId;

	if (!ValidateService.isCorrectId(objectiveId)) {
		return res.badRequest();
	}

	return service.autocomplete(title, objectiveId, res.callback);
});

router.put('/softDelete/:id', adminOnly, (req, res, next) => {
    var id = req.params.id;

    if(!ValidateService.isCorrectId(id)) {
        return res.badRequest();
    };

    return repository.setToDeleted(id, res.callback);
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

// router.delete('/:id', adminOnly, (req, res, next) => {
// 	var id = req.params.id;

// 	if(!ValidateService.isCorrectId(id)) {
// 		return res.badRequest();
// 	};

// 	return service.delete(session._id, id, res.callback);
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

// 	return service.changeApprove(session._id, id, res.callback);
// });


module.exports = router;