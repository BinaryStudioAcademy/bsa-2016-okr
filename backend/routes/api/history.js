const router = require('express').Router();
const repository = require('../../repositories/history');
const session = require('../../config/session');
const ValidateService = require('../../utils/ValidateService');
const adminOnly = require('../adminOnly');
const service = require('../../services/history');
var async = require('async');

router.get('/', (req, res, next) => {
	repository.getAll(res.callback);
});

router.put('/', (req, res, next) => {
	var filters = req.body.filters || null;
	var sort = req.body.sort || null;
	var eventList = [];

	console.log(req.body);
	console.log(sort);
	async.waterfall([
		(callback) => {
			repository.getAll((err, result) => {
				if(err) {
					return callback(err, result);
				}
				return callback(null, result.slice());	
			});
		},
		(result, callback) => {
			if(filters !== null )
				service.filterBy(result, filters, (res) => {
					result = res.slice();
					//return callback(null, result);
					console.log('-----------after filtering------------');
					console.log(res);
				})
			return callback(null, result);
		},
		(result, callback) => {
			if(sort !== null && sort !== '')
				service.sortBy(result, sort, (res) => {
					console.log('-----------after sorting------------');
					console.log(res);

					result = res.slice();
					//return callback(null, result);
					
				})
			return callback(null, result)
		}
	], (err, result) => {
		res.callback(null, result);
	})
})

router.post('/', (req, res, next) => {
	repository.add(req.body, res.callback);
});

router.get('/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	repository.getById(id, res.callback);
});

router.get('/user/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	repository.getByAuthorId(id, res.callback);
});
module.exports = router;
