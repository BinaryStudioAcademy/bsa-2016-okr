var axios = require('axios')

export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const RECEIVED_ALL_CATEGORIES = 'RECEIVED_ALL_CATEGORIES';
export const RECEIVED_ERROR = 'RECEIVED_ERROR';

export function getAllCategories() {
	return (dispatch, getStore) => {
		dispatch({
			type: GET_ALL_CATEGORIES
		});

		axios.get('/api/category/')
		.then( response =>	dispatch(receivedAllCategories(response.data)) )
		.catch( response => dispatch(receivedError(response.data)) );
	};
}

export function receivedAllCategories(data) {
	return {
		type: RECEIVED_ALL_CATEGORIES,
		data: data
	};
}

export function receivedError(data) {
	return {
		type: RECEIVED_ERROR,
		data: data
	};
}
