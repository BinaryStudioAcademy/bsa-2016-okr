const router = require('express').Router();
const repository = require('../../repositories/history');
const dbCallback = require('./response');

router.get('/', (req, res, next) => {
	repository.getAllHistory(dbCallback(res));
});

router.get('/:id', (req, res, next) => {
	repository.getHistoryById(req.params.id, dbCallback(res));
});

router.post('/', (req, res, next) => {
	repository.createHistory(req.body, dbCallback(res));
});

module.exports = router;