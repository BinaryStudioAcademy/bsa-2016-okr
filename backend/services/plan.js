var _ = require('lodash');
var PlanRepository = require('../repositories/plan');

var PlanService = function(){


};

PlanService.prototype.generateNotification = function(){


};

PlanService.prototype.getPlanByUserId(id, callback){
	PlanRepository.getPlanByUserId(id, function(err, plan){
		if (err){
			return callback(err, null);
		};

		callback(err, plan);
	});

};

PlanService.prototype.createPlan(plan, callback){
	PlanRepository.add(plan, function(err, plan){
		if (err){
			return callback(err, null);
		};

		callback(err, plan);		
	});
};


PlanService.prototype.editPlan(id, body, callback){
	PlanRepository.update(id, body, function(err, plan){
		if (err){
			return callback(err, null);
		};

		callback(err, plan);	
	});
};

PlanService.prototype.deletePlan(id, callback){
	PlanRepository.delete(id, function(err. plan){
		if (err){
			return callback(err, null);
		};

		callback(err, plan);	
	});
};

module.exports = new PlanService();