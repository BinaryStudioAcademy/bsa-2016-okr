const router = require('express').Router();
const repository = require('../../repositories/key');
const dbCallback = require('./response');

router.post('/', (req, res, next) => {
	repository.createKey(req.body, dbCallback(res));
});

router.put('/:id', (req, res, next) => {
	repository.updateKey(req.params.id, req.body, dbCallback(res));
});

router.get('/title/:title', (req, res, next) => {
	repository.getAllApprovedKeysByTitle(req.params.title, dbCallback(res));
});

module.exports = router;