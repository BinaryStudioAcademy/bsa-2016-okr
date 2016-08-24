import axios from 'axios';
import { ADD_REQUEST, REMOVE_REQUEST } from './appActions';

export const SEARCH_USER = 'SEARCH_USER';
export const GET_USERS_LIST = 'GET_USERS_LIST';
export const RECEIVED_USERS_LIST = 'RECEIVED_USERS_LIST';
export const USERS_LIST_ERROR = 'USERS_LIST_ERROR';

export function getUsersList() {
	
	return(dispatch, getStore) => {

		dispatch({
			type: GET_USERS_LIST
		});

		dispatch({
			type: ADD_REQUEST
		});

		return axios.get('/api/user/quarter')
			.then(response => dispatch(receivedUsersList(response.data)))
			.catch(response => dispatch(userslistError(response.data)));
	};
}

export function userslistError(data) {
	return(dispatch, getStore) => {
		dispatch({
			type: USER_LISTS_ERROR,
			data
		});

		dispatch({
			type: REMOVE_REQUEST
		});
	}
}

export function receivedUsersList(data) {
	return (dispatch, getState) => {
		
		dispatch({
			type: REMOVE_REQUEST
		});

		dispatch({
			type: RECEIVED_USERS_LIST,
			data
		});
	}
}
export function search(value) {
	const action = {
		type: SEARCH_USER,
		searchValue: value
	};
	return action;
}
 