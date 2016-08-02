const router = require('express').Router();

router.get('/', (req, res, next) => {
	//Get all categories
});

router.post('/', (req, res, next) => {
	//create category
});

router.put('/:id', (req, res, next) => {
	//Update category
});

router.delete('/:id', (req, res, next) => {
	//Delete category
});

module.exports = router;