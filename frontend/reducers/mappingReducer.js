import {
	MAPPING_UPDATE_USERS_LOCAL_ROLE,
	MAPPING_UPDATE_USER_ROLE_REQUEST,
	MAPPING_GET_USERS,
	MAPPING_RECEIVED_USERS,
	MAPPING_UPDATE_ROLES_LOCAL_ROLE,
	MAPPING_USERS_ROLES_FILTER,
	MAPPING_UPDATE_GLOBAL_ROLE,
	MAPPING_GET_GLOBAL_ROLES,
	GET_USERS_ERROR,
	MAPPING_UPDATE_USER_ERROR,
	MAPPING_RECEIVED_ERROR,
	MAPPING_RECEIVED_GLOBAL_ROLES,
	MAPPING_SORTING_BY_G_ROLE,
	MAPPING_SET_GLOBAL_ROLE_FILTER,
	MAPPING_SORTING_BY_NAME,
	MAPPING_CLEAR
} from '../actions/mappingActions';

import {NOT_SORTED, SORTED_ASC, SORTED_DESC} from "../../backend/config/constants"; 

const initialState = {
	users : [],
	visibleUsers : [],
	roles: [],
	globalRoles: [],
	sortByGlobalRole: NOT_SORTED,
	sortByName: NOT_SORTED,
	globalRoleFilter: "",
	filter: "",
};


export default function mappingReducer(state = initialState, action = {}) {

	switch (action.type) {

		case MAPPING_CLEAR: {

			return Object.assign({}, state, {
				users : [],
				visibleUsers : [],
				roles: [],
				globalRoles: [],
				sortByGlobalRole: NOT_SORTED,
				sortByName: NOT_SORTED,
				globalRoleFilter: "",
				filter: "",
			})
		}

		case MAPPING_SET_GLOBAL_ROLE_FILTER: {

				const {value} = action;

				return Object.assign({}, state, {
					globalRoleFilter: value,
					visibleUsers: updateVisibleUsers(state.users, state.filter, state.sortByGlobalRole, state.sortByName, value)
				})
		}

		case MAPPING_SORTING_BY_G_ROLE: {

				const {value} = action;

				return Object.assign({}, state, {
					sortByGlobalRole: value,
					visibleUsers: updateVisibleUsers(state.users, state.filter, value, state.sortByName, state.globalRoleFilter)
				})
		}

		case MAPPING_SORTING_BY_NAME: {

				const {value} = action;

				return Object.assign({}, state, {
					sortByName: value,
					visibleUsers: updateVisibleUsers(state.users, state.filter, state.sortByGlobalRole, value, state.globalRoleFilter)
				})
		}

		case MAPPING_RECEIVED_USERS: {

			const {data} = action; 

			for (let i = 0; i < data.length; i++) {

				data[i].avatar = "avatar1.png";
				data[i].name = data[i].userInfo.firstName + " " + data[i].userInfo.lastName;
				data[i].email = data[i].userInfo.email;
				data[i].globalRole = data[i].userInfo.globalRole;

			}

			return Object.assign({}, state, {
				users: JSON.parse(JSON.stringify(data)), 
				visibleUsers:  updateVisibleUsers(data, state.filter, state.sortByGlobalRole, state.sortByName, state.globalRoleFilter),
				globalRoles: getAllGlobalRoles(data)
			})
		}

		case MAPPING_UPDATE_USER_ERROR: {

			const {data} = action;

			console.log(MAPPING_UPDATE_USER_ERROR);
			
			return state;
		}

		case GET_USERS_ERROR: {

			const {data} = action;

			console.log(GET_USERS_ERROR);
			
			return state;
		}


		case MAPPING_RECEIVED_ERROR: {

			const {data} = action;

			console.log(MAPPING_RECEIVED_ERROR);
			
			return state;
		}

		case MAPPING_RECEIVED_GLOBAL_ROLES: {

			const {roles} = action;

			
			return Object.assign({}, state, {
				roles: roles
			})
		}

		case MAPPING_USERS_ROLES_FILTER: {

			const {filter} = action;

			return Object.assign({}, state, {
				visibleUsers: updateVisibleUsers(state.users, filter, state.sortByGlobalRole, state.sortByName, state.globalRoleFilter),
				filter: filter
			})
		}

		case MAPPING_UPDATE_ROLES_LOCAL_ROLE: {

			const {localRole} = action;
			const {id} = action;

			let roles = JSON.parse(JSON.stringify(state.roles));

			return Object.assign({}, state, {
				roles: updateLocRole(roles, id, localRole)

			})
		}

		case MAPPING_UPDATE_USERS_LOCAL_ROLE: {

			const {localRole} = action;
			const {id} = action;

			let users = JSON.parse(JSON.stringify(state.users));   

			return Object.assign({}, state, {
				users: updateLocRole(users, id, localRole),
				visibleUsers: updateVisibleUsers(users, state.filter, state.sortByGlobalRole, state.sortByName, state.globalRoleFilter)
			})
		}

		default: {
			return state;
		}
	}
}


function updateVisibleUsers(users, filter, sortByGlobalRole, sortByName, globalRoleFilter) {

	
	let visibleUsers = [];

	if (filter === "")
		visibleUsers = JSON.parse(JSON.stringify(users));
	else 
	{
		for (let i = 0; i < users.length; i++) {

			if (users[i].name.toUpperCase().indexOf(filter.toUpperCase()) >= 0 ||
				users[i].email.toUpperCase().indexOf(filter.toUpperCase()) >= 0) {
				visibleUsers.push(users[i]);
			}
		}
    }

	for (let i = 0; i < visibleUsers.length; i++) {

		if (visibleUsers[i].globalRole != globalRoleFilter && globalRoleFilter != "") {
			visibleUsers.splice(i, 1);
			--i;
		}

	}

	if (sortByGlobalRole != NOT_SORTED) {

		if (sortByGlobalRole == SORTED_ASC) {

			visibleUsers.sort(function(a, b) {
			    if(a.globalRole < b.globalRole) return -1;
			    if(a.globalRole > b.globalRole) return 1;
			    return 0;
			});

		} else {

			visibleUsers.sort(function(a, b) {
				if(a.globalRole < b.globalRole) return 1;
			    if(a.globalRole > b.globalRole) return -1;
			    return 0;
			});
		}
	}

	if (sortByName != NOT_SORTED) {

		if (sortByName == SORTED_ASC) {

			visibleUsers.sort(function(a, b) {
			    if(a.name < b.name) return -1;
			    if(a.name > b.name) return 1;
			    return 0;
			});

		} else {

			visibleUsers.sort(function(a, b) {
				if(a.name < b.name) return 1;
			    if(a.name > b.name) return -1;
			    return 0;
			});
		}
	}

	return visibleUsers;
}

	function getAllGlobalRoles(users) {

		let globalRoles = [];
		let found;

		for (let i = 0; i < users.length; i++) {

			found = false;

			for (let j = 0; j < globalRoles.length; j++) {

				if (globalRoles[j].globalRole === users[i].globalRole ) {
					found = true;
					++globalRoles[j].count;
				}
			}

			if (!found) {
				globalRoles.push({globalRole: users[i].globalRole, count: 1, id: globalRoles.length});
			}
		}


		return globalRoles;
}


function updateLocRole(array, id, localRole) {

	for (let i = 0; i < array.length; i++) {

		if (array[i]._id === id) {
			if (localRole != array[i].localRole)
				array[i].localRole = localRole;

			break;

		}
	}

	return array;
}
