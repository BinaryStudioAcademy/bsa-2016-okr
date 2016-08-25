var axios = require('axios');

export const GET_OBJECTIVES_LIST = 'GET_OBJECTIVES_LIST'
export const OBJECTIVES_LIST_ERROR = 'OBJECTIVES_LIST_ERROR'
export const RECEIVED_OBJECTIVES_LIST = 'RECEIVED_OBJECTIVES_LIST'
export const SET_SORT =  "SET_SORT"
export const SEARCH_OBJECTIVE = 'SEARCH_OBJECTIVE'
export const ACTIVE_OBJECTIVE = 'ACTIVE_OBJECTIVE'
export const DELETE_OBJECTIVE = 'DELETE_OBJECTIVE'
export const EDIT_OBJECTIVE = 'EDIT_OBJECTIVE'
export const DELETE_OBJECTIVE_ERROR = 'DELETE_OBJECTIVE_ERROR'
export const SOFT_DELETE_OBJECTIVE = 'SOFT_DELETE_OBJECTIVE'
export const EDIT_OBJECTIVE_TEMPLATE = 'EDIT_OBJECTIVE_TEMPLATE'
export const RECIVED_EDIT_OBJECTIVE_TEMPLATE ='RECIVED_EDIT_OBJECTIVE_TEMPLATE'
export const DELETE_KEY_RESULT_TEMPLATE = 'DELETE_KEY_RESULT_TEMPLATE'
export const DELETE_KEY_RESULT_ERROR = 'DELETE_KEY_RESULT_ERROR'
export const SOFT_DELETE_KEY_RESULT = 'SOFT_DELETE_KEY_RESULT'

export function getObjectivesList(){
	
	return(dispatch, getStore) => {

		dispatch({
			type: GET_OBJECTIVES_LIST
		});

		return axios.get('/api/objective/')
			.then(response => dispatch(receivedObjectivesList(response.data)))
			.catch(response => dispatch(objectivesListError(response.data)));
	};
}

export function objectivesListError(data) {
	return {
		type: OBJECTIVES_LIST_ERROR,
		data
	};
}

export function receivedObjectivesList(objectives) {
	return {
		type: RECEIVED_OBJECTIVES_LIST,
		objectives
	};
}

export function deleteObjective(id){
	return(dispatch, getStore) => {

		dispatch({
			type: DELETE_OBJECTIVE
		});

		return axios.put('/api/objective/softDelete/'+id)
			.then(response => dispatch(softDeleteObjective(id)))
			.catch(response => dispatch(deleteObjectiveError(response.data)));
	};
}

export function deleteObjectiveError(data) {
	return {
		type: DELETE_OBJECTIVE_ERROR,
		data
	};
}

export function softDeleteObjective(id) {
	return {
		type: SOFT_DELETE_OBJECTIVE,
		id
	};
}

export function deleteKeyResult(id){
	return(dispatch, getStore) => {

		dispatch({
			type: DELETE_KEY_RESULT_TEMPLATE
		});

		return axios.put('/api/keyResult/softDelete/'+id)
			.then(response => dispatch(softDeleteKyeResult(id)))
			.catch(response => dispatch(deleteObjectiveError(response.data)));
	};
}

export function deleteKeyResultError(data) {
	return {
		type: DELETE_KEY_RESULT_ERROR,
		data
	};
}

export function softDeleteKyeResult(id) {
	return {
		type: SOFT_DELETE_KEY_RESULT,
		id
	};
}

export function searchObjective(value) {
	const action = {
		type: SEARCH_OBJECTIVE,
		searchValue: value
	};
	return action;
}
export function activeObjective (active) {
	const action = {
		type: ACTIVE_OBJECTIVE,
		active
	};

	return action;
}
export function editObjective (value) {
	const action = {
		type: EDIT_OBJECTIVE,
		value
	};

	return action;
}

export function editObjectiveTamplate (id, reqBody) {
	return(dispatch, getStore) => {

		dispatch({
			type: EDIT_OBJECTIVE_TEMPLATE
		});

		return axios.put('/api/objective/'+id, reqBody)
			.then(response => dispatch(recivedEditObjectiveTemplate(id, reqBody)))
			.catch(response => dispatch(editObjectiveTemplateError(response.data)));
	};

	return action;
}

export function recivedEditObjectiveTemplate(id, objective) {
	return {
		type: RECIVED_EDIT_OBJECTIVE_TEMPLATE,
		objective,
		id
	};
}

export function editObjectiveTemplateError(data) {
	return {
		type: EDIT_OBJECTIVE_TEMPLATE_ERROR,
		data
	};
}