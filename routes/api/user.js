const router = require('express').Router();

router.get('/', (req, res, next) => {
	//Get all users
});


router.get(':id', (req, res, next) => {
	//Get user by id
});


router.post('/', (req, res, next) => {
	//User create
});

router.put('/:id', (req, res, next) => {
	//User update
});

module.exports = router;