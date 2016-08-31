const router = require('express').Router();
const adminOnly = require('../adminOnly');
const ValidateService = require('../../utils/ValidateService');
const HelpService = require('../../utils/HelpService');
const repository = require('../../repositories/category');
const session = require('../../config/session');
const categoryService = require('../../services/category');

router.get('/', (req, res, next) => {
	repository.getAllNotDeleted(res.callback);
});

router.get('/deleted', adminOnly, (req, res, next) => {
	repository.getAllDeletedPopulate(res.callback);
});

router.post('/', adminOnly, (req, res, next) => {
	var title = req.body.title || '';
	var userId = req.session._id

	title = title.trim();
	
	if(ValidateService.isEmpty(title)) {
		return res.badRequest();
	}

	var data = {
		title: title,
		isDeleted: false
	}

	categoryService.add(userId, data, res.callback);
});

router.delete('/:id/:flag', adminOnly, (req, res, next) => {
	console.log('/:id/delete/:flag');
	var flag = req.params.flag || '';
	var categoryId = req.params.id || '';
	var userId = req.session._id;

	if(!ValidateService.isCorrectId(categoryId)
	|| !ValidateService.isStringBoolean(flag)) {
		return res.badRequest();
	}

	var data = {
		isDeleted: HelpService.stringToBoolean(flag)
	};
	
	categoryService.softDelete(userId, categoryId, data, res.callback);
});

router.put('/:id', adminOnly, (req, res, next) => {
	var categoryId = req.params.id || '';
	var title = req.body.title || '';
	var userId = req.session._id;

	title = title.trim();
	
	if(!ValidateService.isCorrectId(categoryId)
	|| ValidateService.isEmpty(title)) {
		return res.badRequest();
	}

	var data = {
		title: title
	};

	categoryService.update(userId, categoryId, data, res.callback);
});

router.put('/myupdate/:id', adminOnly, (req, res, next) => {
	repository.update(req.params.id, req.body, res.callback);
});

router.delete('/:id', adminOnly, (req, res, next) => {
	var userId = req.session._id;
	var categoryId = req.params.id || '';
	
	if(!ValidateService.isCorrectId(categoryId)){
		return res.badRequest();
	}
	
	categoryService.delete(userId, categoryId, res.callback);
});

module.exports = router;
