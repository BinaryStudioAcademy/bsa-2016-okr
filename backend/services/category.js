const async = require('async');
const ObjectId = require('mongoose').Types.ObjectId;
const CategoryRepository = require('../repositories/category');
const Category = require('../schemas/category');
const HistoryRepository = require('../repositories/history');

const ValidateService = require('../utils/ValidateService');
const isEmpty = ValidateService.isEmpty;
const CONST = require('../config/constants');

var CategoryService = function() {};

CategoryService.prototype.add = function(userId, data, callback) {
	 async.waterfall([
		(callback) => {
			CategoryRepository.getByTitle(data.title, (err, category) => {
				if(err) {
					return callback(err, null);
				}

				if(!isEmpty(category)) {
					var err = new Error('Category already exists');
					return callback(err, null);
				}

				return callback(null);
			});
		},
		(callback) => {
			CategoryRepository.add(data, (err, category) => {
				if(err) {
					return callback(err, null);
				}

				return callback(null, category);
			});
		},
		(category, callback) =>{
			HistoryRepository.addCategoryEvent(userId, category._id, CONST.history.type.ADD, (err, history) => {
				if(err) {
					return callback(err, null);
				}

				return callback(null, category);
			});
		},
	], (err, result) => {
		return callback(err, result);
	});
};

CategoryService.prototype.softDelete = function(userId, categoryId, data, callback) {
	 async.waterfall([
		(callback) => {
			Category.findOneAndUpdate({ _id: categoryId }, data, (err, category) => {
				if(err) {
					return callback(err, null);
				}

				if(isEmpty(category)) {
					var err = new Error('Category does not exists');
					return callback(err, null);
				}

				return callback(null, category);
			});
		},
		(category, callback) => {
			if(category.isDeleted === data.isDeleted) {
				return callback(null);
			}
			
			var type = data.isDeleted ? CONST.history.type.SOFT_DELETE : CONST.history.type.RESTORE;

			HistoryRepository.addCategoryEvent(userId, category._id, type, (err, history) => {
				if(err) {
					return callback(err, null);
				}

				return callback(null, history);
			});
		},
	], (err, result) => {
		return callback(err, result);
	});
};

CategoryService.prototype.delete = function (userId, categoryId, callback) {
	async.waterfall([
		(callback) => {
			Category.findOneAndRemove({ _id: categoryId }, (err, category, result) => {
				if(err) {
					return callback(err, null);
				};

				if(isEmpty(category)) {
					var err = new Error('Category does not exists');
					return callback(err, null);
				}

				return callback(null, result);
			 });
		},
		(result, callback) =>{		
			var type = CONST.history.type.HARD_DELETE;
			
			HistoryRepository.addCategoryEvent(userId, categoryId, type, (err, history) => {
				if(err) {
					return callback(err, null);
				}

				return callback(null, history);
			});
		},
	], (err, result) => {
		return callback(err, result);
	});
}

CategoryService.prototype.update = function (userId, categoryId, data, callback) {
	 async.waterfall([
		(callback) => {
			CategoryRepository.getByTitle(data.title, (err, category) => {
				if(err) {
					return callback(err, null);
				}

				if(!isEmpty(category)) {
					var err = new Error('Category already exists');
					return callback(err, null);
				}

				return callback(null);
			});
		}, (callback) => {
			Category.findOneAndUpdate({ _id: categoryId }, data, (err, category) => {
				if(err) {
					return callback(err, null);
				}

				if(isEmpty(category)) {
					var err = new Error('Category does not exists');
					return callback(err, null);
				}

				return callback(null, category);
			});
		},
		(category, callback) => {
			var type = CONST.history.type.UPDATE;

			HistoryRepository.addCategoryEvent(userId, categoryId, type, (err, history) => {
				if(err) {
					return callback(err, null)
				}

				return callback(null, history);
			});
		},
	], (err, result) => {
		return callback(err, result);
	});
}

module.exports = new CategoryService();
