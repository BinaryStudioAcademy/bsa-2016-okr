var _ = require('lodash');
var PlanRepository = require('../repositories/plan');
var HistoryRepository = require('../repositories/history');
var async = require('async');


var PlanService = function(){

};

PlanService.prototype.generateNotification = function(){

};

PlanService.prototype.update = function (userId, planId, body, callback) {
	 async.waterfall([
	 	(callback) => {
	 		PlanRepository.update(planId, body, (err, plan) => {
	 			if(err){
	 				return callback(err, null);
	 			};
	 			return callback(null, plan);
	 		})
	 	},
	 	(plan, callback) => {
	 		HistoryRepository.addPlanEvent(userId, plan._id, "update Plan", (err) => {
	 			if (err){
	 				return callback(err, null);
	 			};
	 			return callback(null, plan);
	 		});
	 	}
	 ], (err, result) => {
	 		return callback(err, result)
	 });
};

PlanService.prototype.add = function (userId, plan, callback) {
	 async.waterfall([
		(callback) => {
			PlanRepository.add(plan, (err, plan) => {
				if(err){
					return  callback(err, null);
				};
				return callback(null, plan);
			});
		},
		(plan, callback) =>{
			HistoryRepository.addPlanEvent(userId, plan._id, "add Plan", (err) => {
				if(err){
					return  callback(err, null);
				};
				return callback(null, plan);
			});
		}
	], (err, result) => {
		return callback(err, result)
	})

};

PlanService.prototype.delete = function (userId, planId, callback){
	async.waterfall([
		(callback) => {
			PlanRepository.delete(planId, (err, plan) => {
				if(err){
					return callback(err, null);
				};
				return callback(null, plan);
			});
		},
		(plan, callback) => {
			HistoryRepository.addPlanEvent(userId, planId, "delete Plan", (err) => {
				if(err){
					return callback(err, null);
				};
				return callback(null, plan);
			});
		}
	], (err, result) =>{
		return callback(err, result);
	});
};

module.exports = new PlanService();