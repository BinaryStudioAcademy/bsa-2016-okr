var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var Key = require('../schemas/key').model;

var KeyRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = Key;
};

KeyRepository.prototype = new Repository();

KeyRepository.prototype.getkeyByObjectiveId = function(objectiveId, callback) {
	var model = this.model;
	var query = model.find({'objectiveId': objectiveId});
	query.exec(callback);
};

KeyRepository.prototype.setIsApprovedToTrue = function(id, callback) {
	var model = this.model;
	var query = model.update({_id:id}, {$set: {'isApproved': 'true'} });
	query.exec(callback);
};

KeyRepository.prototype.setIsApprovedToFalse = function(id, callback) {
	var model = this.model;
	var query = model.update({_id:id}, {$set: {'isApproved': 'false'} });
	query.exec(callback);
};

module.exports = new KeyRepository();