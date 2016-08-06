const router = require('express').Router();
const repository = require('../../repositories/category');
const dbCallback = require('./response');
const categoryService = require('../../services/category');

router.get('/', (req, res, next) => {
	repository.getAll(dbCallback(res));
});

router.post('/', (req, res, next) => {
	// TODO admin check
	console.log("Category rest POST hit");
	console.log(req.body);
	var title = req.body.title;
	if(title != undefined && title.length > 0) {
		var obj = {title: title, isDeleted: 0};
		categoryService.add(obj, dbCallback(res));
	}else {
	res = 'Enter title';
	}
});

router.put('/:id', (req, res, next) => {
	// TODO admin check
	repository.update(req.params.id, req.body, dbCallback(res));
});

router.delete('/:id', (req, res, next) => {
	// TODO admin check
	repository.update(req.params.id, {isDeleted: 1}, dbCallback(res));
	//repository.delete(req.params.id, dbCallback(res));
});

module.exports = router;
