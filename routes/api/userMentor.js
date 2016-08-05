const router = require('express').Router();
<<<<<<< HEAD
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
=======

router.get('/', (req, res, next) => {
	//Get all mentors
});

router.post('/', (req, res, next) => {
	//Create new mentor
});

router.get('/:id', (req, res, next) => {
	//Get mentor by id

router.delete('/:id', (req, res, next) => {
	//Delete mentor
});

router.get('/:mentorId', (req, res, next) => {
	//Get mentor by mentorId
>>>>>>> feature/repositories
});

module.exports = router;