import data_for_recycle from '../components/mockData/data_for_recycle_bin.js'

const initialState = {
    recycleBinItems: [],
	searchValue: '',
	objectiveForUpdate: [],
	showRecycleBinFilters: false,
	visibleItems: [],
	setRecycleBinFilterDateFrom: '',
	setRecycleBinFilterDateTo: '',
	usersNames: [],
	objectiveType: true,
	keyType: false,
	sortByDate: false,
	categoryType: false,
	categoryOrTypeFilter: "",
	userName: ""
};

export default function recBynReducer(state = initialState, action) {
    
    switch (action.type) {

    	case "REC_BYN_CLEAR": {
    	return Object.assign({}, state, {
				recycleBinItems: [],
				visibleItems: []
			});
    	}

    	case "REC_BYN_GET_USER_OBJECTIVES_REQUEST_ERROR": {
    		
    		const {data} = action;

    		console.log("REC_BYN_GET_USER_OBJECTIVES_REQUEST_ERROR");

    		console.log(data);


			return Object.assign({}, state, {
			})
        }

        case "REC_BYN_RECEIVED_USER_OBJECTIVES": {

    		const {data} = action;

    		//console.log(data);

    		let newRecycleBinItems = JSON.parse(JSON.stringify(state.recycleBinItems));  


    		let objectiveForUpdate = [];		

    		let key = {};

    		key.type = "key";

			for (let i = 0; i < data.length; i++) {
				
				if (data[i].isDeleted === true)
					continue;

				for (let j = 0; j < data[i].keyResults.length; j++) {

					if (data[i].keyResults[j].isDeleted) {

						key.id = data[i].keyResults[j]._id;

						key.category = data[i].templateId.category.title;

						key.title = data[i].keyResults[j].templateId.title;

						key.description = data[i].templateId.description;

						if (data[i].keyResults[j].deletedBy == null) 
		    				key.deletedBy = "default";
		    			else
			    			key.deletedBy = data[i].keyResults[j].deletedBy.userInfo.firstName + " " + data[i].keyResults[j].deletedBy.userInfo.lastName;

			    		if (data[i].keyResults[j].deletedDate == null)
			    			key.deletedDate = "2016-07-22T10:51:12.643Z";
			    		else
			    			key.deletedDate = data[i].keyResults[j].deletedDate;

			    		let copy = Object.assign({}, key);

			    		newRecycleBinItems.push(copy);

			    		objectiveForUpdate.push(data[i]);
			    	}
					
				}
			}

			return Object.assign({}, state, {
				recycleBinItems: newRecycleBinItems,
				visibleItems: updateVisibleItems(newRecycleBinItems, state.setRecycleBinFilterDateFrom,
					state.setRecycleBinFilterDateTo, state.categoryOrTypeFilter, state.objectiveType, 
					state.keyType, state.sortByDate, state.categoryType, state.userName),
					usersNames: getAllNames(newRecycleBinItems),
				objectiveForUpdate: objectiveForUpdate
			})
        }

    	case "REC_BYN_UPDATE_USER_DELETED_OBJECTIVES_REQUEST_ERROR": {
    		
    		const {data} = action;

    		console.log("REC_BYN_UPDATE_USER_OBJECTIVES_REQUEST_ERROR");

	    	return Object.assign({}, state);
    	}

    	case "REC_BYN_RECEIVED_USER_DELETED_OBJECTIVES": {

    		const {data} = action;

    		let newRecycleBinItems = JSON.parse(JSON.stringify(initialState.recycleBinItems));

    		let objective = {};

    		objective.type = "objective";

    		for (let i = 0; i < data.length; i++) {
    			
    			objective.id = data[i]._id;
    			objective.category = data[i].templateId.category.title;
    			objective.title = data[i].templateId.title;
    			objective.description = data[i].templateId.description;

    			if (data[i].deletedBy == null) 
    				objective.deletedBy = "default";
    			else
	    			objective.deletedBy = data[i].deletedBy.userInfo.firstName + " " + data[i].deletedBy.userInfo.lastName;

	    		if (data[i].deletedDate == null)
	    			objective.deletedDate = "2016-07-22T10:51:12.643Z";
	    		else
	    			objective.deletedDate = data[i].deletedDate;

    			let copy = Object.assign({}, objective);

    			newRecycleBinItems.push(copy);

    		}

			return Object.assign({}, state, {
				recycleBinItems: newRecycleBinItems,
				visibleItems: updateVisibleItems(newRecycleBinItems, state.setRecycleBinFilterDateFrom,
					state.setRecycleBinFilterDateTo, state.categoryOrTypeFilter, state.objectiveType, 
					state.keyType, state.sortByDate, state.categoryType, state.userName),
					usersNames: getAllNames(newRecycleBinItems)

			})
        }

        case "UPDATE-ALL": {

    		const {dateFrom, dateTo, categoryOrTypeFilter, objectiveType, keyType, sortByDate, categoryType, userName} = action;

			return Object.assign({}, state, {
				setRecycleBinFilterDateFrom: dateFrom,
				setRecycleBinFilterDateTo: dateTo,
				categoryOrTypeFilter: categoryOrTypeFilter,
				objectiveType: objectiveType,
				keyType: keyType,
				sortByDate: sortByDate,
				categoryType: categoryType,
				userName: userName,
				visibleItems: updateVisibleItems(state.recycleBinItems, dateFrom,
					dateTo, categoryOrTypeFilter, objectiveType, 
					keyType, sortByDate, categoryType, userName)
			})
        }

        case "REC_BYN_DELETE_ITEM_FROM_STATE": {
    		
    		const {id} = action;

    		for (let i = 0; i < state.recycleBinItems.length; i++) {

    			if (id === state.recycleBinItems[i].id) {

    				state.recycleBinItems.splice(i, 1);
    				break;
    			}
    		}

			return Object.assign({}, state, {
				recycleBinItems: state.recycleBinItems,
				visibleItems: updateVisibleItems(state.recycleBinItems, state.setRecycleBinFilterDateFrom,
					state.setRecycleBinFilterDateTo, state.categoryOrTypeFilter, state.objectiveType, 
					state.keyType, state.sortByDate, state.categoryType, state.userName)
			})
        }

        case "SEARCH_OBJECTS": {
    		const {searchValue} = action;
			return Object.assign({}, state, {
				searchValue
			})
        }



    	case "REC_BYN_GET_USER_DELETED_OBJECTIVES_REQUEST_ERROR": {
    		
    		const {data} = action;

    		console.log("REC_BYN_GET_USER_DELETED_OBJECTIVES_REQUEST_ERROR");

    		console.log(data);


			return Object.assign({}, state, {
			})
        }

        case "SET-USER-NAME": {

    		const {value} = action;

			return Object.assign({}, state, {
				userName: value,
				visibleItems: updateVisibleItems(state.recycleBinItems, state.setRecycleBinFilterDateFrom,
					state.setRecycleBinFilterDateTo, state.categoryOrTypeFilter, state.objectiveType, 
					state.keyType, state.sortByDate, state.categoryType, value)
			})
        }

        case "CATEGORY-TYPE-FILTER": {

    		const {value} = action;

			return Object.assign({}, state, {
				categoryOrTypeFilter: value,
				visibleItems: updateVisibleItems(state.recycleBinItems, state.setRecycleBinFilterDateFrom,
					state.setRecycleBinFilterDateTo, value, state.objectiveType, state.keyType, 
					state.sortByDate, state.categoryType, state.userName)
			})
        }

        case "SET_CATEGORY_TYPE": {

    		const {value} = action;

			return Object.assign({}, state, {
				categoryType: value,
				visibleItems: updateVisibleItems(state.recycleBinItems, state.setRecycleBinFilterDateFrom,
					state.setRecycleBinFilterDateTo, state.categoryOrTypeFilter, state.objectiveType, 
					state.keyType, state.sortByDate, value, state.userName)
			})
        }

        case "SET_OBJECTIVE_TYPE": {

    		const {value} = action;

			return Object.assign({}, state, {
				objectiveType: value,
				visibleItems: updateVisibleItems(state.recycleBinItems, state.setRecycleBinFilterDateFrom,
					state.setRecycleBinFilterDateTo, state.categoryOrTypeFilter, value, state.keyType, 
					state.sortByDate, state.categoryType, state.userName)
			})
        }

        case "SET_KEY_TYPE": {

    		const {value} = action;

			return Object.assign({}, state, {
				keyType: value,
				visibleItems: updateVisibleItems(state.recycleBinItems, state.setRecycleBinFilterDateFrom, 
				 state.setRecycleBinFilterDateTo, state.categoryOrTypeFilter, 
				 state.objectiveType, value, state.sortByDate, state.categoryType, state.userName)
			})
        }

        case "SET_SORTING_BY_DATE": {

    		const {value} = action;

			return Object.assign({}, state, {
				sortByDate: value,
				visibleItems: updateVisibleItems(state.recycleBinItems, state.setRecycleBinFilterDateFrom,
				 state.setRecycleBinFilterDateTo, state.categoryOrTypeFilter,
				 state.objectiveType, state.keyType, value, state.categoryType, state.userName)
			})
        }

		case "SHOW_FILTERS": {

			const {showRecycleBinFilters} = action;

			return Object.assign({}, state, {
				showRecycleBinFilters
			})
		}

    case "SET_RECYCLE_BIN_FILTER_DATE_FROM": {

			const {setRecycleBinFilterDateFrom} = action;

			return Object.assign({}, state, {
				setRecycleBinFilterDateFrom,
				visibleItems: updateVisibleItems(state.visibleItems, setRecycleBinFilterDateFrom, state.setRecycleBinFilterDateTo,
	        state.categoryOrTypeFilter, state.objectiveType, state.keyType, state.sortByDate, state.categoryType, 
	        state.userName)
			})
		}

    case "SET_RECYCLE_BIN_FILTER_DATE_TO": {

	      const {setRecycleBinFilterDateTo} = action;

	      return Object.assign({}, state, {
	        setRecycleBinFilterDateTo,
	        visibleItems: updateVisibleItems(state.visibleItems, state.setRecycleBinFilterDateFrom, setRecycleBinFilterDateTo,
	        state.categoryOrTypeFilter, state.objectiveType, state.keyType, state.sortByDate, state.categoryType, 
	        state.userName)
	      })
    }
        default: {
            return state;
        }
    }
}

