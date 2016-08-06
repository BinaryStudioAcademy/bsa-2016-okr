const router = require('express').Router();
const repository = require('../../repositories/key');
const dbCallback = require('./response');
const service = require('../../services/key.js')

router.post('/', (req, res, next) => {
	repository.add(req.body, dbCallback(res));
});

router.get('/objective/:id', (req, res, next) => {
	repository.getByObjId(req.params.id, dbCallback(res));
});

router.put('/:id', (req, res, next) => {
	repository.update(req.params.id, req.body, dbCallback(res));
});

router.get('/title/:title', (req, res, next) => {
	service.autocomplete(req.params.title, dbCallback(res));
});

router.put('/:id/approve', (req, res, next) => {
	service.changeApprove(req.params.id, dbCallback(res));
});

router.delete('/:id', (req, res, next) => {
	repository.delete(req.params.id, dbCallback(res));
});

module.exports = router;