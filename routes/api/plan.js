const router = require('express').Router();
const repository = require('../../repositories/plan');
const dbCallback = require('./response');

router.get('/', (req, res, next) => {
<<<<<<< HEAD
	repository.getAllPlans(dbCallback(res));
=======
	//Get all plans
>>>>>>> feature/repositories
});

router.get('/:id', (req, res, next) => {
	repository.getPlanById(req.params.id, dbCallback(res));
});

router.post('/', (req, res, next) => {
	repository.createPlan(req.body, dbCallback(res));
});

router.put('/:id', (req, res, next) => {
	repository.updatePlan(req.params.id, req.body, dbCallback(res));
});

router.get('/user/:id', (req, res, next) => {
	repository.getPlanByUserId(req.params.id, dbCallback(res));
});

module.exports = router;