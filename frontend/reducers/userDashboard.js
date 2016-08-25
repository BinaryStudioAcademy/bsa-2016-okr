import {SET_TAB, CHANGE_SHOW_TABS} from '../actions/userDashboardActions.js';

const initialState = {
	tabIndex: 1,
	historyList: [],
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