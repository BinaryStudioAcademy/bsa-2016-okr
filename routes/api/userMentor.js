const router = require('express').Router();
const repository = require('../../repositories/userMentor');
const dbCallback = require('./response');

router.get('/', (req, res, next) => {
    repository.getAllMentors(dbCallback(res));
});

router.get('/:id', (req, res, next) => {
    repository.getMentorById(req.params.id, dbCallback(res));
});

router.post('/', (req, res, next) => {
    repository.createMentor(req.body, dbCallback(res));
});

router.delete('/:id', (req, res, next) => {
    repository.deleteMentor(req.params.id, dbCallback(res));
});

module.exports = router;
