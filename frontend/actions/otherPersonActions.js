var axios = require('axios');

export const GET_USER = 'GET_USER'
export const RECEIVED_USER = 'RECEIVED_USER'
export const RECEIVED_ERROR = 'RECEIVED_ERROR'
export const CHANGE_TAB = 'CHANGE_TAB'
export const CHANGE_YEAR = 'CHANGE_YEAR'

export function getUser(id) {

	return (dispatch, getStore) => {

	dispatch({
		type: GET_USER
	});

	return axios.get('/api/user/'+id)
		.then(response => dispatch(receivedUser(response.data)))
		.catch(response => dispatch(receivedError(response.data)));
	};
}

export function receivedError(data) {
	return {
		type: RECEIVED_ERROR,
		data
	};
}

export function receivedUser(data) {
	return {
		type: RECEIVED_USER,
		data
	};
}

/*export function changeTab(num) {
	 return {
		  type: CHANGE_TAB,
		  currentTab: num
	 };
}
export function changeYear(year) {
	 return {
		  type: CHANGE_YEAR,
		  currentYear: year
	 };
}*/