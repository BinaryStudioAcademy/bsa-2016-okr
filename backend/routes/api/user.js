const router = require('express').Router();
const repository = require('../../repositories/user');
const service = require('../../services/user');

router.get('/', (req, res, next) => {
	repository.getAll(res.callback);
});

router.get('/:id', (req, res, next) => {
	repository.getById(req.params.id, res.callback);
});

router.post('/', (req, res, next) => {
	service.add(req.body, res.callback);
});

router.put('/:id', (req, res, next) => {
	service.update(req.params.id, req.body, res.callback);
});

router.get('/me/:id', (req, res, next) => {
	service.getMe(req.params.id, res.callback);
});

router.delete('/:id', (req, res, next) => {
	service.delete(req.params.id, res.callback);
})

module.exports = router;