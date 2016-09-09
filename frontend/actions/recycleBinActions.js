import axios from 'axios';
import { ADD_REQUEST, REMOVE_REQUEST } from './appActions';

export const SEARCH_OBJECTS = 'SEARCH_OBJECTS';
export const CLEAR = 'CLEAR';
export const UPDATE_ALL = 'UPDATE_ALL';
export const SET_USER_NAME = 'SET_USER_NAME';
export const DELETE_ITEM_FROM_STATE = 'DELETE_ITEM_FROM_STATE';
export const UPDATE_USER_OBJECTIVES_REQUEST = 'UPDATE_USER_OBJECTIVES_REQUEST';
export const UPDATE_USER_OBJECTIVES_REQUEST_ERROR = 'UPDATE_USER_OBJECTIVES_REQUEST_ERROR';
export const GET_USER_OBJECTIVES_REQUEST = 'GET_USER_OBJECTIVES_REQUEST';
export const RECEIVED_USER_OBJECTIVES = 'RECEIVED_USER_OBJECTIVES';
export const GET_USER_OBJECTIVES_REQUEST_ERROR = 'GET_USER_OBJECTIVES_REQUEST_ERROR';
export const GET_USER_DELETED_OBJECTIVES_REQUEST = 'GET_USER_DELETED_OBJECTIVES_REQUEST';
export const RECEIVED_USER_DELETED_OBJECTIVES = 'RECEIVED_USER_DELETED_OBJECTIVES';
export const GET_USER_DELETED_OBJECTIVES_REQUEST_ERROR = 'GET_USER_DELETED_OBJECTIVES_REQUEST_ERROR';
export const CATEGORY_TYPE_FILTER = 'CATEGORY_TYPE_FILTER';
export const SET_SORTING_BY_DATE = 'SET_SORTING_BY_DATE';
export const SET_SORTING_BY_TITLE = 'SET_SORTING_BY_TITLE';
export const SET_OBJECTIVE_TYPE = 'SET_OBJECTIVE_TYPE';
export const SET_CATEGORY_TYPE = 'SET_CATEGORY_TYPE';
export const SET_KEY_TYPE = 'SET_KEY_TYPE';
export const SHOW_FILTERS = 'SHOW_FILTERS';
export const SET_RECYCLE_BIN_FILTER_DATE_FROM = 'SET_RECYCLE_BIN_FILTER_DATE_FROM';
export const SET_RECYCLE_BIN_FILTER_DATE_TO = 'SET_RECYCLE_BIN_FILTER_DATE_TO';
export const GET_OBJECTIVE_TEMPLATES_REQUEST = 'GET_OBJECTIVE_TEMPLATES_REQUEST';
export const RECEIVED_OBJECTIVE_TEMPLATES = 'RECEIVED_OBJECTIVE_TEMPLATES';
export const GET_OBJECTIVE_TEMPLATES_REQUEST_ERROR = 'GET_OBJECTIVE_TEMPLATES_REQUEST_ERROR';
export const GET_KEY_RESULTS_TEMPLATES_REQUEST = 'GET_KEY_RESULTS_TEMPLATES_REQUEST';
export const RECEIVED_KEY_RESULTS_TEMPLATES = 'RECEIVED_KEY_RESULTS_TEMPLATES';
export const GET_KEY_RESULTS_TEMPLATES_REQUEST_ERROR = 'GET_KEY_RESULTS_TEMPLATES_REQUEST_ERROR';
export const UPDATE_TEMPLATE_OBJECTIVE_REQUEST = 'UPDATE_TEMPLATE_OBJECTIVE_REQUEST';
export const UPDATE_TEMPLATE_OBJECTIVE_REQUEST_ERROR = 'UPDATE_TEMPLATE_OBJECTIVE_REQUEST_ERROR';
export const UPDATE_TEMPLATE_KEY_RESULT_REQUEST = 'UPDATE_TEMPLATE_KEY_RESULT_REQUEST';
export const UPDATE_TEMPLATE_KEY_RESULT_REQUEST_ERROR = 'UPDATE_TEMPLATE_KEY_RESULT_REQUEST_ERROR';
export const GET_DELETED_CATEGORIES_REQUEST = 'GET_DELETED_CATEGORIES_REQUEST';
export const RECEIVED_DELETED_CATEGORIES = 'RECEIVED_DELETED_CATEGORIES';
export const GET_DELETED_CATEGORIES_REQUEST_ERROR = 'GET_DELETED_CATEGORIES_REQUEST_ERROR';
export const UPDATE_CATEGORY_REQUEST = 'UPDATE_CATEGORY_REQUEST';
export const UPDATE_CATEGORY_REQUEST_ERROR = 'UPDATE_CATEGORY_REQUEST_ERROR';

