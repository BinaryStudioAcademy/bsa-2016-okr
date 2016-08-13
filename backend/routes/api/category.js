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
	var title = req.body.title.trim() || '';
	if(ValidateService.isEmpty(title)){
	return res.badRequest();
	}

		var data = {
			title: title,
			isDeleted: false
		}

		categoryService.add(req.session._id, data, res.callback);
});
//validations done
router.put('/:id', adminOnly, (req, res, next) => {
	var isDeleted = req.body.isDeleted;
	var userId = req.session._id || '';
	var categoryId = req.params.id || '';

	if(!ValidateService.isCorrectId(userId)
		|| !ValidateService.isCorrectId(categoryId)){
		return res.badRequest();
	}

	if(isDeleted != undefined && ValidateService.isStringBoolean(isDeleted)){
		var data = {
			categoryId: categoryId,
			body: {isDeleted: isDeleted}
		}
	categoryService.softDelete(data, res.callback);
	} else {
		var title = req.body.title.trim() || '';
		if(ValidateService.isEmpty(title)){
			return res.badRequest();
		}
		var data = {
			userId: userId,
			categoryId: categoryId,
			body: {title: title}
		}
		categoryService.update(data, res.callback);
	}
});
//Done validations
router.delete('/:id', adminOnly, (req, res, next) => {
	var userId = req.session._id || '';
	var categoryId = req.params.id || '';
	if(!ValidateService.isCorrectId(userId)
		|| !ValidateService.isCorrectId(categoryId)){
		return res.badRequest();
		}
	var data = {
		userId: userId,
		categoryId: categoryId
	}

	categoryService.delete(data, res.callback);
});

module.exports = router;
