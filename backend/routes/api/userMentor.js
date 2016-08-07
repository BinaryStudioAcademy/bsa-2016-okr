const router = require('express').Router();
const repository = require('../../repositories/userMentor');
const service = require('../../services/userMentor');
const dbCallback = require('./response');

router.get('/', (req, res, next) => {
    repository.getAll(dbCallback(res));
});

router.get('/:id', (req, res, next) => {
    repository.getByMentorId(req.params.id, dbCallback(res));
});

router.post('/', (req, res, next) => {
    service.setUserAsMentor(req.body, dbCallback(res));
});

router.delete('/:id', (req, res, next) => {
    repository.deleteByMentorId(req.params.id, dbCallback(res));
});

router.delete('/user/:id', (req, res, next) => {
    repository.deleteByUserId(req.params.id, dbCallback(res));
});

module.exports = router;
