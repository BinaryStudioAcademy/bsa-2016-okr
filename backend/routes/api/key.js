const router = require('express').Router();
const repository = require('../../repositories/key');
const service = require('../../services/key.js')

router.post('/', (req, res, next) => {
	repository.add(req.body, res.callback);
});

router.get('/objective/:id', (req, res, next) => {
	repository.getByObjId(req.params.id, res.callback);
});

router.put('/:id', (req, res, next) => {
	repository.update(req.params.id, req.body, res.callback);
});

router.get('/title/:title', (req, res, next) => {
	service.autocomplete(req.params.title, res.callback);
});

router.put('/:id/approve', (req, res, next) => {
	service.changeApprove(req.params.id, res.callback);
});

router.delete('/:id', (req, res, next) => {
	repository.delete(req.params.id, res.callback);
});

module.exports = router;