var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var KeyResult = require('../schemas/keyResult');
var UserObjectiveRepository = require('./userObjective');

var KeyResultRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = KeyResult;
};

KeyResultRepository.prototype = new Repository();

KeyResultRepository.prototype.autocomplete = function(title, objectiveId, callback) {
	var model = this.model;
	var options = {
		isApproved: true,
		isDeleted: false,
		objectiveId: objectiveId
	};

	if(title) {
		options.title = new RegExp(title, 'i');
	}

	model
			.find(options, { title: true })
			.sort({ used: 'desc' })
			.exec(callback);
};

KeyResultRepository.prototype.getByTitle = function(title, callback) {
	var model = this.model;

	model
			.findOne({ title: title })
			.exec(callback);
};

module.exports = new KeyResultRepository();