var CategoryRepository = require('../repositories/category.js');

var CategoryService = function() {
};

CategoryService.prototype.add = function(title, callback){
  console.log("CategoryService hit");
  CategoryRepository.add(title, function(err, data){
    if (err){
      return callback(err, null);
    };
    console.log("CategoryRepository hit");
    callback(err, null);
  });
};
