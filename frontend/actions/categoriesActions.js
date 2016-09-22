import axios from 'axios';
import { ROOT_URL } from '../../backend/config/constants';

import { ADD_REQUEST, REMOVE_REQUEST } from './appActions';

export const GET_ALL_CATEGORIES = 'CATEGORIES.GET_ALL';
export const RECEIVED_ALL_CATEGORIES = 'CATEGORIES.RECEIVED_ALL';
export const RECEIVED_ERROR = 'CATEGORIES.RECEIVED_ERROR';

export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const RECIVED_DELETE_CATEGORY = 'RECIVED_DELETE_CATEGORY';
export const DELETE_CATEGORY_ERROR = 'DELETE_CATEGORY_ERROR';

export const EDIT_CATEGORY = 'EDIT_CATEGORY';
export const CANCEL_EDIT_CATEGORY = 'CANCEL_EDIT_CATEGORY';
export const ACTIVE_CATEGORY = 'ACTIVE_CATEGORY';
export const RECIVED_EDIT_CATEGORY = 'RECIVED_EDIT_CATEGORY';
export const EDIT_CATEGORY_ERROR = 'EDIT_CATEGORY_ERROR'

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const RECIVED_NEW_CATEGORY = 'RECIVED_NEW_CATEGORY';
export const RECIVED_NEW_CATEGORY_ERROR = 'RECIVED_NEW_CATEGORY_ERROR';

export function getAllCategories() {
	return (dispatch, getStore) => {
		dispatch({ type: GET_ALL_CATEGORIES	});
		dispatch({ type: ADD_REQUEST });

		axios.get(`${ ROOT_URL }/api/category/`)
		.then( response =>	{
			dispatch(receivedAllCategories(response.data));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch( response => {
			dispatch(receivedError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function receivedAllCategories(data) {
	return (dispatch, getStore) => {
		dispatch({
			type: RECEIVED_ALL_CATEGORIES,
			data: data
		});
	}
}

export function receivedError(data) {
	return (dispatch, getStore) => {
		dispatch({
			type: RECEIVED_ERROR,
			data: data
		});
	}
}

/*------delete category-------*/

export function deleteCategory(id, flag) {

	return(dispatch, getStore) => {

		dispatch({
			type: DELETE_CATEGORY
		});

		return axios.delete(`${ ROOT_URL }/api/category/${ id }/${ flag }`)
			.then(response => dispatch(receivedDeleteCategory(id, flag)))
			.catch(response => dispatch(deleteCategoryError(response.data)));
	};
}

export function receivedDeleteCategory(id, flag) {
	return {
		type: RECIVED_DELETE_CATEGORY,
		id,
		flag,
	};
}

export function deleteCategoryError(data) {
	return {
		type: DELETE_CATEGORY_ERROR,
		data
	};
}

/*------Edit category-------*/

export function cancelEdit() {
	const action = {
		type: CANCEL_EDIT_CATEGORY,
	};
	return action;
}

export function setActiveCategory(activeCategory) {
	const action = {
		type: ACTIVE_CATEGORY,
		activeCategory
	};

	return action;
}

export function editCategory(id, reqBody ) {
	return(dispatch, getStore) => {

		dispatch({ type: EDIT_CATEGORY });

		return axios.put(`${ ROOT_URL }/api/category/${ id }/`, reqBody)
			.then(response => dispatch(receivedEditCategory(response.data, reqBody)))
			.catch(response => dispatch(editCategoryError(response.data)));
	};
}

export function receivedEditCategory(data, reqBody) {
	return {
		type: RECIVED_EDIT_CATEGORY,
		data,
		reqBody
	};
}

export function editCategoryError(data) {
	return {
		type: EDIT_CATEGORY_ERROR,
		data
	};
}

/*------ADD NEW CATEGORY------*/

export function addCategory(reqBody) {
	return (dispatch, getStore) => {

	dispatch({
			type: ADD_CATEGORY
	});

	return axios.post(`${ ROOT_URL }/api/category/`, reqBody)
			.then(response => dispatch(receivedNewCategory(response.data)))
			.catch(response => dispatch(receivedNewCategoryError(response.data)));
	};
}

export function receivedNewCategory(data){
	return {
		type: RECIVED_NEW_CATEGORY,
		data
	}
}

export function receivedNewCategoryError(data){
	return {
		type: RECIVED_NEW_CATEGORY_ERROR,
		data
	}
}
