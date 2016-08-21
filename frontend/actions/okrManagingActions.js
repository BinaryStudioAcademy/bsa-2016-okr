var axios = require('axios');

export const GET_OBJECTIVES_LIST = 'GET_OBJECTIVES_LIST'
export const OBJECTIVES_LIST_ERROR = 'OBJECTIVES_LIST_ERROR'
export const RECEIVED_OBJECTIVES_LIST = 'RECEIVED_OBJECTIVES_LIST'

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

export function receivedObjectivesList(data) {
	return {
		type: RECEIVED_OBJECTIVES_LIST,
		data
	};
}