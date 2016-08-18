const initialState = {
    historyItems: [],
	searchValue: '',
	showHistoryFilters: false,
    setRecycleBinFilterDateFrom: '',
    setRecycleBinFilterDateTo: '',
    visibleItems: []
};

export default function historyReducer(state = initialState, action) {
    switch (action.type) {
    	case "SEARCH_OBJECTS": {
    		const {searchValue} = action;
			return Object.assign({}, state, {
				searchValue
			})
        }

        case "GET_HISTORY_ITEMS": {

            const {data} = action;
            console.log("get historyItems");
            return Object.assign({}, state)
        }

        case "HISTORY_ITEMS_ERROR": {
            
            const {data} = action;

            console.log("HISTORY_ITEMS_ERROR");
            console.log(data);

            return Object.assign({}, state)
        }

      case "RECEIVED_HISTORY_ITEMS": {

            const historyItems = action.historyItems;
            console.log('received');

            return Object.assign({}, state, {
            	historyItems ,
                visibleItems:  historyItems
            })
        }
            
           

		case "SHOW_FILTERS": {
			const {showHistoryFilters} = action;
			return Object.assign({}, state, {
				showHistoryFilters
			})
		}

   		case "SET_HISTORY_FILTER_DATE_FROM": {
			const {setHistoryFilterDateFrom} = action;
			return Object.assign({}, state, {
				setHistoryFilterDateFrom,
                visibleItems: filterDate(state.visibleItems, setHistoryFilterDateFrom, state.setHistoryFilterDateTo, state.historyItems)
			})
		}

   		case "SET_HISTORY_FILTER_DATE_TO": {
    		const {setHistoryFilterDateTo} = action;
    		return Object.assign({}, state, {
    			setHistoryFilterDateTo,
                visibleItems: filterDate(state.visibleItems, state.setHistoryFilterDateFrom, setHistoryFilterDateTo, state.historyItems)
    		})
   		}

        default: {
            return state;
        }
    }
}

function filterDate(items, dateFrom, dateTo, historyItems) { 
    items = historyItems;
    let visibleItems = [];
    if(dateFrom == undefined && dateTo == undefined) {
        visibleItems = historyItems;
    }
    else if(dateFrom == undefined && dateTo != undefined) {
        
        for (let i = 0; i < historyItems.length; i++) {
            if (dateTo >= historyItems[i].createdAt) {
                visibleItems.push(historyItems[i]);
            }
        }
    }
    else if(dateFrom != undefined && dateTo == undefined){

         for (let i = 0; i < historyItems.length; i++) {
            if (dateFrom <= historyItems[i].createdAt) {
                visibleItems.push(historyItems[i]);
            }
        }
    }
    else {

       for (let i = 0; i < historyItems.length; i++) {
            if (dateFrom <= historyItems[i].createdAt && dateTo >= historyItems[i].createdAt) {
                visibleItems.push(historyItems[i]);
            }
        }
    }
    return visibleItems;
}