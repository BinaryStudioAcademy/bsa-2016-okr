const router = require('express').Router();
const repository = require('../../repositories/userMentor');
const service = require('../../services/userMentor');

router.get('/', (req, res, next) => {
    console.log(req.decoded);
    repository.getAll(res.callback);
});

router.get('/:id', (req, res, next) => {
    repository.getByMentorId(req.params.id, res.callback);
});

router.post('/', (req, res, next) => {
    service.setUserAsMentor(req.body, res.callback);
});

router.delete('/:id', (req, res, next) => {
    repository.deleteByMentorId(req.params.id, res.callback);
});

router.delete('/user/:id', (req, res, next) => {
    repository.deleteByUserId(req.params.id, res.callback);
});

module.exports = router;
