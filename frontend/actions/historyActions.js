import axios from 'axios';
import { ROOT_URL } from '../../backend/config/constants';

import { ADD_REQUEST, REMOVE_REQUEST } from './appActions';

export const CLEAR_STATE = 'CLEAR_STATE';
export const SEARCH_OBJECTS = 'SEARCH_OBJECTS';
export const SHOW_FILTERS = 'SHOW_FILTERS';
export const SET_HISTORY_FILTER_DATE_FROM = 'SET_HISTORY_FILTER_DATE_FROM';
export const SET_HISTORY_FILTER_DATE_TO = 'SET_HISTORY_FILTER_DATE_TO';
export const SET_NAME_FILTER = 'SET_NAME_FILTER';
export const SET_TYPE_FILTER = 'SET_TYPE_FILTER';
export const GET_SORTED_ITEMS = 'GET_SORTED_ITEMS';
export const RECEIVED_SORTED_ITEMS = 'RECEIVED_SORTED_ITEMS';
export const SET_SORT = 'SET_SORT';
export const RESET_FILTERS = 'RESET_FILTERS';
export const GET_FILTERED_ITEMS = 'GET_FILTERED_ITEMS';
export const RECEIVED_FILTERED_ITEMS = 'RECEIVED_FILTERED_ITEMS';
export const GET_HISTORY_ITEMS = 'GET_HISTORY_ITEMS';
export const RECEIVED_HISTORY_ITEMS = 'RECEIVED_HISTORY_ITEMS';
export const HISTORY_ITEMS_ERROR = 'HISTORY_ITEMS_ERROR';
export const SET_HISTORY_LIMIT = 'SET_HISTORY_LIMIT';

export function clearState() {
	const action = {
		type: CLEAR_STATE
	}
	return action;
}

export function search(value) {
	const action = {
		type: SEARCH_OBJECTS,
		searchValue: value
	};
	return action;
}

export function showFilters(show) {
	const action = {
		type: SHOW_FILTERS,
		showHistoryFilters: show
	};
	return action;
}

export function setFilterDateFrom(value) {
	const action = {
		type: SET_HISTORY_FILTER_DATE_FROM,
		setHistoryFilterDateFrom: value
	};
	return action;
}

export function setFilterDateTo(value) {
	const action = {
		type: SET_HISTORY_FILTER_DATE_TO,
		setHistoryFilterDateTo: value
	};
	return action;
}

export function setNameFilter (nameFilter) {
	const action = {
		type: SET_NAME_FILTER,
		nameFilter
	}
	return action;
}

export function setTypeFilter (typeFilter) {
	const action = {
		type: SET_TYPE_FILTER,
		typeFilter
	}
	return action;
}

// export function getSortedItems(sort) {
// 	return(dispatch, getStore) => {

// 		dispatch({
// 	 		type: GET_SORTED_ITEMS,
// 		});

// 	 	return axios.put(`${ ROOT_URL }/api/history/`, {
// 	 		sort
// 	 	})
// 			.then( (response) => dispatch(receivedFilteredItems(response.data)))
// 			.catch( (response) => dispatch(historyItemsError(response.data)));
// 	};
// }

// export  function receivedSortedItems (historyItems) {
// 	 return {
// 		type: 'RECEIVED_SORTED_ITEMS',
// 		historyItems
// 	}
// }

export function setHistoryLimit(limit) {
	const action = {
		type: SET_HISTORY_LIMIT,
		limit: limit
	}

	return action;
}

export function setSort (sortField) {

	// return action;
	return (dispatch, getStore) => {
		let store = getStore().history;
		dispatch({
			type: 'SET_SORT',
			sort: {
				sortField,
				up: !store.sort.up
			}
		})
	}
}

export function resetFilters () {
	const action = {
		type: 'RESET_FILTERS'
	};

	return action;
}

export function getFilteredItems () {
	return(dispatch, getStore) => {
		let store = getStore().history;
		const body = {
			limit: store.limit,
			sort: store.sort,
			filters: {
				type: store.typeFilter,
				name: store.nameFilter,
				date: {
					from: store.setHistoryFilterDateFrom,
					to: store.setHistoryFilterDateTo
				}
			}
		};

		dispatch({ type: GET_FILTERED_ITEMS });

		return axios.put(`${ ROOT_URL }/api/history/`, body)
		.then( (response) => dispatch(receivedFilteredItems(response.data)))
		//.catch( (response) => dispatch(historyItemsError(response.data)));
	};
}

export function receivedFilteredItems (historyItems) {
	return {
		type: 'RECEIVED_FILTERED_ITEMS',
		historyItems
	}
}

export function getHistoryItems(filter, sprt){
	return(dispatch, getStore) => {
		let store = getStore().history;

		dispatch({
			type: 'GET_HISTORY_ITEMS',
		});
		dispatch({ type: ADD_REQUEST });

		return axios.get(`${ ROOT_URL }/api/history/limit/${ store.limit }`)
		.then( (response) => {
			dispatch(receivedHistoryItems(response.data))
			dispatch({ type: REMOVE_REQUEST	});
		});

		//.catch( (response) => dispatch(historyItemsError(response.data)));
	};
}

export function receivedHistoryItems(historyItems){
	return {
		type: 'RECEIVED_HISTORY_ITEMS',
		historyItems
	}
}

export function historyItemsError(data){
	return {
		type: 'HISTORY_ITEMS_ERROR',
		data
	}
}
