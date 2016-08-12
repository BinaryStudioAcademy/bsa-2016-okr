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
		type: RECEIVED_ERROR,
		data
	};
}

export function receivedData(user) {
	console.log(user)
	return {
		type: 'RECEIVED_DATA',
		userItem: user
	};
}

export function search(value) {
	const action = {
		type: 'SEARCH_USER',
		searchValue: value
	};
	return action;
}

export function takeUserId(user) {
	const action = {
		type: 'TAKE_USER',
		userItem: user
	};
	return action;
}  