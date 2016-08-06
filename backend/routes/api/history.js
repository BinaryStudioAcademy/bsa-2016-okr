const router = require('express').Router();
const repository = require('../../repositories/history');
const dbCallback = require('./response');

router.get('/', (req, res, next) => {
	repository.getAll(dbCallback(res));
});

router.get('/:id', (req, res, next) => {
	repository.getById(req.params.id, dbCallback(res));
});

router.post('/', (req, res, next) => {
	repository.add(req.body, dbCallback(res));
});

module.exports = router;
