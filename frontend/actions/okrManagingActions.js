var axios = require('axios');

export const GET_OBJECTIVES_LIST = 'GET_OBJECTIVES_LIST'
export const OBJECTIVES_LIST_ERROR = 'OBJECTIVES_LIST_ERROR'
export const RECEIVED_OBJECTIVES_LIST = 'RECEIVED_OBJECTIVES_LIST'
export const SET_SORT =  "SET_SORT"
export const SEARCH_OBJECTIVE = 'SEARCH_OBJECTIVE'
export const ACTIVE_OBJECTIVE = 'ACTIVE_OBJECTIVE'
export const DELETE_OBJECTIVE = 'DELETE_OBJECTIVE'
export const DELETE_OBJECTIVE_ERROR = 'DELETE_OBJECTIVE_ERROR'
export const RECEIVED_DELETE_OBJECTIVE = 'RECEIVED_DELETE_OBJECTIVE'

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

export function deleteObjective(id, body){
	return(dispatch, getStore) => {

		dispatch({
			type: DELETE_OBJECTIVE
		});

		return axios.put('/api/objective/'+id, body)
			.then(response => dispatch(receivedDeleteObjective(id, JSON.parse(response.config.data).isDeleted))))
			.catch(response => dispatch(deleteObjectiveError(response.data)));
	};
}

export function deleteObjectiveError(data) {
	return {
		type: DELETE_OBJECTIVE_ERROR,
		data
	};
}

export function receivedDeleteObjective(objectives) {
	return {
		type: RECEIVED_DELETE_OBJECTIVE,
		objectives
	};
}

export function setSort (sort) {
	const action = {
		type: SET_SORT,
		sort
	};

	return action;
}
export function searchObjective(value) {
	console.log('fd')
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