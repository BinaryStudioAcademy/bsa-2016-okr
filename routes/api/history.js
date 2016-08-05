const router = require('express').Router();
<<<<<<< HEAD
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

=======

router.get('/', (req, res, next) => {
	//Get all history
});

router.post('/:id', (req, res, next) => {
	//create history by id
});

router.post('/', (req, res, next) => {
	//Create history
});


>>>>>>> feature/repositories
module.exports = router;