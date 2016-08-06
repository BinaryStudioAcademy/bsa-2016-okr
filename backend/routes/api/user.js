const router = require('express').Router();
const repository = require('../../repositories/user');
const service = require('../../services/user');
const dbCallback = require('./response');

router.get('/', (req, res, next) => {
	repository.getAll(dbCallback(res));
});

router.get('/:id', (req, res, next) => {
	repository.getById(req.params.id, dbCallback(res));
});

router.post('/', (req, res, next) => {
	service.add(req.body, dbCallback(res));
});

router.put('/:id', (req, res, next) => {
	service.update(req.params.id, req.body, dbCallback(res));
});

router.get('/me/:id', (req, res, next) => {
	service.getMe(req.params.id, dbCallback(res));
});

//router.delete('/:id', (req, res, next) => {
	//service.delete(req.params.id, dbCallback(res));
//})

module.exports = router;