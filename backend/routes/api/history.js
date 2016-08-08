const router = require('express').Router();
const repository = require('../../repositories/history');

router.get('/', (req, res, next) => {
	repository.getAll(res.callback);
});

router.get('/:id', (req, res, next) => {
	repository.getById(req.params.id, res.callback);
});

router.post('/', (req, res, next) => {
	repository.add(req.body, res.callback);
});

module.exports = router;
