var _ = require('lodash');
var HistoryRepository = require('../repositories/history');
var UserService = require('./user.js')
var UserObjectiveRepository = require('../repositories/userObjective');
var moment = require('moment');
const async = require('async');

var HistoryService = function(){

};

HistoryService.prototype.generateNotification = function(){
};

HistoryService.prototype.getUserHistory = function (id, callback) {
	async.waterfall([
		(callback) => {
			UserObjectiveRepository.getByUserIdPopulate(id, (err, objectives)=>{
				if(err)
					return callback(err, null);
				return callback(null, objectives);
			})
		},
		(objectives, callback) => {
			var historyList = [];
			objectives.forEach((obj) => {
				historyList.push(obj._id);
			})

			return callback(null, historyList);
		}, (historyList, callback) => {
			var list = [];
			var i = 0;
			(function forEachInList () {
				HistoryRepository.getUserObjectiveHistoryPopulate(historyList[i], (err, result) => {
						if(err) {
							return callback(err, null);
						}
						
						if(result.length > 0) {
							if(Array.isArray(result)) {
								result.forEach((item)=> { list.push(item) });
							} else {
								list.push(result);
							}
						}

						++i;

						if(i<= historyList.length && historyList[i] != null) {
							forEachInList()
						}	else {
							return callback(null, list);
						}
				});
			})();
		}, (historyList, callback) => {
			HistoryRepository.getHistoryByUserIdPopulate(id, (err, result) => {
				if(err)
					return callback(err, null)
				result.forEach((item) => {
					historyList.push(item);
				})
				return callback(err, historyList);
				
			})
		},(historyList, callback) => {
			if(historyList.length > 0) {
				this.sortBy(historyList, 'date', true, (historyList) => {					
					return callback(null, historyList)
				});
			}	else {
				return callback(null, historyList)
			}
		}
	], (err, result) => {
		return callback(err, result);
	})
};

HistoryService.prototype.sortBy = function (eventList, sortField, sortWay, callback) {
	var sortedList = eventList.slice();
	var sortWayNum;
	
	if (sortWay)
		sortWayNum = -1
	else 
		sortWayNum = 1;

	switch(sortField){
	 	case 'date':
	 		sortedList.sort((a, b) => {
	 			var dateA = Date.parse(a.createdAt);
	 			var dateB = Date.parse(b.createdAt);

	 			return (dateA - dateB) * sortWayNum;
	 		});
	 	break;
	 	case 'user':
	 		sortedList.sort((a, b) => {
	 			var nameA = a.author.userInfo.firstName + " " + a.author.userInfo.lastName;
	 			var nameB = b.author.userInfo.firstName + " " + b.author.userInfo.lastName;
	 			if(nameA === nameB)
	 				return 0
	 			else if(nameA > nameB)
	 				return sortWayNum
	 			else return sortWayNum * -1;
	 		});
	 	break;
	 	case 'action':
	 		function sorting (a, b) {
	 			var actionA = a.type.split(' ')[0];
	 			var actionB = b.type.split(' ')[0];

	 			if(actionA > actionB)
	 				return sortWayNum
	 			else if(actionA < actionB)
	 				return -1 * sortWayNum
	 			else return 0;
	 		};

	 		sortedList.sort(sorting);
	 	break;
	 	case 'target': 
	 		function getHistoryObjectName(historyItem){
      			if(historyItem.type.indexOf('USER_OBJECTIVE') !== -1){
       				return historyItem.userObjective.templateId.title;
      			};

      			if(historyItem.type.indexOf('OBJECTIVE') !== -1){
        			return historyItem.objective.title;
       			};

      			if(historyItem.type.indexOf('KEY_RESULT') !== -1){
      				if(historyItem.userObjective){
        				var keyResults = historyItem.userObjective.keyResults;
	        			var keyResult;
	        			keyResults.forEach((key) => {
	        				if (key.templateId._id.toString() === historyItem.userKeyResult.toString() 
	        					|| key._id.toString() === historyItem.userKeyResult.toString()){
	          					keyResult = key;
	          				}
	       				})
	      				return keyResult.templateId.title;
	      			}
	      			else return historyItem.keyResult.title;
      			}
    		}
 			
	 		sortedList.sort((a, b) => {
	 			var targetA = getHistoryObjectName(a);
	 			var targetB = getHistoryObjectName(b);
	 			if(targetA === targetB)
	 				return 0
	 			else if(targetA > targetB)
	 				return sortWayNum
	 			else return sortWayNum * -1;
	 		});
	 	break;
	 	default: break; 
	}

	return callback(sortedList);
};

HistoryService.prototype.filterBy = function (eventList, filter, callback) {
	var filters = filter;
	if(filters.date.from == ''){
		filters.date.from = '2000-01-01';
	}

	if(filters.date.to == ''){
		filters.date.to = '2020-08-15';
	}

	var filteredList = eventList.filter( (item) => {
		var isFiltered = true;

		for (var key in filters)
		{
			var type = item.type.toLowerCase();
			if( key  == "type" && filters[key] !== '' && filters[key] !== ' '){
				if(type.indexOf(filters[key]) === -1)
					{
						if(filters[key] !== 'update' || type.indexOf('change') === -1)
							isFiltered = false;
					}
				};
					
			if ( key == "date" && isFiltered
				&& !isNaN(Date.parse(filters[key].from)) 
				&& !isNaN(Date.parse(filters[key].to))) 
			{	
				if (!( Date.parse(item.createdAt) >= Date.parse(filters[key].from) )
				 || !( Date.parse(item.createdAt) <= Date.parse(filters[key].to)) )
				{
					isFiltered = false;
				}	
			};		

			if(key == "name" && filters[key] !== '' && filters[key] !== ' '){
				var name = item.author.userInfo.firstName + ' ' + item.author.userInfo.lastName;
				if(name.toLowerCase().indexOf(filters[key].toLowerCase()) === -1)
					isFiltered = false;
			}
		}
		return isFiltered;
	})

	return callback(filteredList);
};

HistoryService.prototype.getSortedAndFiltered = function (filters, sort, callback) {
	async.waterfall([
		(callback) => {
			HistoryRepository.getHistory((err, result) => {
				if(err) {
					return callback(err, result);
				}

				return callback(null, result.slice());	
			});
		},
		(result, callback) => {
			if(filters !== null )
				this.filterBy(result, filters, (res) => {
					result = res.slice();
				})

			return callback(null, result);
		},
		(result, callback) => {
			if(sort !== null && sort.sortField !== '')
				this.sortBy(result, sort.sortField, sort.up, (res) => {
					result = res.slice();				
				})

			return callback(null, result)
		}
	], (err, result) => {
		return callback(err, result);
	})
};

HistoryService.prototype.getHistory = function (callback) {
	async.waterfall([
		(callback) =>{
			HistoryRepository.getHistory((err, result) => {
				if(err)
					return callback(err, null);
				return callback(null, result);
			})
		},
		(history, callback) => {
			this.sortBy(history, 'date', true, (result) => {
				return callback(null, result);
			})
		}
	], (err, result) => {
		return callback(err, result);
	})
}
module.exports = new HistoryService();