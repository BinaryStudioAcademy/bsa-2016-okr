import axios from 'axios';
import { ADD_REQUEST, REMOVE_REQUEST } from './appActions';
import { GET_NOT_APPROVED_OBJECTIVES_REQUEST,
				 GET_NOT_APPROVED_KEYS_REQUEST } from './acceptObjective.js'
export const GET_USER = 'GET_USER';
export const RECEIVED_USER = 'RECEIVED_USER';
export const RECEIVED_ERROR = 'RECEIVED_ERROR';
export const CHANGE_TAB = 'CHANGE_TAB';
export const CHANGE_YEAR = 'CHANGE_YEAR';
export const TAKE_APPRENTICE = 'TAKE_APPRENTICE';
export const TOOK_APPRENTICE = 'TOOK_APPRENTICE';
export const REMOVE_APPRENTICE = 'REMOVE_APPRENTICE';
export const REMOVED_APPRENTICE = 'REMOVED_APPRENTICE';
export const ADDED_NEW_OBJECTIVE_OTHER_USER = 'ADDED_NEW_OBJECTIVE_OTHER_USER';
export const ADD_NEW_OBJECTIVE_OTHER_USER = 'ADD_NEW_OBJECTIVE_OTHER_USER';

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

export function addNewObjective(body) {
	return (dispatch, getStore) => {
		dispatch({ type: ADD_NEW_OBJECTIVE_OTHER_USER });
		dispatch({ type: ADD_REQUEST	});

		return axios.post(('/api/userObjective/'), body)
		.then(response => {
			dispatch(addedNewObjective(response.data, body));
			dispatch({ type: REMOVE_REQUEST	});

			dispatch({ type: GET_NOT_APPROVED_OBJECTIVES_REQUEST })
			dispatch({ type: GET_NOT_APPROVED_KEYS_REQUEST })
		})
		.catch(response => {
			dispatch(receivedError(response.data));
			dispatch({ type: REMOVE_REQUEST	});
		});
	};
}

export function addedNewObjective(data, body) {
	return {
		type: ADDED_NEW_OBJECTIVE_OTHER_USER,
		responseData: data,
		requestData: body,
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

export function takeApprentice(id, me) {

	return (dispatch, getStore) => {
		dispatch({ type: TAKE_APPRENTICE });
		dispatch({ type: ADD_REQUEST });

		return axios.post('/api/user/takeApprentice/' + id)
		.then(response => {
			dispatch(tookApprentice(response.data, me));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch(response => {
			dispatch(receivedError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function tookApprentice(response, me) {
	return {
		type: TOOK_APPRENTICE,
		response,
		me
	};
}

export function removeApprentice(id) {

	return (dispatch, getStore) => {
		dispatch({ type: REMOVE_APPRENTICE });
		dispatch({ type: ADD_REQUEST });

		return axios.post('/api/user/removeApprentice/' + id)
		.then(response => {
			dispatch(removedApprentice(response.data));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch(response => {
			dispatch(receivedError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function removedApprentice(response) {
	return {
		type: REMOVED_APPRENTICE,
		response
	};
}
