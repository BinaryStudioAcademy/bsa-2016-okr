import axios from 'axios';
import { ADD_REQUEST, REMOVE_REQUEST } from './appActions';

export const GET_USER = 'GET_USER';
export const RECEIVED_USER = 'RECEIVED_USER';
export const RECEIVED_ERROR = 'RECEIVED_ERROR';
export const CHANGE_TAB = 'CHANGE_TAB';
export const CHANGE_YEAR = 'CHANGE_YEAR';
export const TAKE_APPRENTICE = 'TAKE_APPRENTICE';
export const TOOK_APPRENTICE = 'TOOK_APPRENTICE';

export function getUser(id) {

	return (dispatch, getStore) => {
		dispatch({ type: GET_USER });
		dispatch({ type: ADD_REQUEST });

		return axios.get('/api/user/' + id)
		.then(response => {
			dispatch(receivedUser(response.data));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch(response => {
			dispatch(receivedError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
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

export function changeTab(num) {
	return {
		type: CHANGE_TAB,
		selectedTab: num
	};
}
export function changeYear(year) {
	return {
		type: CHANGE_YEAR,
		selectedYear: year
	};
}

export function takeApprentice(id) {

	return (dispatch, getStore) => {
		dispatch({ type: TAKE_APPRENTICE });
		dispatch({ type: ADD_REQUEST });

		return axios.post('/api/user/takeApprentice/' + id)
		.then(response => {
			dispatch(tookApprentice(response.data));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch(response => {
			dispatch(receivedError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function tookApprentice(response) {
	return {
		type: TOOK_APPRENTICE,
		response
	};
}
