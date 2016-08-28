import {
	SET_TAB, 
	CHANGE_SHOW_TABS,
	GET_MY_HISTORY,
	RECEIVED_MY_HISTORY,
	MY_HISTORY_ERROR} from '../actions/userDashboardActions.js';
import historyItemsLol from '../components/userDashboard/history.js'


const initialState = {
	tabIndex: 1,
	historyList: historyItemsLol,
	showTopTabs: false
}

export default function userDashboardReducer(state = initialState, action) {
	switch (action.type) {
		case SET_TAB: {
			let tabIndex = action.tabIndex;
			console.log('set to ' + tabIndex);
			return Object.assign({}, state, {
				tabIndex
			})
		}

		case GET_MY_HISTORY: {
			return Object.assign({}, state);
		}

		case RECEIVED_MY_HISTORY: {
			let historyList = action.data;
			if (historyList[0] === 'empty')
				historyList= [];
			return Object.assign({}, state, { historyList });
		}

		case MY_HISTORY_ERROR: {
			console.log(`ERROR: ${action.data}`);
			return Object.assign({}, state)
		}

		case CHANGE_SHOW_TABS: {
			let showTopTabs = action.showTopTabs;
			return Object.assign({}, state, {
				showTopTabs
			})
		}

        default: {
            return state;
        }
    }
}