const router = require('express').Router();
const repository = require('../../repositories/category');
const dbCallback = require('./response');

router.get('/', (req, res, next) => {
	repository.getAll(dbCallback(res));
});

router.post('/', (req, res, next) => {
	repository.add(req.body, dbCallback(res));
});

router.put('/:id', (req, res, next) => {
	repository.update(req.params.id, req.body, dbCallback(res));
});

router.delete('/:id', (req, res, next) => {
	repository.delete(req.params.id, dbCallback(res));
});

module.exports = router;