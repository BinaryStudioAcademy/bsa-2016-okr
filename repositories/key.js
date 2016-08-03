var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var Key = require('../schemas/key').model;

var KeyRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = Key;
};

KeyRepository.prototype = new Repository();

KeyRepository.prototype.createKey = function(key, queryString, callback) {
	this.add(key, callback);
};

KeyRepository.prototype.updateKey = function(id, body, queryString, callback) {
	this.update(id, body, callback);
};

module.exports = new KeyRepository();