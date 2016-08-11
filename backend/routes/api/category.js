const router = require('express').Router();
const adminOnly = require('../adminOnly');
const ValidateService = require('../../utils/ValidateService');
const repository = require('../../repositories/category');
const session = require('../../config/session');
const categoryService = require('../../services/category');

router.get('/', (req, res, next) => {
	repository.getAll(res.callback);
});

router.get('/deleted', (req, res, next) => {
	repository.getAllDeleted(res.callback);
});

router.post('/', adminOnly, (req, res, next) => {
	console.log("Category rest POST hit");
	console.log(req.body);
	var title = req.body.title.trim();
	if(ValidateService.isEmpty(title)){
	return res.badRequest();
	}

		var data = {
			title: title,
			isDeleted: false
		}

		categoryService.add(req.session._id, data, res.callback);
});

router.put('/:id', adminOnly, (req, res, next) => {
		var title = req.body.title.trim();

		if(ValidateService.isEmpty(title)){
		return res.badRequest();
		}

		var data = {
			userId: req.session._id,
			categoryId: req.params.id,
			body: {title: req.body.title}
		}

	categoryService.update(data, res.callback);
});

router.delete('/:id', adminOnly, (req, res, next) => {
		//for now soft delete only
		if(!ValidateService.isCorrectId(req.params.id)){
		return res.badRequest();
		}

		var data = {
			userId: req.session._id,
			categoryId: req.params.id,
			delete: {isDeleted: 1}
		}

	categoryService.delete(data, res.callback);
});

module.exports = router;
