const router = require('express').Router();
const repository = require('../../repositories/category');
const dbCallback = require('./response');

router.get('/', (req, res, next) => {
	repository.getAllCategories(dbCallback(res));
});

router.post('/', (req, res, next) => {
	repository.createCategory(req.body, dbCallback(res));
});

router.put('/:id', (req, res, next) => {
	repository.updateCategory(req.params.id, req.body, dbCallback(res));
});

router.delete('/:id', (req, res, next) => {
	repository.deleteCategory(req.params.id, dbCallback(res));
});

module.exports = router;