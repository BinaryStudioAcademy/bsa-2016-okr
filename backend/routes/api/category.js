const router = require('express').Router();
const repository = require('../../repositories/category');
const dbCallback = require('./response');
const session = require('../../config/session');
const categoryService = require('../../services/category');

router.get('/', (req, res, next) => {
	repository.getAll(dbCallback(res));
});

router.get('/deleted', (req, res, next) => {
	repository.getAllDeleted(dbCallback(res));
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

		categoryService.add(data, dbCallback(res));
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
	repository.update(req.params.id, req.body, dbCallback(res));
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
	repository.update(req.params.id, {isDeleted: 1}, dbCallback(res));
	//repository.delete(req.params.id, dbCallback(res));
});

module.exports = router;
