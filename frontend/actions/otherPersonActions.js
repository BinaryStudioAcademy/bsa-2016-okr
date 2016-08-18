var axios = require('axios');

export const GET_USER = 'GET_USER'
export const RECEIVED_USER = 'RECEIVED_USER'

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
