var axios = require('axios');

export function search(value) {
	const action = {
		type: 'SEARCH_OBJECTS',
		searchValue: value
	};
	return action;
}

export function clearRecycleBin() {
	const action = {
		type: 'REC_BYN_CLEAR',
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
	
	const action = {
		type: 'REC_BYN_DELETE_ITEM_FROM_STATE',
		id: id
	};
	return action;
}

export function updateUserObjectivesRequest(id, body, idItem) {

	 return (dispatch, getStore) => {

		  dispatch({
		   type: "REC_BYN_UPDATE_USER_OBJECTIVES_REQUEST"
		  });

	   return axios.put(('/api/userObjective/' + id), body)
		  .then(response => dispatch(deleteItemFromState(idItem)))
		  .catch(response => dispatch(updateUserObjectivesError(response.data)));
	};
}

export function updateUserObjectivesError(data) {
	 return {
	  type: "REC_BYN_UPDATE_USER_OBJECTIVES_REQUEST_ERROR",
	  data
	 };
}

export function getUserObjectivesRequest() {

	 return (dispatch, getStore) => {

		  dispatch({
		   type: "REC_BYN_GET_USER_OBJECTIVES_REQUEST"
		  });

	   return axios.get('/api/userObjective/me/')
		  .then(response => dispatch(receivedUserObjectives(response.data)))
		  .catch(response => dispatch(receivedGetUserObjectivesError(response.data)));
	};
}

export function receivedUserObjectives(data) {
     return {
	  type: "REC_BYN_RECEIVED_USER_OBJECTIVES",
	  data
	 };
}


export function receivedGetUserObjectivesError(data) {
	 return {
	  type: "REC_BYN_GET_USER_OBJECTIVES_REQUEST_ERROR",
	  data
	 };
}


export function getUserDeletedObjectivesRequest() {

	 return (dispatch, getStore) => {

		  dispatch({
		   type: "REC_BYN_GET_USER_DELETED_OBJECTIVES_REQUEST"
		  });

	   return axios.get('/api/userObjective/me/deleted')
		  .then(response => dispatch(receivedUserDeletedObjectives(response.data)))
		  .catch(response => dispatch(receivedGetUserDeletedObjectivesError(response.data)));
	};
}

export function receivedUserDeletedObjectives(data) {
     return {
	  type: "REC_BYN_RECEIVED_USER_DELETED_OBJECTIVES",
	  data
	 };
}


export function receivedGetUserDeletedObjectivesError(data) {
	 return {
	  type: "REC_BYN_GET_USER_DELETED_OBJECTIVES_REQUEST_ERROR",
	  data
	 };
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
