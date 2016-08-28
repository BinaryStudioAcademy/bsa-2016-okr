var _ = require('lodash');
var HistoryRepository = require('../repositories/history');
var UserService = require('./user.js')
var moment = require('moment');

var HistoryService = function(){

};

HistoryService.prototype.generateNotification = function(){

};

HistoryService.prototype.getUserHistory = function (id, callback) {
	async.waterfall([
		(callback) => {
			UserService.getById(id, (err, user) => {
				if(err)
					return callback(err, null);
				console.log('---------user:');
				console.log(user);
				return callback(null, user);
			})
		},
		(user, callback) => {
			console.log('-----------getting history')
			let historyList =[];
			user.quarters.forEach((quarter, i) => {
				// console.log('in quarters');
				// console.log(quarter);
				quarter.userObjectives.forEach((objective, i) => {
					// console.log('in quartrer:  ');
					// console.log(objective);

					historyList.push(objective._id);
					// HistoryRepository.getObjectiveHistoryPopulate(objective._id, (err, result) => {
					// 	if(err)
					// 		return callback(err, null);
					// 	if( result !== []){
					// 		console.log('result: ' );
					// 		console.log(result);
					// 		historyList.push(result)
					// 	}
					//})
				})
			})
			console.log('-----------returning this');
			console.log(historyList);
			return callback(null, historyList);
		},
		(historyList, callback) => {
			let list= [];
			let i = 0;
			(function forEachInList () {
				HistoryRepository.getUserObjectiveHistoryPopulate(historyList[i], (err, result) => {
						if(err)
							return callback(err, null);
						if( result.length > 0) {
							console.log('result: ' );
							console.log(result);
							if(Array.isArray(result))
								result.forEach((item)=> { list.push(item)})
							else list.push(result)
							
						};
						++i;
						if(i<= historyList.length && historyList[i] != null)
							forEachInList()
						else
						{
							console.log('-----++++++++++++++++There is');
							console.log(list);
							return callback(null, list);
						}
				})
			})();
			// historyList.forEach((id) => {
			// 	HistoryRepository.getObjectiveHistoryPopulate(id, (err, result) => {
			// 			if(err)
			// 				return callback(err, null);
			// 			if( result !== []){
			// 				console.log('result: ' );
			// 				console.log(result);
			// 				list.push(result)
			// 			}
			// 	})
			// })
			
		}
	], (err, result) => {
		return callback(err, result);
	})
}

HistoryService.prototype.sortBy = function (eventList, sortField, sortWay, callback) {
	var sortedList = eventList.slice();
	var sortWayNum;
	
	if (sortWay)
		sortWayNum = -1
	else 
		sortWayNum = 1;
	console.log('here we are')
	switch(sortField){
	 	case 'date':
	 		console.log('sort is here')
	 		sortedList.sort((a, b) => {
	 			let dateA = Date.parse(a.createdAt);
	 			let dateB = Date.parse(b.createdAt);

	 			return (dateA - dateB) * sortWayNum;
	 		});
	 	break;
	 	// case 'user':
	 	// 	sortedList.sort((a, b) => {

	 	// 	});
	 	// break;
	 	case 'action':

	 		function sorting (a, b) {
	 			let actionA = a.type.split(' ')[0];
	 			let actionB = b.type.split(' ')[0];

	 			if(actionA > actionB)
	 				return sortWayNum
	 			else if(actionA < actionB)
	 				return -1 * sortWayNum
	 			else {
	 				let actionA = a.type.split(' ')[1];
	 				let actionB = b.type.split(' ')[1];
	 				
	 				if(actionA > actionB)
	 					return sortWayNum
	 				else if(actionA < actionB)
	 					return -1 * sortWayNum
	 				else return 0;
	 			};  
	 		};

	 		sortedList.sort(sorting);
	 	break;
	 	default: break; 
	}
	console.log('back');
	console.log(sortedList);
	 return callback(null, sortedList);
}

HistoryService.prototype.filterBy = function (eventList, filter, callback) {
	var filters = filter;
	console.log(filters.date);
	if(filters.date.from == ''){
		filters.date.from = '2000-01-01';
	}

	if(filters.date.to == ''){
		filters.date.to = '2020-08-15';
	}

	var filteredList = eventList.filter( (item) => {
	let isFiltered = true;
	

	for (let key in filters)
	{
		if( key  == "type" && filters[key] !== '' && filters[key] !== ' '){
			if(item.type.indexOf(filters[key]) === -1)
				{
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
		}
		return isFiltered;
	})

	return callback(filteredList);
}


module.exports = new HistoryService();