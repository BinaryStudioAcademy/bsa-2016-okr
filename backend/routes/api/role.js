const router = require('express').Router();
const role = require('../../repositories/role');

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

router.get('/', (req, res, next) => {

	role.getAll(function(err, data){
        res.json(data);
    });

});

router.put('/:id', (req, res, next) => {
	
	var id = req.params.id;

	role.update(id, req.body, function(err, data){

	    if (err) {
	    	console.log("Error!");
	    }

	    res.json(data);

	});

});

module.exports = router;