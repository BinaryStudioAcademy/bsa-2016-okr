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
