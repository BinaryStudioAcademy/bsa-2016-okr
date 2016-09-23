import axios from 'axios';
import { ROOT_URL } from '../../backend/config/constants';

import { ADD_REQUEST, REMOVE_REQUEST } from './appActions';

export const GET_CATEGORIES_STATS = 'STATS:GET_CATEGORIES_STATS';
export const RECEIVED_CATEGORIES_STATS = 'STATS:RECEIVED_CATEGORIES_STATS';

export const GET_KEYRESULT_STATS = 'STATS:GET_KEYRESULT_STATS';
export const RECEIVED_KEYRESULT_STATS = 'STATS:RECEIVED_KEYRESULT_STATS';

export const RECEIVED_ERROR = 'STATS:RECEIVED_ERROR';

export function getCategoriesStats() {
	return (dispatch, getStore) => {
		dispatch({ type: GET_CATEGORIES_STATS });
		dispatch({ type: ADD_REQUEST });

		return axios.get(`${ ROOT_URL }/api/stats/categories`)
		.then(response => {
			dispatch(receivedCategoriesStats(response.data));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch(response => {
			dispatch(receivedError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function getKeyResultStats() {
	return (dispatch, getStore) => {
		dispatch({ type: GET_KEYRESULT_STATS });
		dispatch({ type: ADD_REQUEST });

		return axios.get(`${ ROOT_URL }/api/stats/keyresults`)
		.then(response => {
			dispatch(receivedKeyResultStats(response.data));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch(response => {
			dispatch(receivedError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function receivedCategoriesStats(data) {
	return {
		type: RECEIVED_CATEGORIES_STATS,
		data
	};
}

export function receivedKeyResultStats(data) {
	return {
		type: RECEIVED_KEYRESULT_STATS,
		data
	};
}

export function receivedError(data) {
	return {
		type: RECEIVED_ERROR,
		data
	};
}
