var axios = require('axios');

export function sendRequest(userId) {
	return (dispatch, getStore) => {

	dispatch({
		type: 'SEND_REQUEST'
	});

	return axios.get('http://localhost:4444/user/'+userId)
		.then(dispatch(receivedData(userId)))
		.catch(response => dispatch(receivedError(response.data)));
	};
}

export function receivedError(data) {
	return {
		type: 'RECEIVED_ERROR',
		data
	};
}

export function receivedData(id) {
	return {
		type: 'RECEIVED_DATA',
		id
	};
}

export function search(value) {
	const action = {
		type: 'SEARCH_USER',
		searchValue: value
	};
	return action;
}
 