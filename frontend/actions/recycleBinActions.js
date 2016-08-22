export function search(value) {
	const action = {
		type: 'SEARCH_OBJECTS',
		searchValue: value
	};
	return action;
}

export function updateAll(dateFrom, dateTo, categoryOrTypeFilter, objectiveType, keyType, sortByDate, categoryType, userName) {
	const action = {
		type: 'UPDATE-ALL',
		dateFrom: dateFrom,
		dateTo: dateTo,
		categoryOrTypeFilter: categoryOrTypeFilter,
		objectiveType: objectiveType,
		keyType: keyType,
		sortByDate: sortByDate,
		categoryType: categoryType,
		userName: userName
	};
	return action;
}

export function setUserName(value) {
	
	const action = {
		type: 'SET-USER-NAME',
		value: value
	};
	return action;
}

export function deleteItemFromState(id) {

	console.log(id);
	
	const action = {
		type: 'REC_BYN_DELETE_ITEM_FROM_STATE',
		id: id
	};
	return action;
}

export function typeOrCategoryFilter(value) {
	
	const action = {
		type: 'CATEGORY-TYPE-FILTER',
		value: value
	};
	return action;
}

export function setSortingByDate(value) {
	
	const action = {
		type: 'SET_SORTING_BY_DATE',
		value: value
	};
	return action;
}

export function setObjectiveType(value) {
	
	const action = {
		type: 'SET_OBJECTIVE_TYPE',
		value: value
	};
	return action;
}

export function setCategoryType(value) {

	const action = {
		type: 'SET_CATEGORY_TYPE',
		value: value
	};
	return action;
}

export function setKeyType(value) {
	
	const action = {
		type: 'SET_KEY_TYPE',
		value: value
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
