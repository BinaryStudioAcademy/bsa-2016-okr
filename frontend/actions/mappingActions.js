import axios from 'axios';
import { ADD_REQUEST, REMOVE_REQUEST } from './appActions';

export const MAPPING_UPDATE_USERS_LOCAL_ROLE = 'MAPPING_UPDATE_USERS_LOCAL_ROLE';
export const MAPPING_UPDATE_USER_ROLE_REQUEST = 'MAPPING_UPDATE_USER_ROLE_REQUEST';
export const MAPPING_GET_USERS = 'MAPPING_GET_USERS';
export const MAPPING_RECEIVED_USERS = 'MAPPING_RECEIVED_USERS';
export const MAPPING_UPDATE_ROLES_LOCAL_ROLE = 'MAPPING_UPDATE_ROLES_LOCAL_ROLE';
export const MAPPING_USERS_ROLES_FILTER = 'MAPPING_USERS_ROLES_FILTER';
export const MAPPING_UPDATE_GLOBAL_ROLE = 'MAPPING_UPDATE_GLOBAL_ROLE';
export const MAPPING_GET_GLOBAL_ROLES = 'MAPPING_GET_GLOBAL_ROLES';
export const GET_USERS_ERROR = 'GET_USERS_ERROR';
export const MAPPING_UPDATE_USER_ERROR = 'MAPPING_UPDATE_USER_ERROR';
export const MAPPING_RECEIVED_ERROR = 'MAPPING_RECEIVED_ERROR';
export const MAPPING_RECEIVED_GLOBAL_ROLES = 'MAPPING_RECEIVED_GLOBAL_ROLES';

export function updateUserLocRole(id, localRole) {
	return (dispatch, getStore) => {
		dispatch({
			type: REMOVE_REQUEST
		});

		dispatch({
			type: MAPPING_UPDATE_USERS_LOCAL_ROLE,
			id: id,
			localRole: localRole
		});
	}
}

export function updateUserRole(id, body) {

	return (dispatch, getStore) => {

		dispatch({
			type: ADD_REQUEST
		});

		dispatch({
			type: MAPPING_UPDATE_USER_ROLE_REQUEST
		});

		return axios.put(('/api/user/' + id), body)
		.then(function(response) {
			dispatch(updateUserLocRole(id, JSON.parse(response.config.data).localRole));
		}).catch(response => dispatch(receivedUpdateUserError(response.data)));
	};
}

export function getUsers() {
	
	return(dispatch, getStore) => {

		dispatch({
			type: ADD_REQUEST
		});

		dispatch({
			type: MAPPING_GET_USERS
		});

		return axios.get('api/user/')
		.then(response => dispatch(receivedUsers(response.data)))
		.catch(response => dispatch(receivedUsersError(response.data)));
	};
}

export function receivedUsers(data) {
	return(dispatch, getStore) => {
		dispatch({
			type: REMOVE_REQUEST
		});

		dispatch({
			type: MAPPING_RECEIVED_USERS,
			data
		});
	}
}

export function updateRolesLocRole(id, localRole) {
	return(dispatch, getStore) => {
		dispatch({
			type: REMOVE_REQUEST
		});

		dispatch({
			type: MAPPING_UPDATE_ROLES_LOCAL_ROLE,
			id: id,
			localRole: localRole
		});
	}
}

export function filterUsersRoles(filter) {
	const action = {
		type: MAPPING_USERS_ROLES_FILTER,
		filter
	};
	return action;
}

export function updateGlobalRole(id, body) {

	return (dispatch, getStore) => {

		dispatch({
			type: ADD_REQUEST
		});

		dispatch({
			type: MAPPING_UPDATE_GLOBAL_ROLE
		});

		return axios.put(("/api/role/" + id), body)
		.then(function(response){
			dispatch(updateRolesLocRole(id, JSON.parse(response.config.data).localRole));
		}).catch(response => dispatch(receivedError(response.data)));
	};
}


export function getGlobalRoles() {

	return (dispatch, getStore) => {

		dispatch({
			type: MAPPING_GET_GLOBAL_ROLES
		});

		return axios.get('/api/role/')
		.then(response => dispatch(receivedGlobalRoles(response.data)))
		.catch(response => dispatch(receivedError(response.data)));
	};
}

export function receivedUsersError(data) {
	return(dispatch, getStore) => {
		dispatch({
			type: REMOVE_REQUEST
		});

		dispatch({
			type: GET_USERS_ERROR,
			data
		});
	}
}

export function receivedUpdateUserError(data) {
	return(dispatch, getStore) => {
		dispatch({
			type: REMOVE_REQUEST
		});

		dispatch({
			type: MAPPING_UPDATE_USER_ERROR,
			data
		});
	}
}

export function receivedError(data) {
	return(dispatch, getStore) => {
		dispatch({
			type: REMOVE_REQUEST
		});

		dispatch({
			type: MAPPING_RECEIVED_ERROR,
			data
		});
	}
}

export function receivedGlobalRoles(roles) {
	return(dispatch, getStore) => {
		dispatch({
			type: REMOVE_REQUEST
		});

		dispatch({
			type: MAPPING_RECEIVED_GLOBAL_ROLES,
			roles
		});
	}
}