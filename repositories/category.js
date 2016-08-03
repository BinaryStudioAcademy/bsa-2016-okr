var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var Plan = require('../schemas/category').model;

var CategoryRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = Category;
};

CategoryRepository.prototype = new Repository();

CategoryRepository.prototype.getAllCategories = function(queryString, callback) {
	Category.getAll(callback);
};

CategoryRepository.prototype.createCategory = function(category, queryString, callback) {
	Category.add(category, callback);
};

CategoryRepository.prototype.updateCategory = function(id, body, queryString, callback) {
	Category.update(id, body, callback);
};

CategoryRepository.prototype.deleteCategory = function(id, queryString, callback) {
	Category.delete(id, callback);
};

