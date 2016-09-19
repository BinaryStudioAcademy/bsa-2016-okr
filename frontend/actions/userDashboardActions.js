import axios from 'axios';

import { ADD_REQUEST, REMOVE_REQUEST } from './appActions';

import { currentYear } from '../../backend/config/constants';

export const SET_TAB = 'DASH:SET_TAB';
export const CHANGE_SHOW_TABS ='DASH:CHANGE_SHOW_TABS';
export const GET_MY_HISTORY = 'DASH:GET_MY_HISTORY';
export const RECEIVED_MY_HISTORY = 'DASH:RECEIVED_MY_HISTORY';
export const MY_HISTORY_ERROR = 'DASH:MY_HISTORY_ERROR';
export const CLEAR_USER_DASHBOARD_STATE = 'DASH:CLEAR_USER_DASHBOARD_STATE';
export const GET_STATS = 'DASH:GET_STATS';
export const RECEIVED_STATS = 'DASH:RECEIVED_STATS';
export const RECEIVED_TOTAL_SCORE = 'DASH:RECEIVED_TOTAL_SCORE';
export const ERROR = 'DASH:ERROR';

export const OTHER_PERSON_PAGE = 'otherPersonPage';

export function clearUserDashboardState() {
	const action = {
		type: CLEAR_USER_DASHBOARD_STATE
	}
	return action;
}

export function getMyHistory(type) {
	return (dispatch, getStore) => {
		dispatch({ type: GET_MY_HISTORY });
		dispatch({ type: ADD_REQUEST });

		let store = getStore();
		let _id;

		switch(type) {
			case OTHER_PERSON_PAGE:
				({ _id } = store.userPage.user);
				break;
			default:
				({ _id } = store.myState.me);
				break;
		}

		return axios.get(`/api/history/user/${ _id }`)
		.then((response) => {
			dispatch(receivedMyHistory(response.data));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch((response) => {
			dispatch(myHistoryError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	}
}

export function getStats(type) {
	return (dispatch, getStore) => {
		let _id;
		let year;
		let store = getStore();

		dispatch({ type: GET_STATS });
		dispatch({ type: ADD_REQUEST });

		switch(type) {
			case OTHER_PERSON_PAGE:
				({ _id } = store.userPage.user);
				(year = store.userPage.selectedYear || currentYear);
				break;
			default:
				({ _id } = store.myState.me);
				(year = store.myState.selectedYear || currentYear);
				break;
		}

		// console.log('¯\\_(ツ)_/¯: user: ', _id);
		// console.log('¯\\_(ツ)_/¯: year: ', year);

		return axios.get(`/api/stats/users?limit=5&&id=${ _id }&&year=${ year }`)
		.then((response) => {
			dispatch(receivedStats(response.data))
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch((response) => {
			dispatch(myHistoryError(response.data))
			dispatch({ type: REMOVE_REQUEST });
		});
	}
}

export function getTotalScore() {
	return(dispatch, getStore) => {
		dispatch({ type: ADD_REQUEST });

		return axios.get('/api/stats/progress')
		.then(response => { 
			dispatch(receivedTotalScore(response.data)); 
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch(response => {
			dispatch(receivedError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	}
}

export function receivedTotalScore(data = {}) {
	return {
		type: RECEIVED_TOTAL_SCORE,
		data
	};
}

export function receivedStats(data = {}) {
	return {
		type: RECEIVED_STATS,
		data
	}
}

export function receivedMyHistory(data = []) {
	return {
		type: RECEIVED_MY_HISTORY,
		data
	}
}

export function myHistoryError(data) {
	return {
		type: MY_HISTORY_ERROR,
		data
	}
}

export function receivedError(data) {
	return {
		type: ERROR,
		data
	}
}

export function changeShowTopTabs() {
	return (dispatch, getStore) => {
		let store = getStore().userDashboard;
		
		dispatch({
			type: CHANGE_SHOW_TABS,
			showTopTabs: !store.showTopTabs
		});
	}
}

export function setTab(tabIndex) {
	return {
		type: SET_TAB,
		tabIndex
	};
}