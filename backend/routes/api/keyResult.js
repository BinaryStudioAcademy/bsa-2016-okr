const router = require('express').Router();
const repository = require('../../repositories/keyResult');
const service = require('../../services/keyResult');
const ValidateService = require('../../utils/ValidateService');
const adminOnly = require('../adminOnly');

router.get('/objective/:objectiveId/:title*?', (req, res, next) => {
    var title = req.params.title;
    var objectiveId = req.params.objectiveId;

    if(!ValidateService.isCorrectId(objectiveId)) {
        return res.badRequest();
    }

    return service.autocomplete(title, objectiveId, res.callback);
});

router.post('/', (req, res, next) => {
    let title = req.body.title || '';
    let objectiveId = req.body.objectiveId || '';
    let isDeleted = req.body.isDeleted || 'false';
    let isApproved = req.body.isApproved || 'true';
    let used = req.body.used || '0';
    let difficulty = req.body.difficulty || 'easy';

    let keyResult = {
      title:title,
      creator: req.session._id,
      objectiveId: objectiveId,
      isDeleted: isDeleted,
      isApproved: isApproved,
      used: used,
      difficulty: difficulty
    };

	return service.add(req.session._id, keyResult, res.callback);
});

// router.put('/:id', (req, res, next) => {
// 	var id = req.params.id;
	
// 	if(!ValidateService.isCorrectId(id)) {
// 		return res.badRequest();
// 	};
	
// 	return service.update(session._id, id, req.body, res.callback);
// });

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