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