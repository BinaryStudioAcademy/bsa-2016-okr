var CategoryRepository = require('../repositories/category'),
  HistoryRepository = require('../repositories/history'),
  ObjectId = require('mongoose').Types.ObjectId,
  async = require('async');

var CategoryService = function() {};
/*
CategoryService.prototype.add = function(title, callback){
  /*
  console.log("CategoryService hit");
  CategoryRepository.add(title, function(err, data){
    if (err){
      return callback(err, null);
    };
    console.log("CategoryRepository hit");
    callback(err, null);
  });
 console.log("check history");
 console.log(title);
  HistoryRepository.add(title, function(err, data){
    if (err){
      return callback(err, null);
    };
    console.log("CategoryRepository hit");
    callback(err, null);
  });
*/
/*
 	async.waterfall([
 		addCategory,
 		addEventToHistory,
 	], (err, result) => {
 		callback(err);
 	});
*/

//  CategoryRepository.add(title, callback);
//    var history = {
//      type: "added new category",
//    }
  //HistoryRepository.add(history, callback);

//};

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

module.exports = new CategoryService();
