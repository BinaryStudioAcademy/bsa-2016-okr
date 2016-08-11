var CategoryRepository = require('../repositories/category'),
  HistoryRepository = require('../repositories/history'),
  ObjectId = require('mongoose').Types.ObjectId,
  async = require('async');

var CategoryService = function() {};
//Done
CategoryService.prototype.add = function (userId, data, callback) {
	 async.waterfall([
		(callback) => {
			CategoryRepository.add(data, (err, data) => {
				if(err){
					return  callback(err, null);
				};
				return callback(null, data);
			});
		},
		(data, callback) =>{
      var body = {
        authorId: ObjectId(userId),
        categoryId: ObjectId(data._id),
        type: "add Category"
      }
      HistoryRepository.add(body, callback);
    },
	], (err, result) => {
		return callback(err, result);
	});
}
//Done
CategoryService.prototype.delete = function (data, callback) {
	 async.waterfall([
		(callback) => {
			CategoryRepository.update(data.categoryId, data.delete, (err, result) => {
				if(err){
					return  callback(err, null);
				};
				return callback(null, data);
			});
		},
		(data, callback) =>{
      var body = {
        authorId: ObjectId(data.userId),
        categoryId: ObjectId(data.categoryId),
        type: "soft delete Category"
      }
      HistoryRepository.add(body, callback);
    },
	], (err, result) => {
		return callback(err, result);
	});
}
//Done
CategoryService.prototype.update = function (data, callback) {
	 async.waterfall([
		(callback) => {
      var fields = Object.assign({}, data.body);
      fields._id = 0;
      CategoryRepository.getFieldsById(data.categoryId, fields, (err, original) => {
        if(err){
          return  callback(err, null);
        };
        return callback(null, original);
      });
    },
    (original, callback) =>{
			CategoryRepository.update(data.categoryId, data.body, (err, result) => {
				if(err){
					return  callback(err, null);
				};
				return callback(null, result, original);
			});
		},
		(result, original, callback) =>{
      var body = {
        authorId: ObjectId(data.userId),
        categoryId: ObjectId(data.categoryId),
        type: "update Category",
        updateFrom: original,
        updateTo: data.body
      }
      HistoryRepository.add(body, callback);
    },
	], (err, result) => {
		return callback(err, result);
	});
}

module.exports = new CategoryService();
