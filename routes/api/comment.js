const router = require('express').Router();
const repository = require('../../repositories/comment');
const dbCallback = require('./response');

router.post('/', (req, res, next) => {
	repository.createComment(req.body, dbCallback(res));
});

router.get('/:id', (req, res, next) => {
	repository.getCommentById(req.params.id, dbCallback(res));
});

router.get('/objective/:id', (req, res, next) => {
	repository.getCommentByObjId(req.params.id, dbCallback(res));
});

router.delete('/:id', (req, res, next) => {
	repository.deleteComment(req.params.id, dbCallback(res));
});

module.exports = router;