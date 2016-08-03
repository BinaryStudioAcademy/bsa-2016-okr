const router = require('express').Router();

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
});

module.exports = router;