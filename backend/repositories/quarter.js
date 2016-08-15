var mongoose = require('mongoose');
var Repository = require('../units/Repository');
var Quarter = require('../schemas/quarter');

var QuarterRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = Key;
};

QuarterRepository.prototype = new Repository();


module.exports = new KeyRepository();