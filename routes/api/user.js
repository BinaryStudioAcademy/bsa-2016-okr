const router = require('express').Router();
const repository = require('../repositories/user');
const dbCallback = require('./response');

router.get('/', (req, res, next) => {
	repository.getAllUsers(dbCallback(res));
});


router.get(':id', (req, res, next) => {
	repository.getUser(req.params.id, dbCallback(res));
});

router.post('/', (req, res, next) => {
	repository.createUser(req.body, dbCallback(res));
});

router.put('/:id', (req, res, next) => {
	repository.updateUser(req.params.id, req.body, dbCallback(res));
});

module.exports = router;