export function updateCategoryRequest(id, body, idItem) {

	return (dispatch, getStore) => {
		dispatch({ type:  UPDATE_CATEGORY_REQUEST });
		dispatch({ type: ADD_REQUEST });

		return axios.put(('/api/category/myupdate/' + id), body)
		.then(response => {
			dispatch(deleteItemFromState(idItem));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch(response => {
			dispatch(updateCategoryRequestError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function updateCategoryRequestError(data) {
	return {
		type: UPDATE_CATEGORY_REQUEST_ERROR,
		data
	};
}

export function getDeletedCategoriesRequest() {

	return (dispatch, getStore) => {
		dispatch({ type: GET_DELETED_CATEGORIES_REQUEST });
		dispatch({ type: ADD_REQUEST });

		return axios.get('/api/category/deleted')
		.then(response => {
			dispatch(receivedDeletedCategories(response.data));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch(response => {
			dispatch(receivedDeletedCategoriesError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function receivedDeletedCategories(data) {
	return {
		type: RECEIVED_DELETED_CATEGORIES,
		data
	};
}


export function receivedDeletedCategoriesError(data) {
	return {
		type: GET_DELETED_CATEGORIES_REQUEST_ERROR,
		data
	};
}


export function updateTemplateKeyResultRequest(id, body, idItem) {

	return (dispatch, getStore) => {
		dispatch({ type:  UPDATE_TEMPLATE_KEY_RESULT_REQUEST });
		dispatch({ type: ADD_REQUEST });

		return axios.put(('/api/keyResult/myupdate/' + id), body)
		.then(response => {
			dispatch(deleteItemFromState(idItem));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch(response => {
			dispatch(updateTemplateKeyResultError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function updateTemplateKeyResultError(data) {
	return {
		type: UPDATE_TEMPLATE_KEY_RESULT_REQUEST_ERROR,
		data
	};
}


export function updateTemplateObjectivesRequest(id, body, idItem) {

	return (dispatch, getStore) => {
		dispatch({ type:  UPDATE_TEMPLATE_OBJECTIVE_REQUEST });
		dispatch({ type: ADD_REQUEST });

		return axios.put(('/api/objective/myupdate/' + id), body)
		.then(response => {
			dispatch(deleteItemFromState(idItem));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch(response => {
			dispatch(updateTemplateObjectivesError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function updateTemplateObjectivesError(data) {
	return {
		type: UPDATE_TEMPLATE_OBJECTIVE_REQUEST_ERROR,
		data
	};
}

export function getObjectiveTemplatesRequest() {

	return (dispatch, getStore) => {
		dispatch({ type: GET_OBJECTIVE_TEMPLATES_REQUEST });
		dispatch({ type: ADD_REQUEST });

		return axios.get('/api/objective/deleted')
		.then(response => {
			dispatch(receivedObjectiveTemplates(response.data));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch(response => {
			dispatch(receivedObjectiveTemplatesError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function receivedObjectiveTemplates(data) {
	return {
		type: RECEIVED_OBJECTIVE_TEMPLATES,
		data
	};
}


export function receivedObjectiveTemplatesError(data) {
	return {
		type: GET_OBJECTIVE_TEMPLATES_REQUEST_ERROR,
		data
	};
}

export function getKeyResultsTemplatesRequest() {

	return (dispatch, getStore) => {
		dispatch({ type: GET_KEY_RESULTS_TEMPLATES_REQUEST });
		dispatch({ type: ADD_REQUEST });

		return axios.get('/api/keyResult/deleted/')
		.then(response => {
			dispatch(receivedKeyResultsTemplates(response.data));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch(response => {
			dispatch(receivedKeyResultsTemplatesError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function receivedKeyResultsTemplates(data) {
	return {
		type: RECEIVED_KEY_RESULTS_TEMPLATES,
		data
	};
}


export function receivedKeyResultsTemplatesError(data) {
	return {
		type: GET_KEY_RESULTS_TEMPLATES_REQUEST_ERROR,
		data
	};
}

export function search(value) {
	const action = {
		type: SEARCH_OBJECTS,
		searchValue: value
	};

	return action;
}

export function clearRecycleBin() {
	return ({ type: CLEAR });
}

export function updateAll(dateFrom, dateTo, categoryOrTypeFilter, objectiveType, keyType, sortByDate, categoryType, userName, isSortingUsed) {
	const action = {
		type: UPDATE_ALL,
		dateFrom: dateFrom,
		dateTo: dateTo,
		categoryOrTypeFilter: categoryOrTypeFilter,
		objectiveType: objectiveType,
		keyType: keyType,
		sortByDate: sortByDate,
		categoryType: categoryType,
		userName: userName,
		isSortingUsed: isSortingUsed
	};
	return action;
}

export function setUserName(value) {

	const action = {
		type: SET_USER_NAME,
		value: value
	};
	return action;
}

export function deleteItemFromState(id) {

	const action = {
		type: DELETE_ITEM_FROM_STATE,
		id: id
	};
	return action;
}

export function updateUserObjectivesRequest(id, body, idItem) {

	return (dispatch, getStore) => {
		dispatch({ type: UPDATE_USER_OBJECTIVES_REQUEST });
		dispatch({ type: ADD_REQUEST });

		return axios.put(('/api/userObjective/myupdate/' + id), body)
		.then(response => {
			dispatch(deleteItemFromState(idItem));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch(response => {
			dispatch(updateUserObjectivesError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function updateUserObjectivesError(data) {
	return {
		type: UPDATE_USER_OBJECTIVES_REQUEST_ERROR,
		data
	};
}

export function getUserObjectivesRequest() {

	return (dispatch, getStore) => {
		dispatch({ type: GET_USER_OBJECTIVES_REQUEST });
		dispatch({ type: ADD_REQUEST });

		return axios.get('/api/userObjective/me/')
		.then(response => {
			dispatch(receivedUserObjectives(response.data));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch(response => {
			dispatch(receivedGetUserObjectivesError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function receivedUserObjectives(data) {
	return {
		type: RECEIVED_USER_OBJECTIVES,
		data
	};
}


export function receivedGetUserObjectivesError(data) {
	return {
		type: GET_USER_OBJECTIVES_REQUEST_ERROR,
		data
	};
}


export function getUserDeletedObjectivesRequest() {

	return (dispatch, getStore) => {

		dispatch({ type: GET_USER_DELETED_OBJECTIVES_REQUEST });
		dispatch({ type: ADD_REQUEST });

		return axios.get('/api/userObjective/me/deleted')
		.then(response => {
			dispatch(receivedUserDeletedObjectives(response.data));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch(response => {
			dispatch(receivedGetUserDeletedObjectivesError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function receivedUserDeletedObjectives(data) {
	return {
		type: RECEIVED_USER_DELETED_OBJECTIVES,
		data
	};
}


export function receivedGetUserDeletedObjectivesError(data) {
	return {
		type: GET_USER_DELETED_OBJECTIVES_REQUEST_ERROR,
		data
	};
}

export function typeOrCategoryFilter(value) {

	const action = {
		type: CATEGORY_TYPE_FILTER,
		value: value
	};
	return action;
}

export function setSortingByTitle(value) {

	const action = {
		type: SET_SORTING_BY_TITLE,
		value: value
	};
	return action;
}

export function setSortingByDate(value) {

	const action = {
		type: SET_SORTING_BY_DATE,
		value: value
	};
	return action;
}

export function setObjectiveType(value) {

	const action = {
		type: SET_OBJECTIVE_TYPE,
		value: value
	};
	return action;
}

export function setCategoryType(value) {

	const action = {
		type: SET_CATEGORY_TYPE,
		value: value
	};
	return action;
}

export function setKeyType(value) {

	const action = {
		type: SET_KEY_TYPE,
		value: value
	};
	return action;
}

export function showFilters(show) {
	const action = {
		type: SHOW_FILTERS,
		showRecycleBinFilters: show
	};
	return action;
}

export function setFilterDateFrom(value) {
	const action = {
		type: SET_RECYCLE_BIN_FILTER_DATE_FROM,
		setRecycleBinFilterDateFrom: value
	};
	return action;
}

export function setFilterDateTo(value) {
	const action = {
		type: SET_RECYCLE_BIN_FILTER_DATE_TO,
		setRecycleBinFilterDateTo: value
	};
	return action;
}
