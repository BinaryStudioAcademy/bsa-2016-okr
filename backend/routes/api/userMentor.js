const router = require('express').Router();
const repository = require('../../repositories/userMentor');
const dbCallback = require('./response');

router.get('/', (req, res, next) => {
    repository.getAll(dbCallback(res));
});

router.get('/:id', (req, res, next) => {
    repository.getById(req.params.id, dbCallback(res));
});

router.post('/', (req, res, next) => {
    repository.add(req.body, dbCallback(res));
});

router.delete('/:id', (req, res, next) => {
    repository.delete(req.params.id, dbCallback(res));
});

module.exports = router;
