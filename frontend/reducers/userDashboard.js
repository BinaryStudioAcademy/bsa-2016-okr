import {
	SET_TAB,
	CHANGE_SHOW_TABS,
	GET_MY_HISTORY,
	RECEIVED_MY_HISTORY,
	MY_HISTORY_ERROR,
	CLEAR_USER_DASHBOARD_STATE} from '../actions/userDashboardActions.js';


const initialState = {
	tabIndex: 1,
	historyList: [],
	showTopTabs: false
}

export default function userDashboardReducer(state = initialState, action) {
	switch (action.type) {
		case SET_TAB: {
			let tabIndex = action.tabIndex;
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
		case CLEAR_USER_DASHBOARD_STATE: {
			return Object.assign({}, state, initialState);
		}

        default: {
            return state;
        }
    }
}
