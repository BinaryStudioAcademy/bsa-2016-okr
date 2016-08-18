const initialState = {
    historyItems: [],
	searchValue: '',
	showHistoryFilters: false,
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
            	historyItems  
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
