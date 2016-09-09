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
	MAPPING_SET_GLOBAL_ROLE_FILTER
} from '../actions/mappingActions';

const initialState = {
	users : [],
	visibleUsers : [],
	roles: [],
	globalRoles: [],
	sortByGlobalRole: false,
	isSortingUsed: false,
	globalRoleFilter: "",
	filter: "",
};


export default function mappingReducer(state = initialState, action = {}) {

	switch (action.type) {

		case MAPPING_SET_GLOBAL_ROLE_FILTER: {

				const {value} = action;

				return Object.assign({}, state, {
					globalRoleFilter: value,
					visibleUsers: updateVisibleUsers(state.users, state.filter, state.sortByGlobalRole, state.isSortingUsed, value)
				})
		}

		case MAPPING_SORTING_BY_G_ROLE: {

				const {value} = action;

				return Object.assign({}, state, {
					sortByGlobalRole: value,
					isSortingUsed: true,
					visibleUsers: updateVisibleUsers(state.users, state.filter, value, true, state.globalRoleFilter)
				})
		}

		case MAPPING_RECEIVED_USERS: {

			const {data} = action; 

			//console.log(data);

			for (let i = 0; i < data.length; i++) {

				data[i].avatar = "avatar1.png";
				data[i].name = data[i].userInfo.firstName + " " + data[i].userInfo.lastName;
				data[i].lastName = data[i].userInfo.lastName;
				data[i].email = data[i].userInfo.email;
				data[i].secondPartEmail = data[i].email.substr(data[i].email.indexOf('@') + 1);
				data[i].globalRole = data[i].userInfo.globalRole;

			}

			return Object.assign({}, state, {
				users: JSON.parse(JSON.stringify(data)),
				visibleUsers:  updateVisibleUsers(data, state.filter, state.sortByGlobalRole, state.isSortingUsed, state.globalRoleFilter),
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
				visibleUsers: updateVisibleUsers(state.users, filter, state.sortByGlobalRole, state.isSortingUsed, state.globalRoleFilter),
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
				visibleUsers: updateVisibleUsers(users, state.filter, state.sortByGlobalRole, state.isSortingUsed, state.globalRoleFilter)
			})
		}

		default: {
			return state;
		}
	}
}


function updateVisibleUsers(users, filter, sortByGlobalRole, isSortingUsed, globalRoleFilter) {

	
	let visibleUsers = [];

	if (filter === "")
		visibleUsers = JSON.parse(JSON.stringify(users));
	else 
	{
		for (let i = 0; i < users.length; i++) {

			if (users[i].name.toUpperCase().indexOf(filter.toUpperCase()) === 0 ||
				users[i].lastName.toUpperCase().indexOf(filter.toUpperCase()) === 0  ||
				users[i].email.toUpperCase().indexOf(filter.toUpperCase()) === 0 ||
				users[i].secondPartEmail.toUpperCase().indexOf(filter.toUpperCase()) === 0) {
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

	if (!sortByGlobalRole) {

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


	return visibleUsers;
}

	function getAllGlobalRoles(users) {

		let globalRoles = [];
		let found;

		for (let i = 0; i < users.length; i++) {

			found = false;

			for (let j = 0; j < globalRoles.length; j++) {

				if (globalRoles[j].globalRole.indexOf(users[i].globalRole) != -1) {
					found = true;
					++globalRoles[j].count;
				}
			}

			if (!found) {
				globalRoles.push({globalRole: users[i].globalRole, count: 0, id: globalRoles.length});
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
