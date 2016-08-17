var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var KeyResult = require('../schemas/keyResult');

var KeyResultRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = KeyResult;
};

KeyResultRepository.prototype = new Repository();

KeyResultRepository.prototype.getById = function(id, callback) {
	var model = this.model;
	var query = model.findOne({_id: id});
	query.exec(callback);
};

KeyResultRepository.prototype.getByObjId = function(objectiveId, callback) {
	var model = this.model;
	var query = model.find({'objectiveId': objectiveId});
	query.exec(callback);
};

KeyResultRepository.prototype.getAllApprovedByTitle = function(title, callback) {
	var model = this.model;
	var query = model.find({'title': title}, {'isApproved': 'true'});
	query.exec(callback);
};

KeyResultRepository.prototype.setIsApprovedToTrue = function(id, callback) {
	var model = this.model;
	var query = model.update({_id:id}, {$set: {'isApproved': 'true'} });
	query.exec(callback);
};

KeyResultRepository.prototype.setIsApprovedToFalse = function(id, callback) {
	var model = this.model;
	var query = model.update({_id:id}, {$set: {'isApproved': 'false'} });
	query.exec(callback);
};

module.exports = new KeyResultRepository();