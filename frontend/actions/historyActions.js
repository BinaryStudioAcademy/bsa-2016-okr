import axios from 'axios';

export function search(value) {
	const action = {
		type: 'SEARCH_OBJECTS',
		searchValue: value
	};
	return action;
}

export function showFilters(show) {
	const action = {
		type: 'SHOW_FILTERS',
		showHistoryFilters: show
	};
	return action;
}

export function setFilterDateFrom(value) {
	const action = {
		type: 'SET_HISTORY_FILTER_DATE_FROM',
		setHistoryFilterDateFrom: value
	};
	return action;
}

export function setFilterDateTo(value) {
	const action = {
		type: 'SET_HISTORY_FILTER_DATE_TO',
		setHistoryFilterDateTo: value
	};
	return action;
}

export function getHistoryItems(){
	return(dispatch, getStore) => {
			
		dispatch({
			type: 'GET_HISTORY_ITEMS',
		});

		return axios.get('/api/history/')
			.then( (response) => dispatch(receivedHistoryItems(response.data)))
			.catch( (response) => dispatch(historyItemsError(response.data)));
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