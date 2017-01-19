var Repository = function(){};

Repository.prototype.add = function(data, callback){
	var model = this.model;
	var newitem = new model(data);
	newitem.save(callback);
};

Repository.prototype.update = function(id, body, callback){
	var model = this.model;
	var query = model.update({_id:id}, body);
	query.exec(callback);
};

Repository.prototype.delete = function(id, callback){
	var model = this.model;
	var query = model.remove({_id:id});
	query.exec(callback);
};

Repository.prototype.getAll = function(callback){
	var model = this.model;
	var query = model.find();
	query.exec(callback);
};

Repository.prototype.getById = function(id, callback){
	var model = this.model;
	var query = model.findOne({_id:id});
	query.exec(callback);
};

Repository.prototype.getFieldsById = function(id, fields, callback){
	var model = this.model;
	var query = model.findOne({_id:id}, fields);
	query.exec(callback);
};

Repository.prototype.getAllNotDeleted = function(callback) {
	var model = this.model;
	var query = model.find({'isDeleted': 'false'});
	query.exec(callback);
};

Repository.prototype.getAllDeleted = function(callback) {
	var model = this.model;
	var query = model.find({'isDeleted': 'true'});
	query.exec(callback);
};

Repository.prototype.getNotDeleted = function(id, callback) {
	var model = this.model;
	var query = model.findOne({_id:id}, {'isDeleted': 'false'});
	query.exec(callback);
};

Repository.prototype.setToDeleted = function(id, callback) {
	var model = this.model;
	var query = model.update({_id:id}, {$set: {'isDeleted': 'true'} });
	query.exec(callback);
};

Repository.prototype.setToNotDeleted = function(id, callback) {
	var model = this.model;
	var query = model.update({_id:id}, {$set: {'isDeleted': 'false'} });
	query.exec(callback);
};

Repository.prototype.getCount = function() {
	var model = this.model;

	model.count({}, function(err, count) {
		console.log( "Count :", count );
	});
}

Repository.prototype.changeIsArchivedTo= function (id, flag, callback) {
	var model = this.model;

	var query = model.update({_id:id}, {$set: {'isArchived': flag}});
	query.exec(callback);
}

Repository.prototype.paginate = function (start, limit, sort, query = {}, callback) {
	var model = this.model;
	var query = model.find(query).sort(sort).skip(start).limit(limit);
	return query;
};

module.exports = Repository;
