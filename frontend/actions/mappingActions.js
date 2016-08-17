var axios = require('axios')

export function updateUserLocRole(id, localRole) {

	const action = {
		type: "UPDATE_USERS_LOCAL_ROLE",
		id: id,
		localRole: localRole
	};
	return action;
}

export function updateRolesLocRole(id, localRole) {
	const action = {
		type: "UPDATE_ROLES_LOCAL_ROLE",
		id: id,
		localRole: localRole
	};
	return action;
}

export function filterUsersRoles(filter) {
    const action = {
        type: "USERS_ROLES_FILTER",
        filter
    };
    return action;
}

export function updateGlobalRole(id, body) {

	 return (dispatch, getStore) => {

		  dispatch({
		   type: "UPDATE_GLOBAL_ROLE"
		  });

	   return axios.put(("api/role/" + id), body)
		  .then(function(response){
		  	dispatch(updateRolesLocRole(id, JSON.parse(response.config.data).localRole));
		}).catch(response => dispatch(receivedError(response.data)));
	};
}


export function getGlobalRoles() {
 
     return (dispatch, getStore) => {

		  dispatch({
		   type: "GET_GLOBAL_ROLES"
		  });

	  return axios.get('api/role/')
	   .then(response => dispatch(receivedGlobalRoles(response.data)))
	   .catch(response => dispatch(receivedError(response.data)));
	 };
}

export function receivedError(data) {
	 return {
	  type: "RECEIVED_ERROR",
	  data
	 };
}

export function receivedGlobalRoles(roles) {
	 return {
		  type: "RECEIVED_GLOBAL_ROLES",
		  roles
	 };
}