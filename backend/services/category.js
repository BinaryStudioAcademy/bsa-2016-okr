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
CategoryService.prototype.softDelete = function (data, callback) {
	 async.waterfall([
		(callback) => {
			CategoryRepository.update(data.categoryId, data.body, (err, result) => {
				if(err){
					return  callback(err, null);
				};
				return callback(null, data);
			});
		},
		(data, callback) =>{
      var type = "restore Category";
      if(data.body.isDeleted == 1){
        type = "soft delete Category";
      }
      var body = {
        authorId: ObjectId(data.userId),
        categoryId: ObjectId(data.categoryId),
        type: type
      }
      HistoryRepository.add(body, callback);
    },
	], (err, result) => {
		return callback(err, result);
	});
}

CategoryService.prototype.delete = function (data, callback) {
	 async.waterfall([
     (callback) => {
       CategoryRepository.getById(data.categoryId, (err, result) => {
         if(err){
           return  callback(err, null);
         };
         return callback(null, result, data);
       });
     },
		(result, data, callback) => {
      if(result.isDeleted == false){
        return callback(true);
      }
			CategoryRepository.delete(data.categoryId, (err, end) => {
				if(err){
					return  callback(err, null);
				};
				return callback(null, result, data);
			});
		},
		(result, data, callback) =>{
      var type = 'hard delete Category "' + result.title + '"';
      var body = {
        authorId: ObjectId(data.userId),
        categoryId: ObjectId(data.categoryId),
        type: type
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
