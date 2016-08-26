var async = require('async');
var ObjectId = require('mongoose').Types.ObjectId;
var CategoryRepository = require('../repositories/category');
var Category = require('../schemas/category');
var HistoryRepository = require('../repositories/history');

var ValidateService = require('../utils/ValidateService');
var CONST = require('../config/constants');

var CategoryService = function() {};

CategoryService.prototype.add = function(userId, data, callback) {
	 async.waterfall([
		(callback) => {
			CategoryRepository.getByTitle(data.title, (err, category) => {
				if(err) {
					return callback(err, null);
				}

				if(!ValidateService.isEmpty(category)) {
					let err = new Error('Category already exists');
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
			var historyEvent = {
				authorId: userId,
				categoryId: category._id,
			};

			HistoryRepository.addCategoryEvent(historyEvent, CONST.history.type.ADD, (err, history) => {
				if(err) {
					return callback(err, null);
				}

				return callback(null);
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

				if(ValidateService.isEmpty(category)) {
					let err = new Error('Category does not exists');
					return callback(err, null);
				}

				return callback(null, category);
			});
		},
		(category, callback) => {
			if(category.isDeleted === data.isDeleted) {
				return callback(null);
			}
			
			let type = data.isDeleted ? CONST.history.type.SOFT_DELETE : CONST.history.type.RESTORE;
			
			var historyEvent = {
				authorId: userId,
				categoryId: category._id,
			};

			HistoryRepository.addCategoryEvent(historyEvent, type, (err, history) => {
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

				if(ValidateService.isEmpty(category)) {
					let err = new Error('Category does not exists');
					return callback(err, null);
				}

				return callback(null, result);
			 });
		},
		(result, callback) =>{
			var historyEvent = {
				authorId: userId,
				categoryId: categoryId,
			};
			
			let type = CONST.history.type.HARD_DELETE;
			
			HistoryRepository.addCategoryEvent(historyEvent, type, (err, history) => {
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
			Category.findOneAndUpdate({ _id: categoryId }, data, (err, category) => {
				if(err) {
					return callback(err, null);
				}

				if(ValidateService.isEmpty(category)) {
					let err = new Error('Category does not exists');
					return callback(err, null);
				}

				return callback(null, category);
			});
		},
		(category, callback) => {
			var historyEvent = {
				authorId: userId,
				categoryId: category._id,
			};

			let type = CONST.history.type.UPDATE;

			HistoryRepository.addCategoryEvent(historyEvent, type, (err, history) => {
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
