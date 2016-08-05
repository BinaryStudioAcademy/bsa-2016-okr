var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var History = require('../schemas/history').model;

var HistoryRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = History;
};

HistoryRepository.prototype = new Repository();

module.exports = new HistoryRepository();
