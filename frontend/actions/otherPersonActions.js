export function sendRequest(userId) {
	return (dispatch, getStore) => {

	dispatch({
		type: 'SEND_REQUEST'
	});

	return axios.get('http://localhost:3000/user/' + userId)
		.then(response => dispatch(receivedData(response.data)))
		.catch(response => dispatch(receivedError(response.data)));
	};
}

export function receivedError(data) {
	return {
		type: 'RECEIVED_ERROR',
		data
	};
}

export function receivedData(data) {
	console.log('d')
	return {
		type: 'RECEIVED_DATA',
		data
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