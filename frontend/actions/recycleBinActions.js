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
		showRecycleBinFilters: show
	};
	return action;
}

export function setFilterDateFrom(value) {
	const action = {
		type: 'SET_RECYCLE_BIN_FILTER_DATE_FROM',
		setRecycleBinFilterDateFrom: value
	};
	return action;
}

export function setFilterDateTo(value) {
	const action = {
		type: 'SET_RECYCLE_BIN_FILTER_DATE_TO',
		setRecycleBinFilterDateTo: value
	};
	return action;
}
