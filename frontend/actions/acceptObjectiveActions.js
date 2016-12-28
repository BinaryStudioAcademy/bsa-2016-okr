import axios from 'axios';
import { ROOT_URL } from '../../backend/config/constants';

import { ADD_REQUEST, REMOVE_REQUEST } from './appActions';
import  { GET_DELETED_CATEGORIES_REQUEST } from './recycleBinActions';

export const GET_NOT_APPROVED_OBJECTIVES_REQUEST = 'GET_NOT_APPROVED_OBJECTIVES_REQUEST';
export const RECEIVED_NOT_APPROVED_OBJECTIVES = 'RECEIVED_NOT_APPROVED_OBJECTIVES';
export const GET_NOT_APPROVED_OBJECTIVES_REQUEST_ERROR = 'GET_NOT_APPROVED_OBJECTIVES_REQUEST_ERROR';
export const GET_NOT_APPROVED_KEYS_REQUEST = 'GET_NOT_APPROVED_KEYS_REQUEST';
export const RECEIVED_NOT_APPROVED_KEYS = 'RECEIVED_NOT_APPROVED_KEYS';
export const GET_NOT_APPROVED_KEYS_REQUEST_ERROR = 'GET_NOT_APPROVED_KEYS_REQUEST_ERROR';
export const CLEAR_OBJ_APPROVE_ITEMS = 'CLEAR_OBJ_APPROVE_ITEMS';
export const UPDATE_OBJECTIVE_TEMPLATE_REQUEST = 'UPDATE_OBJECTIVE_TEMPLATE_REQUEST';
export const UPDATE_OBJECTIVE_TEMPLATE = 'UPDATE_OBJECTIVE_TEMPLATE';
export const UPDATE_OBJECTIVE_TEMPLATE_ERROR = 'UPDATE_OBJECTIVE_TEMPLATE_ERROR';
export const DELETE_ITEM_FROM_OBJ_APP_STATE = 'DELETE_ITEM_FROM_OBJ_APP_STATE';
export const UPDATE_KEY_TEMPLATE_REQUEST = 'UPDATE_KEY_TEMPLATE_REQUEST';
export const UPDATE_KEY_TEMPLATE = 'UPDATE_KEY_TEMPLATE';
export const UPDATE_KEY_TEMPLATE_ERROR = 'UPDATE_KEY_TEMPLATE_ERROR';
export const SET_ACC_OBJ_FILTER = 'SET_ACC_OBJ_FILTER';


export function setFilter(value) {

	const action = {
		type: SET_ACC_OBJ_FILTER,
		value: value
	};

	return action;

}

export function deleteItemFromState(id) {

	const action = {
		type: DELETE_ITEM_FROM_OBJ_APP_STATE,
		id: id
	};

	return action;
}

export function updateKeyTemplateRequest(id, body, idItem) {

	return (dispatch, getStore) => {

		dispatch({ type:  UPDATE_KEY_TEMPLATE_REQUEST });
		dispatch({ type: ADD_REQUEST });

		return axios.put(`${ ROOT_URL }/api/keyResult/updateWithoutValidation/${ id }`, body)
		.then(response => {
			dispatch(deleteItemFromState(idItem));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch(response => {
			dispatch(updateKeyTemplateError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function updateKeyTemplateError(data) {
	return {
		type: UPDATE_KEY_TEMPLATE_ERROR,
		data
	};
}

export function updateObjectiveTemplateRequest(id, body, idItem) {

	return (dispatch, getStore) => {
		dispatch({ type:  UPDATE_OBJECTIVE_TEMPLATE_REQUEST });
		dispatch({ type: ADD_REQUEST });

		return axios.put((`${ ROOT_URL }/api/objective/updateWithoutValidation/${ id }`), body)
		.then(response => {
			dispatch(deleteItemFromState(idItem));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch(response => {
			dispatch(updateObjectiveTemplateError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function updateObjectiveTemplateError(data) {
	return {
		type: UPDATE_OBJECTIVE_TEMPLATE_ERROR,
		data
	};
}

export function getDeletedCategoriesRequest() {

	return (dispatch, getStore) => {
		dispatch({ type: GET_DELETED_CATEGORIES_REQUEST });
		dispatch({ type: ADD_REQUEST });

		return axios.get(`${ ROOT_URL }/api/category/deleted`)
		.then(response => {
			dispatch(receivedDeletedCategories(response.data));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch(response => {
			dispatch(receivedDeletedCategoriesError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function getNotAprovedKeysRequest() {

	return (dispatch, getStore) => {
		dispatch({ type: GET_NOT_APPROVED_KEYS_REQUEST });
		dispatch({ type: ADD_REQUEST });

		return axios.get(`${ ROOT_URL }/api/keyResult/notApproved`)
		.then(response => {
			dispatch(receivedNotApprovedKeys(response.data));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch(response => {
			dispatch(receivedNotApprovedKeysError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function receivedNotApprovedKeys(data) {
	return {
		type: RECEIVED_NOT_APPROVED_KEYS,
		data
	};
}

export function receivedNotApprovedKeysError(data) {
	return {
		type: GET_NOT_APPROVED_KEYS_REQUEST_ERROR,
		data
	};
}

export function getNotAprovedObjectivesRequest() {

	return (dispatch, getStore) => {
		dispatch({ type: GET_NOT_APPROVED_OBJECTIVES_REQUEST });
		dispatch({ type: ADD_REQUEST });

		return axios.get(`${ ROOT_URL }/api/objective/notApproved`)
		.then(response => {
			dispatch(receivedNotApprovedObjectives(response.data));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch(response => {
			dispatch(receivedNotApprovedObjectivesError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function receivedNotApprovedObjectives(data) {
	return {
		type: RECEIVED_NOT_APPROVED_OBJECTIVES,
		data
	};
}


export function receivedNotApprovedObjectivesError(data) {
	return {
		type: GET_NOT_APPROVED_OBJECTIVES_REQUEST_ERROR,
		data
	};
}

export function clearObjApproveITems() {
	return {
		type: CLEAR_OBJ_APPROVE_ITEMS
	};
}
