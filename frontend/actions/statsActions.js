import axios from 'axios';
// import { ROOT_URL } from '../../backend/config/constants';
import CONST, { currentYear, ROOT_URL } from '../../backend/config/constants';

import { ADD_REQUEST, REMOVE_REQUEST } from './appActions';

export const GET_USERS_STATS = 'STATS:GET_USERS_STATS';
export const RECEIVED_USERS_STATS = 'STATS:RECEIVED_USERS_STATS';

export const GET_CATEGORIES_STATS = 'STATS:GET_CATEGORIES_STATS';
export const RECEIVED_CATEGORIES_STATS = 'STATS:RECEIVED_CATEGORIES_STATS';

export const GET_KEYRESULT_STATS = 'STATS:GET_KEYRESULT_STATS';
export const RECEIVED_KEYRESULT_STATS = 'STATS:RECEIVED_KEYRESULT_STATS';

export const RECEIVED_ERROR = 'STATS:RECEIVED_ERROR';

export const SHOW_FILTERS = 'SHOW_FILTERS';
export const SET_FILTERS = 'SET_FILTERS';
export const RESET_FILTERS = 'RESET_FILTERS';
export const GET_FILTERED_ITEMS = 'GET_FILTERED_ITEMS';
export const RECEIVED_FILTERED_ITEMS = 'RECEIVED_FILTERED_ITEMS';

export function getUsersStats() {
	return (dispatch, getStore) => {
		dispatch({ type: GET_USERS_STATS });
		dispatch({ type: ADD_REQUEST });

		let store = getStore();
		let _id = store.myState.me._id;
		let year = store.myState.selectedYear || currentYear;

		console.log('¯\\_(ツ)_/¯: user: ', _id);
		console.log('¯\\_(ツ)_/¯: year: ', year);

		return axios.get(`${ ROOT_URL }/api/stats/users?limit=5&&id=${ _id }&&year=${ year }`)
			.then((response) => {
				dispatch(receivedUsersStats(response.data));
				dispatch({ type: REMOVE_REQUEST });
			})
			.catch((response) => {
				dispatch(myHistoryError(response.data))
				dispatch({ type: REMOVE_REQUEST });
			});
	};
}

export function getCategoriesStats(params) {
	return (dispatch, getStore) => {
		dispatch({ type: GET_CATEGORIES_STATS });
		dispatch({ type: ADD_REQUEST });

		return axios.get(`${ ROOT_URL }/api/stats/categories`, { params: params })
		.then(response => {
			dispatch(receivedCategoriesStats(response.data));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch(response => {
			dispatch(receivedError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function getKeyResultStats(params) {
	return (dispatch, getStore) => {
		dispatch({ type: GET_KEYRESULT_STATS });
		dispatch({ type: ADD_REQUEST });

		return axios.get(`${ ROOT_URL }/api/stats/keyresults`, { params: params })
		.then(response => {
			dispatch(receivedKeyResultStats(response.data));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch(response => {
			dispatch(receivedError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function getFilteredItems() {
	return (dispatch, getStore) => {
		let store = getStore().stats;
		const params = {
			filters: {
				userId: store.filters.userId,
				date: {
					from: store.filters.dateFrom,
					to: store.filters.dateTo
				},
				year: store.filters.year,
				quarter: store.filters.quarter
			}
		};

		dispatch(getKeyResultStats(params));
		dispatch(getCategoriesStats(params));
	};
}

export function setQuarterFilter(quarter) {
	return(dispatch, getStore) => {
		const { filters } = getStore().stats;
		filters.quarter = quarter;
		dispatch({
			type: SET_FILTERS,
			filters
		});
	};
}

export function setYearFilter(year) {
	return(dispatch, getStore) => {
		const { filters } = getStore().stats;
		filters.year = year;
		dispatch({
			type: SET_FILTERS,
			filters
		});
	};
}

export function setUserIdFilter(userId) {
	return(dispatch, getStore) => {
		const { filters } = getStore().stats;
		filters.userId = userId;
		dispatch({
			type: SET_FILTERS,
			filters
		});
	};
}

export function setFilterDateFrom(value) {
	return(dispatch, getStore) => {
		const { filters } = getStore().stats;
		filters.dateFrom = value;
		dispatch({
			type: SET_FILTERS,
			filters
		});
	};
}

export function setFilterDateTo(value) {
	return(dispatch, getStore) => {
		const { filters } = getStore().stats;
		filters.dateTo = value;
		dispatch({
			type: SET_FILTERS,
			filters
		});
	};
}

export function receivedUsersStats(data) {
	return {
		type: RECEIVED_USERS_STATS,
		data
	};
}

export function receivedCategoriesStats(data) {
	return {
		type: RECEIVED_CATEGORIES_STATS,
		data
	};
}


export function receivedKeyResultStats(data) {
	return {
		type: RECEIVED_KEYRESULT_STATS,
		data
	};
}

export function receivedError(data) {
	return {
		type: RECEIVED_ERROR,
		data
	};
}

export function resetFilters () {
	const action = {
		type: RESET_FILTERS
	};

	return action;
}

export function showFilters(show) {

	const action = {
		type: SHOW_FILTERS,
		showStatsFilters: show
	};

	return action;
}
