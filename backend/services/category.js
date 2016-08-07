var CategoryRepository = require('../repositories/category');
var HistoryRepository = require('../repositories/history');
var async = require('async');

var CategoryService = function() {};

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

  CategoryRepository.add(title, callback);
    var history = {
      type: "added new category",
    }
  //HistoryRepository.add(history, callback);

};

module.exports = new CategoryService();
