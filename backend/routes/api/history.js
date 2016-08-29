const router = require('express').Router();
const repository = require('../../repositories/history');
const session = require('../../config/session');
const ValidateService = require('../../utils/ValidateService');
const adminOnly = require('../adminOnly');
const service = require('../../services/history');
var async = require('async');

router.get('/', (req, res, next) => {
	repository.getHistory(res.callback);
});

router.put('/', (req, res, next) => {
	var filters = req.body.filters || null;
	var sort = req.body.sort || null;
	var eventList = [];

	async.waterfall([
		(callback) => {
			repository.getHistory((err, result) => {
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
				})

			return callback(null, result);
		},
		(result, callback) => {
			if(sort !== null && sort.sortField !== '')
				service.sortBy(result, sort.sortField, sort.up, (res) => {
					result = res.slice();				
				})

			return callback(null, result)
		}
	], (err, result) => {
		return res.callback(null, result);
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

	repository.getHistoryById(id, res.callback);
});

router.get('/user/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	console.log('-----------------REQUEST');
	
	async.waterfall([
		(callback) => {
			service.getUserHistory(id, (err, historyList) => {
				if(err)
					return callback(err, null);
				console.log(`----------------------get this shit `);
				console.log(historyList);
				return callback(null, historyList)
			})
		},
		(historyList, callback) => {
			if(historyList.length > 0)
				service.sortBy(historyList, 'date', true, (historyList) => {
					console.log(`----------------------sorted to this shit ${historyList}`);
					
					return callback(null, historyList)
				})
			else {
				historyList = ['empty'];
				return callback(null, historyList)
			}
		}

	], (err, result) => {
		console.log('--------------RESPONSE----')
		
		console.log(result)
		return res.callback(null, result);
	})
});
module.exports = router;
