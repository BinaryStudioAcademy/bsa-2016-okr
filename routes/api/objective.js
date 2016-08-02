const router = require('express').Router();

router.get('/', (req, res, next) => {
	//Get all objectives
});


router.get('/:id', (req, res, next) => {
	//Get objective by id
});

router.post('/', (req, res, next) => {
	//objective create
});

router.put('/:id', (req, res, next) => {
	//objective update
});

router.put('/user/:id', (req, res, next) => {
	//Get objectives by user id
});

module.exports = router;