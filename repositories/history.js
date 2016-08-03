var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var History = require('../schemas/history').model;

var HistoryRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = History;
};

HistoryRepository.prototype = new Repository();

HistoryRepository.prototype.getAllHistory = function(queryString, callback) {
	this.getAll(callback);
};

HistoryRepository.prototype.getHistoryById = function(id, queryString, callback) {
	this.getById(id, callback);
};

HistoryRepository.prototype.createHistory = function(history, queryString, callback) {
	this.add(history, callback);
};

