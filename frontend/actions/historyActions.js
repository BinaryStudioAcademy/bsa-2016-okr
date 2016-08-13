
export function search(value) {
	const action = {
		type: 'SEARCH_OBJECTS',
		searchValue: value
	};
	return action;
}