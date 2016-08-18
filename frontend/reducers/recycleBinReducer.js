import data_for_recycle from '../components/mockData/data_for_recycle_bin.js'

const initialState = {
    recycleBinItems: data_for_recycle,
	searchValue: '',
	showRecycleBinFilters: false,
	visibleItems: data_for_recycle,
	setRecycleBinFilterDateFrom: '',
	setRecycleBinFilterDateTo: ''


};

export default function historyReducer(state = initialState, action) {
    switch (action.type) {
    	case "SEARCH_OBJECTS": {
    		const {searchValue} = action;
			return Object.assign({}, state, {
				searchValue
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
				visibleItems: filterDate(state.visibleItems, setRecycleBinFilterDateFrom, state.setRecycleBinFilterDateTo)
			})
		}

    case "SET_RECYCLE_BIN_FILTER_DATE_TO": {
      const {setRecycleBinFilterDateTo} = action;
      console.log(setRecycleBinFilterDateTo)
      return Object.assign({}, state, {
        setRecycleBinFilterDateTo,
        visibleItems: filterDate(state.visibleItems, state.setRecycleBinFilterDateFrom, setRecycleBinFilterDateTo)
      })
    }
        default: {
            return state;
        }
    }
}

function filterDate(items, dateFrom, dateTo) { 
    let visibleItems = [];
    if(dateFrom == '' && dateTo == '') {
		visibleItems = data_for_recycle;
    }
    else if(dateFrom == '' && dateTo != '') {
    	items = data_for_recycle;
        for (let i = 0; i < items.length; i++) {
	       	if (dateTo >= data_for_recycle[i].deletedDate) {
	            visibleItems.push(data_for_recycle[i]);
	       	}
	    }
	}
    else if(dateFrom != '' && dateTo == ''){
    	items = data_for_recycle;
    	 for (let i = 0; i < items.length; i++) {
	       	if (dateFrom <= data_for_recycle[i].deletedDate) {
	            visibleItems.push(data_for_recycle[i]);
	       	}
	    }
	}
	else {
		items = data_for_recycle;
	   for (let i = 0; i < items.length; i++) {
	       	if (dateFrom <= data_for_recycle[i].deletedDate && dateTo >= data_for_recycle[i].deletedDate) {
	            visibleItems.push(data_for_recycle[i]);
	       	}
	    }
	}
    return visibleItems;
}