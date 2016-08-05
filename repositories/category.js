var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var Category = require('../schemas/category').model;

var CategoryRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = Category;
};

CategoryRepository.prototype = new Repository();

module.exports = new CategoryRepository();