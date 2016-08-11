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

//	if(title != undefined && title.length > 0) {
//		console.log(title);

		var data = {
			title: title,
			isDeleted: false
		}

		categoryService.add(data, res.callback);
/*		// the response is empty now
	}else {
		/// this doesn't work
		var err = new Error('Title must be set');
		return dbCallback(err);
	}
*/
});

router.put('/:id', adminOnly, (req, res, next) => {
		//TODO add title verefication
		var title = req.body.title.trim();

		if(ValidateService.isEmpty(title)){
		return res.badRequest();
		}
	repository.update(req.params.id, req.body, res.callback);
});

router.delete('/:id', adminOnly, (req, res, next) => {
		//for now soft delete only
	repository.update(req.params.id, {isDeleted: 1}, res.callback);
	//repository.delete(req.params.id, res.callback);
});

module.exports = router;
