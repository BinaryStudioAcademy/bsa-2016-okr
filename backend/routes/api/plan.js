const router = require('express').Router();
const repository = require('../../repositories/plan');

router.get('/', (req, res, next) => {
	repository.getAll(res.callback);
});

router.get('/:id', (req, res, next) => {
	repository.getById(req.params.id, res.callback);
});

router.post('/', (req, res, next) => {
	repository.add(req.body, res.callback);
});

router.put('/:id', (req, res, next) => {
	repository.update(req.params.id, req.body, res.callback);
});

router.get('/user/:id', (req, res, next) => {
	repository.getByUserId(req.params.id, res.callback);
});

module.exports = router;
