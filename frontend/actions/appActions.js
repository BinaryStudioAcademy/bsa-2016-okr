export const ADD_REQUEST = 'APP.ADD_REQUEST';
export const REMOVE_REQUEST = 'APP.REMOVE_REQUEST';
export const INIT = 'APP.INIT';

export function init() {
	return (dispatch, getStore) => {
		dispatch({ type: INIT });
	}
}