var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var History = require('../schemas/history');

var HistoryRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = History;
};

HistoryRepository.prototype = new Repository();

HistoryRepository.prototype.addKeyEvent = function(authorId, keyId, type, callback) {
	let model = this.model;
	let date = Date.now();
	let newEvent = new model({authorId, keyId, type, date});
	newEvent.save(callback);
};

HistoryRepository.prototype.addObjectiveEvent = function(authorId, objectiveId, type, callback) {
	let model = this.model;
	let date = Date.now();
	let newEvent = new model({authorId, objectiveId, type, date});
	newEvent.save(callback);
};

module.exports = new HistoryRepository();
