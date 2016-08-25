import axios from 'axios';

import { ADD_REQUEST, REMOVE_REQUEST } from './appActions';

export const GET_ALL_CATEGORIES = 'CATEGORIES.GET_ALL';
export const RECEIVED_ALL_CATEGORIES = 'CATEGORIES.RECEIVED_ALL';
export const RECEIVED_ERROR = 'CATEGORIES.RECEIVED_ERROR';

export function getAllCategories() {
	return (dispatch, getStore) => {
		dispatch({ type: GET_ALL_CATEGORIES	});
		dispatch({ type: ADD_REQUEST });

		axios.get('/api/category/')
		.then( response =>	{
			dispatch(receivedAllCategories(response.data));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch( response => {
			dispatch(receivedError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function receivedAllCategories(data) {
	return (dispatch, getStore) => {
		dispatch({
			type: RECEIVED_ALL_CATEGORIES,
			data: data
		});
	}
}

export function receivedError(data) {
	return (dispatch, getStore) => {
		dispatch({
			type: RECEIVED_ERROR,
			data: data
		});
	}
}
