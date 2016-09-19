import { isEmpty } from '../../backend/utils/ValidateService';

import {
	SET_TAB,
	CHANGE_SHOW_TABS,
	GET_MY_HISTORY,
	RECEIVED_MY_HISTORY,
	MY_HISTORY_ERROR,
	GET_STATS,
	RECEIVED_STATS,
	CLEAR_USER_DASHBOARD_STATE,
	RECEIVED_TOTAL_SCORE,
	ERROR,
} from '../actions/userDashboardActions.js';


const initialState = {
	tabIndex: 1,
	historyList: [],
	showTopTabs: false,
	topUsersList: [],
	totalScore: '0',
	userStats: {
		userInfo: {},
		inTop: ""
	},
	statArr: [],
	bottomStats: {}
}

export default function userDashboardReducer(state = initialState, action) {
	switch (action.type) {
		case SET_TAB: {
			let tabIndex = action.tabIndex;
			return Object.assign({}, state, {
				tabIndex
			})
		}

		case GET_STATS: {
			return Object.assign({}, state);
		}

		case GET_MY_HISTORY: {
			return Object.assign({}, state);
		}

		case RECEIVED_STATS: {

			let { statArr, userStats, bottomStats } = action.data;

			let topUsersList = !isEmpty(statArr) ? statArr : initialState.topUsersList;
			
			userStats = !isEmpty(userStats) ? userStats: initialState.userStats;
			bottomStats = !isEmpty(bottomStats) ? bottomStats: initialState.bottomStats;

			return Object.assign({}, state, {
				topUsersList,
				userStats,
				bottomStats
			});
		}

		case RECEIVED_MY_HISTORY: {
			const { data } = action;

			let historyList = !isEmpty(data) ? data : [];

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

		case RECEIVED_TOTAL_SCORE: {
			const { data } = action;

			return Object.assign({}, state, {
				totalScore: data
			});
		}

		case ERROR: {
			console.log('¯\\_(ツ)_/¯: userDashboard ERROR', data);
			return state;
		}

    default: {
        return state;
    }
  }
}