function getAllNames(items) {

	let names = [];
	let found;

	for (let i = 0; i < items.length; i++) {

		found = false;

		for (let j = 0; j < names.length; j++) {
			if (names[j].name.indexOf(items[i].deletedBy) != -1) {
				found = true;
			}
		}

		if (!found) {
			names.push({name: items[i].deletedBy, id: names.length});
		}
	}

	return names;

}

function updateVisibleItems(items, dateFrom, dateTo, categoryOrTypeFilter, objectiveType, keyType, sortByDate, categoryType, userName) {

	//let initVisibleItems = filterDate(items, dateFrom, dateTo);

	let initVisibleItems = JSON.parse(JSON.stringify(items));

	let itemsAfterInputFilter = [];

	if (categoryOrTypeFilter === "") {
		itemsAfterInputFilter = initVisibleItems;
	}
	else {

		for (let i = 0; i < initVisibleItems.length; i++) {
			if (initVisibleItems[i].type.toUpperCase().indexOf(categoryOrTypeFilter.toUpperCase()) === 0 ||
				initVisibleItems[i].category.toUpperCase().indexOf(categoryOrTypeFilter.toUpperCase()) === 0)  {
				itemsAfterInputFilter.push(initVisibleItems[i])
			}
		}
	}

	let itemsAfterUserNameFilter = [];

	if (userName === "") {
		itemsAfterUserNameFilter = itemsAfterInputFilter;
	}
	else {

		for (let i = 0; i < itemsAfterInputFilter.length; i++) {
			if (itemsAfterInputFilter[i].deletedBy.fullName === userName)
				itemsAfterUserNameFilter.push(itemsAfterInputFilter[i]);
		}
	}

	initVisibleItems = itemsAfterUserNameFilter;

	let visibleItems = [];

	for (let i = 0; i < initVisibleItems.length; i++) {
		if (initVisibleItems[i].type === "objective" && objectiveType) {
			visibleItems.push(initVisibleItems[i]);
		}
		if (initVisibleItems[i].type === "key" && keyType) {
			visibleItems.push(initVisibleItems[i]);
		}
		if (initVisibleItems[i].type === "category" && categoryType) {
			visibleItems.push(initVisibleItems[i]);
		}
	}

	if (sortByDate) {
		visibleItems.sort(function(a, b) { return b.deletedDate < a.deletedDate;});
	}

	return visibleItems;
}

