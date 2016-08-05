const router = require('express').Router();
const repository = require('../../repositories/objective');
const dbCallback = require('./response');

router.get('/', (req, res, next) => {
	repository.getAllObjectives(dbCallback(res));
});

router.get('/:id', (req, res, next) => {
	repository.getObjective(req.params.id, dbCallback(res));
});

router.post('/', (req, res, next) => {
	repository.createObjective(req.body, dbCallback(res));
});

router.put('/:id', (req, res, next) => {
	repository.updateObjective(req.params.id, req.body, dbCallback(res));
});

router.get('/user/:id', (req, res, next) => {
	repository.getObjectiveByUserId(req.params.id, dbCallback(res));
});

router.get('/title/:title', (req, res, next) => {
	repository.getAllApprovedObjectivesByTitle(req.params.title, dbCallback(res));
});

module.exports = router;