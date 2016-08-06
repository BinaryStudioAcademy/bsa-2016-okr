const router = require('express').Router();
const repository = require('../../repositories/plan');
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

router.put('/:id', (req, res, next) => {
	repository.update(req.params.id, req.body, dbCallback(res));
});

router.get('/user/:id', (req, res, next) => {
	repository.getByUserId(req.params.id, dbCallback(res));
});

module.exports = router;
