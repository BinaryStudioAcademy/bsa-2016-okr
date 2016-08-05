const router = require('express').Router();
const repository = require('../../repositories/comment');
const dbCallback = require('./response');

router.post('/', (req, res, next) => {
	//repository.create(req.body, dbCallback(res));
	repository.getCount();
});

router.get('/:id', (req, res, next) => {
	repository.getById(req.params.id, dbCallback(res));
});

router.get('/objective/:id', (req, res, next) => {
	repository.getByObjId(req.params.id, dbCallback(res));
});

router.delete('/:id', (req, res, next) => {
	repository.delete(req.params.id, dbCallback(res));
});

module.exports = router;
