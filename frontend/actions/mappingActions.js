var axios = require('axios')

export function updateUserLocRole(id, localRole) {

	const action = {
		type: "MAPPING_UPDATE_USERS_LOCAL_ROLE",
		id: id,
		localRole: localRole
	};
	return action;
}


export function updateUserRole(id, body) {

	 return (dispatch, getStore) => {

		  dispatch({
		   type: "MAPPING_UPDATE_USER_ROLE_REQUEST"
		  });

	   return axios.put(('/api/user/' + id), body)
		  .then(function(response){
		  	dispatch(updateUserLocRole(id, JSON.parse(response.config.data).localRole));
		}).catch(response => dispatch(receivedUpdateUserError(response.data)));
	};
}


export function getUsers(){
	
	return(dispatch, getStore) => {

		dispatch({
			type: "MAPPING_GET_USERS"
		});

		return axios.get('api/user/')
			.then(response => dispatch(receivedUsers(response.data)))
			.catch(response => dispatch(receivedUsersError(response.data)));
	};
}

export function receivedUsers(data) {
	return {
		type: "MAPPING_RECEIVED_USERS",
		data
	};
}

export function updateRolesLocRole(id, localRole) {
	const action = {
		type: "MAPPING_UPDATE_ROLES_LOCAL_ROLE",
		id: id,
		localRole: localRole
	};
	return action;
}

export function filterUsersRoles(filter) {
    const action = {
        type: "MAPPING_USERS_ROLES_FILTER",
        filter
    };
    return action;
}

export function updateGlobalRole(id, body) {

	 return (dispatch, getStore) => {

		  dispatch({
		   type: "MAPPING_UPDATE_GLOBAL_ROLE"
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
		   type: "MAPPING_GET_GLOBAL_ROLES"
		  });

	  return axios.get('/api/role/')
	   .then(response => dispatch(receivedGlobalRoles(response.data)))
	   .catch(response => dispatch(receivedError(response.data)));
	 };
}

export function receivedUsersError(data) {
	 return {
	  type: "GET_USERS_ERROR",
	  data
	 };
}

export function receivedUpdateUserError(data) {
	 return {
	  type: "MAPPING_UPDATE_USER_ERROR",
	  data
	 };
}

export function receivedError(data) {
	 return {
	  type: "MAPPING_RECEIVED_ERROR",
	  data
	 };
}

export function receivedGlobalRoles(roles) {
	 return {
		  type: "MAPPING_RECEIVED_GLOBAL_ROLES",
		  roles
	 };
}