import data_for_recycle from '../components/mockData/data_for_recycle_bin.js'

const initialState = {
    recycleBinItems: data_for_recycle,
	searchValue: '',
	showRecycleBinFilters: false,
	visibleItems: updateVisibleItems(data_for_recycle, "", "", "", true, false, false, false, ""),
	setRecycleBinFilterDateFrom: '',
	setRecycleBinFilterDateTo: '',
	usersNames: getAllNames(data_for_recycle),
	objectiveType: true,
	keyType: false,
	sortByDate: false,
	categoryType: false,
	categoryOrTypeFilter: "",
	userName: ""
};

export default function historyReducer(state = initialState, action) {
    switch (action.type) {

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

    		console.log("SRABOTALO");

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

	for (let i = 0; i < items.length; i++) {
		if (names.indexOf(items[i].deletedBy.fullName) === -1) {
			names.push({name: items[i].deletedBy.fullName, id: names.length});
		}
	}

	return names;

}

function updateVisibleItems(items, dateFrom, dateTo, categoryOrTypeFilter, objectiveType, keyType, sortByDate, categoryType, userName) {

	let initVisibleItems = filterDate(items, dateFrom, dateTo);

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

		visibleItems = JSON.parse(JSON.stringify(data_for_recycle));

    }
    else if(dateFrom == '' && dateTo != '') {
    	items = JSON.parse(JSON.stringify(data_for_recycle));
        for (let i = 0; i < items.length; i++) {
	       	if (dateTo >= data_for_recycle[i].deletedDate) {
	            visibleItems.push(data_for_recycle[i]);
	       	}
	    }
	}
    else if(dateFrom != '' && dateTo == ''){
    	items = JSON.parse(JSON.stringify(data_for_recycle));
    	 for (let i = 0; i < items.length; i++) {
	       	if (dateFrom <= data_for_recycle[i].deletedDate) {
	            visibleItems.push(data_for_recycle[i]);
	       	}
	    }
	}
	else {
		items = JSON.parse(JSON.stringify(data_for_recycle));
	   for (let i = 0; i < items.length; i++) {
	       	if (dateFrom <= data_for_recycle[i].deletedDate && dateTo >= data_for_recycle[i].deletedDate) {
	            visibleItems.push(data_for_recycle[i]);
	       	}
	    }
	}
    return visibleItems;
}