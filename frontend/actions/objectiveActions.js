import axios from 'axios';
import { ROOT_URL } from '../../backend/config/constants';

import { ADD_REQUEST, REMOVE_REQUEST } from './appActions';

// Get objective for show autocomplete list
export const GET_AUTOCOMPLETE_OBJECTIVES = 'GET_AUTOCOMPLETE_OBJECTIVES';
export const RECEIVED_AUTOCOMPLETE_OBJECTIVES = 'RECEIVED_AUTOCOMPLETE_OBJECTIVES';

// Set selected autocomplete objectives to global store
export const SET_AUTOCOMPLETE_OBJECTIVES_SELECTED_ITEM = 'SET_AUTOCOMPLETE_OBJECTIVES_SELECTED_ITEM';

// Return AXIOS error
export const RECEIVED_ERROR = 'RECEIVED_ERROR';

export function getAutocompleteObjectives(categoryId, quarterId, title) {
	return (dispatch, getStore) => {
		dispatch({ type: GET_AUTOCOMPLETE_OBJECTIVES });
		dispatch({ type: ADD_REQUEST });

		return axios.get(`${ ROOT_URL }/api/objective/category/${ categoryId }/quarter/${ quarterId }/${ encodeURIComponent(title) }`)
		.then(response => {
			dispatch(receivedAutocompleteObjectives(response.data))
			dispatch({ type: REMOVE_REQUEST	});
		})
		.catch(response => {
			dispatch(receivedError(response.data))
			dispatch({ type: REMOVE_REQUEST	});
		});
	};
}

export function getAutocompleteObjectivesBacklog(categoryId, title) {
	return (dispatch, getStore) => {
		dispatch({ type: ADD_REQUEST });

		return axios.get(`${ ROOT_URL }/api/objective/backlog/category/${ categoryId }/${ encodeURIComponent(title) }`)
			.then(response => {
				dispatch(receivedAutocompleteObjectives(response.data));
				dispatch({ type: REMOVE_REQUEST	});
			})
			.catch(response => {
				dispatch(receivedError(response.data));
				dispatch({ type: REMOVE_REQUEST	});
			});
	};
}


export function receivedAutocompleteObjectives(data) {
	// If nothing received - replace to empty array
	data = data || [];

	return (dispatch, getStore) => {
		dispatch({
			type: RECEIVED_AUTOCOMPLETE_OBJECTIVES,
			data
		});
	}
}

export function setAutocompleteObjectivesSelectedItem(selectedItem) {
	return {
		type: SET_AUTOCOMPLETE_OBJECTIVES_SELECTED_ITEM,
		selectedItem
	};
}

export function receivedError(data) {
	data = data || [];

	return (dispatch, getStore) => {
		dispatch({
			type: RECEIVED_ERROR,
			data
		});
	}
}
