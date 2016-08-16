var axios = require('axios');

export function sendRequest(userId) {
	console.log(userId)
	return (dispatch, getStore) => {

	dispatch({
		type: 'SEND_REQUEST'
	});

	return axios.get('http://localhost:4444/user/' + userId)
		.then(response => dispatch(receivedData(userId)))
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
	console.log('d')
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

export function takeUserId(id) {
	const action = {
		type: 'TAKE_USER',
		id: id
	};
	return action;
}  