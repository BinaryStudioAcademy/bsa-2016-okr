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

    return repository.autocomplete(title, objectiveId, res.callback);
});

router.post('/', (req, res, next) => {
	return service.add(session._id, key, res.callback);
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