import historyMock from '../components/mockData/historyPageMock.js'

const initialState = {
    historyItems: historyMock,
	searchValue: '',
	showHistoryFilters: true
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

        default: {
            return state;
        }
    }
}