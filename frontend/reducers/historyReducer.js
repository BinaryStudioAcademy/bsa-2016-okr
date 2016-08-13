import historyMock from '../components/mockData/historyPageMock.js'

const initialState = {
    historyItems: historyMock,
	searchValue: ''
};

export default function historyReducer(state = initialState, action) {
    switch (action.type) {
    	case "SEARCH_OBJECTS": {
    		const {searchValue} = action;
			return Object.assign({}, state, {
				searchValue
			})
        }

        default: {
            return state;
        }
    }
}