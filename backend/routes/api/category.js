const router = require('express').Router();
const repository = require('../../repositories/category');
const session = require('../../config/session');
const categoryService = require('../../services/category');

router.get('/', (req, res, next) => {
	repository.getAll(res.callback);
});

router.get('/deleted', (req, res, next) => {
	repository.getAllDeleted(res.callback);
});

router.post('/', (req, res, next) => {
	console.log("Category rest POST hit");
/*
	if(!session.isAdmin) {
		var err = new Error('You are not allowed to do this');
		err.status = 403;
		return dbCallback(err);
	}
	*/
	console.log(req.body);
	var title = req.body.title;
	if(title != undefined && title.length > 0) {
		console.log(title);

		var data = {
			title: title,
			isDeleted: false
		}

		categoryService.add(data, res.callback);
		// the response is empty now
	}else {
		/// this doesn't work
		var err = new Error('Title must be set');
		return dbCallback(err);
	}
});

router.put('/:id', (req, res, next) => {
	/*
		if(!session.isAdmin) {
			var err = new Error('You are not allowed to do this');
			err.status = 403;
			return dbCallback(err);
		}
		*/
		//TODO add title verefication
	repository.update(req.params.id, req.body, res.callback);
});

router.delete('/:id', (req, res, next) => {
	/*
		if(!session.isAdmin) {
			var err = new Error('You are not allowed to do this');
			err.status = 403;
			return dbCallback(err);
		}
		*/
		//for now soft delete only
	repository.update(req.params.id, {isDeleted: 1}, res.callback);
	//repository.delete(req.params.id, res.callback);
});

module.exports = router;
