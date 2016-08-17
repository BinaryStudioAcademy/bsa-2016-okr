import data_for_recycle from '../components/mockData/data_for_recycle_bin.js'

const initialState = {
    historyItems: data_for_recycle,
	searchValue: '',
	showHistoryFilters: false
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
