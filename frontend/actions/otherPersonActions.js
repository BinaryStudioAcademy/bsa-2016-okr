import axios from 'axios';
import { ADD_REQUEST, REMOVE_REQUEST } from './appActions';

export const GET_USER = 'OTHER_PERSON:GET_USER';
export const RECEIVED_USER = 'OTHER_PERSON:RECEIVED_USER';
export const RECEIVED_ERROR = 'OTHER_PERSON:RECEIVED_ERROR';
export const CHANGE_TAB = 'OTHER_PERSON:CHANGE_TAB';
export const CHANGE_YEAR = 'OTHER_PERSON:CHANGE_YEAR';
export const TAKE_APPRENTICE = 'OTHER_PERSON:TAKE_APPRENTICE';
export const TOOK_APPRENTICE = 'OTHER_PERSON:TOOK_APPRENTICE';
export const REMOVE_APPRENTICE = 'OTHER_PERSON:REMOVE_APPRENTICE';
export const REMOVED_APPRENTICE = 'OTHER_PERSON:REMOVED_APPRENTICE';
export const ADDED_NEW_OBJECTIVE_OTHER_USER = 'OTHER_PERSON:ADDED_NEW_OBJECTIVE_OTHER_USER';
export const ADD_NEW_OBJECTIVE_OTHER_USER = 'OTHER_PERSON:ADD_NEW_OBJECTIVE_OTHER_USER';

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
