import axios from 'axios';
import { ADD_REQUEST, REMOVE_REQUEST } from './appActions';

export const CREATE_NEW_TEMPLATE = 'CREATE_NEW_TEMPLATE';
export const RECEIVED_NEW_TEMPLATE = 'RECEIVED_NEW_TEMPLATE';
export const RECEIVED_NEW_TEMPLATE_ERROR = 'RECEIVED_NEW_TEMPLATE_ERROR';

export function getUser(id) {

	return (dispatch, getStore) => {
		dispatch({ type: CREATE_NEW_TEMPLATE });
		dispatch({ type: ADD_REQUEST });

		return axios.post('/api/objective/', reqBoby)
		.then(response => {
			dispatch(receivedNewTemplate(response.data));
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch(response => {
			dispatch(receivedNewTemplateError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function receivedNewTemplateError(data) {
	return {
		type: RECEIVED_NEW_TEMPLATE_ERROR,
		data
	};
}

export function receivedNewTemplate(objective) {
	return {
		type: RECEIVED_NEW_TEMPLATE,
		objective
	};
}