const router = require('express').Router();
const repository = require('../../repositories/key');
const dbCallback = require('./response');
const service = require('../../services/key.js')

router.post('/', (req, res, next) => {
	repository.add(req.body, dbCallback(res));
});

router.put('/:id', (req, res, next) => {
	repository.update(req.params.id, req.body, dbCallback(res));
});

router.get('/title/:title', (req, res, next) => {
	service.autocomplete(req.params.title, dbCallback(res));
});

module.exports = router;