function filterDate(items, dateFrom, dateTo) { 

    let visibleItems = [];

    if(dateFrom == '' && dateTo == '') { 	

		visibleItems = JSON.parse(JSON.stringify(initialState.recycleBinItems));

    }
    else if(dateFrom == '' && dateTo != '') {
    	items = JSON.parse(JSON.stringify(initialState.recycleBinItems));
        for (let i = 0; i < items.length; i++) {
	       	if (dateTo >= initialState.recycleBinItemse[i].deletedDate) {
	            visibleItems.push(initialState.recycleBinItems[i]);
	       	}
	    }
	}
    else if(dateFrom != '' && dateTo == ''){
    	items = JSON.parse(JSON.stringify(initialState.recycleBinItems));
    	 for (let i = 0; i < items.length; i++) {
	       	if (dateFrom <= initialState.recycleBinItems[i].deletedDate) {
	            visibleItems.push(initialState.recycleBinItems[i]);
	       	}
	    }
	}
	else {
		items = JSON.parse(JSON.stringify(initialState.recycleBinItems));
	   for (let i = 0; i < items.length; i++) {
	       	if (dateFrom <= initialState.recycleBinItems[i].deletedDate && dateTo >= initialState.recycleBinItems[i].deletedDate) {
	            visibleItems.push(initialState.recycleBinItems[i]);
	       	}
	    }
	}
    return visibleItems;
}