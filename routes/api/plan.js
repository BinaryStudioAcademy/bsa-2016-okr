const router = require('express').Router();

router.get('/', (req, res, next) => {
	//Get all categories
});

router.get('/:id', (req, res, next) => {
	//Get plan by id
});

router.post('/', (req, res, next) => {
	//plan create
});

router.put('/:id', (req, res, next) => {
	//plan update
});

router.get('/user/:id', (req, res, next) => {
	//Get plan by user id
});

module.exports = router;