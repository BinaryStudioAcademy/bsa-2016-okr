var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var Category = require('../schemas/category');

var CategoryRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = Category;
};

CategoryRepository.prototype = new Repository();

CategoryRepository.prototype.getByTitle = function(title, callback) {
	var model = this.model;

	model
		.findOne({ title: title })
		.exec(callback);
};

module.exports = new CategoryRepository();