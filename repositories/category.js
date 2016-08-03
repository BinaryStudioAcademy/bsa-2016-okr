var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var Category = require('../schemas/category').model;

var CategoryRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = Category;
};

CategoryRepository.prototype = new Repository();

CategoryRepository.prototype.getAllCategories = function(queryString, callback) {
	this.getAll(callback);
};

CategoryRepository.prototype.createCategory = function(category, queryString, callback) {
	this.add(category, callback);
};

CategoryRepository.prototype.updateCategory = function(id, body, queryString, callback) {
	this.update(id, body, callback);
};

CategoryRepository.prototype.deleteCategory = function(id, queryString, callback) {
	this.delete(id, callback);
};

module.exports = new CategoryRepository();