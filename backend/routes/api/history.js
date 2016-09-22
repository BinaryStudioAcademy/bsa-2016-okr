const router = require('express').Router();
const repository = require('../../repositories/history');
const ValidateService = require('../../utils/ValidateService');
const adminOnly = require('../adminOnly');
const service = require('../../services/history');
var async = require('async');

router.get('/limit/:limit', (req, res, next) => {
	var limit = parseInt(req.params.limit) || 100;
	service.getHistory(limit, res.callback);
});

router.put('/', (req, res, next) => {
	var filters = req.body.filters || null;
	var sort = req.body.sort || null;
	var eventList = [];
	var limit = parseInt(req.body.limit) || 100;

	service.getSortedAndFiltered(filters, sort, limit, res.callback);
})

router.post('/', (req, res, next) => {
	repository.add(req.body, res.callback);
});

router.get('/user/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};
	service.getUserHistory(id, res.callback)

});

router.get('/:id', (req, res, next) => {
	var id = req.params.id;

	if(!ValidateService.isCorrectId(id)) {
		return res.badRequest();
	};

	repository.getHistoryById(id, res.callback);
});

module.exports = router;
