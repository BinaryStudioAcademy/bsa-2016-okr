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
export const MAPPING_SORTING_BY_G_ROLE = 'MAPPING_SORTING_BY_G_ROLE';
export const MAPPING_SET_GLOBAL_ROLE_FILTER = 'MAPPING_SET_GLOBAL_ROLE_FILTER';

export function setGlobalRoleFilter(value) {
	
	const action = {
		type: MAPPING_SET_GLOBAL_ROLE_FILTER,
		value: value
	};
	return action;
}

export function sortingByGlobalRole(value) {
	
	const action = {
		type: MAPPING_SORTING_BY_G_ROLE,
		value: value
	};
	return action;
}

export function updateUserLocRole(id, localRole) {
	return (dispatch, getStore) => {
		dispatch({
			type: MAPPING_UPDATE_USERS_LOCAL_ROLE,
			id: id,
			localRole: localRole
		});
	}
}

export function updateUserRole(id, body) {

	return (dispatch, getStore) => {
		dispatch({ type: MAPPING_UPDATE_USER_ROLE_REQUEST });
		dispatch({ type: ADD_REQUEST });

		return axios.put(('/api/user/' + id), body)
		.then(function(response) {
			dispatch(updateUserLocRole(id, JSON.parse(response.config.data).localRole));
			dispatch({ type: REMOVE_REQUEST	});
		})
		.catch(response => {
			dispatch(receivedUpdateUserError(response.data));
			dispatch({ type: REMOVE_REQUEST	});
		});
	};
}

export function getUsers() {
	
	return(dispatch, getStore) => {
		dispatch({ type: MAPPING_GET_USERS });
		dispatch({ type: ADD_REQUEST });

		return axios.get('api/user/')
		.then(response => {
			dispatch(receivedUsers(response.data));
			dispatch({ type: REMOVE_REQUEST	});
		})
		.catch(response => {
			dispatch(receivedUsersError(response.data));
			dispatch({ type: REMOVE_REQUEST	});
		});
	};
}

export function receivedUsers(data) {
	return(dispatch, getStore) => {
		dispatch({
			type: MAPPING_RECEIVED_USERS,
			data
		});
	}
}

export function updateRolesLocRole(id, localRole) {
	return(dispatch, getStore) => {
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
		dispatch({ type: MAPPING_UPDATE_GLOBAL_ROLE });
		dispatch({ type: ADD_REQUEST });

		return axios.put(("/api/role/" + id), body)
		.then(response => {
			dispatch(updateRolesLocRole(id, JSON.parse(response.config.data).localRole));
			dispatch({ type: REMOVE_REQUEST	});
		})
		.catch(response => {
			dispatch(receivedError(response.data));
			dispatch({ type: REMOVE_REQUEST	});
		});
	};
}


export function getGlobalRoles() {

	return (dispatch, getStore) => {
		dispatch({ type: MAPPING_GET_GLOBAL_ROLES });
		dispatch({ type: ADD_REQUEST	});

		return axios.get('/api/role/')
		.then(response => {
			dispatch(receivedGlobalRoles(response.data));
			dispatch({ type: REMOVE_REQUEST	});
		})
		.catch(response => {
			dispatch(receivedError(response.data));
			dispatch({ type: REMOVE_REQUEST	});
		});
	};
}

export function receivedUsersError(data) {
	return(dispatch, getStore) => {
		dispatch({
			type: GET_USERS_ERROR,
			data
		});
	}
}

export function receivedUpdateUserError(data) {
	return(dispatch, getStore) => {
		dispatch({
			type: MAPPING_UPDATE_USER_ERROR,
			data
		});
	}
}

export function receivedError(data) {
	return(dispatch, getStore) => {
		dispatch({
			type: MAPPING_RECEIVED_ERROR,
			data
		});
	}
}

export function receivedGlobalRoles(roles) {
	return(dispatch, getStore) => {
		dispatch({
			type: MAPPING_RECEIVED_GLOBAL_ROLES,
			roles
		});
	}
}