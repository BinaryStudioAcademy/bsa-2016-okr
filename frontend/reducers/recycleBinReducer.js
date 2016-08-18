import data_for_recycle from '../components/mockData/data_for_recycle_bin.js'

const initialState = {
    recycleBinItems: data_for_recycle,
	searchValue: '',
	showRecycleBinFilters: false
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
				setRecycleBinFilterDateFrom
			})
		}

    case "SET_RECYCLE_BIN_FILTER_DATE_TO": {
      const {setRecycleBinFilterDateTo} = action;
      return Object.assign({}, state, {
        setRecycleBinFilterDateTo
      })
    }
        default: {
            return state;
        }
    }
}
