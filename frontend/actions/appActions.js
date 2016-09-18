import { push } from 'react-router-redux';

export const ADD_REQUEST = 'APP.ADD_REQUEST';
export const REMOVE_REQUEST = 'APP.REMOVE_REQUEST';
export const INIT = 'APP.INIT';
export const SET_REDIRECT_URL = 'SET_REDIRECT_URL';

export function init() {
	return (dispatch, getStore) => {
		dispatch({ type: INIT });
	}
}

export function setRedirectUrl(url) {
	return {
		type: SET_REDIRECT_URL,
		url,
	}
}

export function redirectAfterAuth() {
	return (dispatch, getStore) => {
		let redirectUrl = getStore().app.redirectUrl;
		
		dispatch(push(redirectUrl));
	}
}