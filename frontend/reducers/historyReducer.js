const initialState = {
    historyItems: [],
	searchValue: '',
	showHistoryFilters: false,
    nameFilter: '',
    typeFilter: '',
    sort:'',
    setHistoryFilterDateFrom:'',
    setHistoryFilterDateTo:''

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
            console.log("get historyItems");
            return Object.assign({}, state)
        }

        case "RESET_FILTERS": {
            console.log("reset");
            return Object.assign({}, state, {
                nameFilter: '',
                typeFilter: '',
                setHistoryFilterDateFrom: '',
                setHistoryFilterDateTo: ''
            })
        }
        // case "GET_SORTED_ITEMS": {
        //     console.log("get sortedItems");
        //     return Object.assign({}, state)
        // }

        case "GET_FILTERED_ITEMS": {
            console.log("get filteredItems");
            return Object.assign({}, state)
        }

        case "HISTORY_ITEMS_ERROR": {
            
            const {data} = action;

            console.log("HISTORY_ITEMS_ERROR");
            console.log(data);

            return Object.assign({}, state)
        }

        // case "RECEIVED_SORTED_ITEMS": {

        //     const historyItems = action.historyItems;
        //     console.log('received');

        //     return Object.assign({}, state, {
        //         historyItems  
        //     })
        // }

        case "RECEIVED_FILTERED_ITEMS": {

            const historyItems = action.historyItems;
            console.log('received');

            return Object.assign({}, state, {
                historyItems  
            })
        }

        case "RECEIVED_HISTORY_ITEMS": {

            const historyItems = action.historyItems;
            console.log('received');

            return Object.assign({}, state, {
            	historyItems  
            })
        }

        case "SET_SORT": {
            const sort = action.sort;
            console.log(sort);

            return Object.assign({}, state, {
                sort
            })
        }
            
        case "SET_NAME_FILTER": {
            const {nameFilter} = action;
            return Object.assign({}, state, {
                nameFilter
            })
        }   

        case "SET_TYPE_FILTER": {
            const {typeFilter} = action;
            console.log('reduser: ' + typeFilter);
            return Object.assign({}, state, {
                typeFilter
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
				setHistoryFilterDateFrom
			})
		}

   		case "SET_HISTORY_FILTER_DATE_TO": {
    		const {setHistoryFilterDateTo} = action;
    		return Object.assign({}, state, {
    			setHistoryFilterDateTo
    		})
   		}
        default: {
            return state;
        }
    }
}
