var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var UserInfo = require('../schemas/userInfo');

var UserInfoRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = UserInfo;
};

UserInfoRepository.prototype = new Repository();

module.exports = new UserInfoRepository();