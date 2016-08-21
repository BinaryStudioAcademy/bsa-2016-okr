var _ = require('lodash');
var HistoryRepository = require('../repositories/history');

var HistoryService = function(){

};

HistoryService.prototype.generateNotification = function(){

};

HistoryService.prototype.sortBy = function (eventList, sortField, callback) {
	 var sortedList = eventList.slice();
	 console.log('sorting');
	 switch(sortField){
	 	case 'date':
	 		sortedList.sort((a, b) => {
	 			let dateA = Date.parse(a.createdAt);
	 			let dateB = Date.parse(b.createdAt);

	 			return dateA - dateB;
	 		});
	 	break;
	 	// case 'user':
	 	// 	sortedList.sort((a, b) => {

	 	// 	});
	 	// break;
	 	case 'action':
	 		console.log('sorting by action');
	 		function sorting (a, b) {
	 			let actionA = a.type.split(' ')[0];
	 			let actionB = b.type.split(' ')[0];
	 			console.log('\nactionA - ' + actionA);
	 			console.log('\nactionB - ' + actionB);
	 			console.log('\nreturn - ' + actionA > actionB);
	 			if(actionA > actionB)
	 				return 1
	 			else if(actionA < actionB)
	 				return -1
	 			else return 0;  
	 		};
	 		sortedList.sort(sorting);
	 		console.log('----sortedList-------: ')
	 		console.log(sortedList);
	 	break;
	 	// case 'object':
	 	// 	sortedList.sort((a, b) => {
	 	
	 	// 	})
	 	// break;
	 	default: break; 
	 }
	 //console.log(sortedList);

	 return callback(sortedList);
}

HistoryService.prototype.filterBy = function (eventList, filters, callback) {
	//console.log(eventList);
		var filteredList = eventList.filter( (item) => {
		let isFiltered = true;
		for (let key in filters){

				if( key  == "type" && filters[key] !== '' && filters[key] !== ' '){
					if(item.type.indexOf(filters[key]) === -1)
					{
						console.log('123');
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
							console.log(new Date(item.createdAt));
							isFiltered = false;
					}	
				};
		}
		return isFiltered;
	})

	return callback(filteredList);
}


module.exports = new HistoryService();