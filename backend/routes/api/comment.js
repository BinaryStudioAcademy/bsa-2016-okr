const router = require('express').Router();
const repository = require('../../repositories/comment');

router.post('/', (req, res, next) => {
	//repository.create(req.body, res.callback);
	repository.getCount();
});

router.get('/:id', (req, res, next) => {
	repository.getById(req.params.id, res.callback);
});

router.get('/objective/:id', (req, res, next) => {
	repository.getByObjId(req.params.id, res.callback);
});

router.delete('/:id', (req, res, next) => {
	repository.delete(req.params.id, res.callback);
});

module.exports = router;
