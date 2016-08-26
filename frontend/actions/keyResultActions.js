import axios from 'axios';
import { ADD_REQUEST, REMOVE_REQUEST } from './appActions';

// Get key results for show autocomplete list
export const GET_AUTOCOMPLETE_KEY_RESULTS = 'GET_AUTOCOMPLETE_KEY_RESULTS';
export const RECEIVED_KEY_RESULTS = 'RECEIVED_KEY_RESULTS';

// Add new key result to UserObjective
export const ADD_NEW_KEY_RESULT = 'ADD_NEW_KEY_RESULT';
export const ADD_NEW_KEY_RESULT_TO_OBJECTIVE = 'ADD_NEW_KEY_RESULT_TO_OBJECTIVE';

// Set selected autocomplete key results to global store
export const SET_AUTOCOMPLETE_KEY_RESULTS_SELECTED_ITEM = 'SET_AUTOCOMPLETE_KEY_RESULTS_SELECTED_ITEM';

// Return AXIOS error
export const RECEIVED_ERROR = 'RECEIVED_ERROR';

export function addNewKeyResults(body) {
	return (dispatch, getStore) => {
		dispatch({ type: ADD_NEW_KEY_RESULT });
		dispatch({ type: ADD_REQUEST });

		return axios.post((`api/userobjective/${body.objectiveId}/keyresult/`), body)
				.then(response => {
					dispatch(addNewKeyResultToObjective(response.data , body));
					dispatch({ type: REMOVE_REQUEST	});
				})
				.catch(response => {
					dispatch(receivedError(response.data));
					dispatch({ type: REMOVE_REQUEST	});
				});
	};
}

export function addNewKeyResultToObjective(data, body) {
	return {
			type: ADD_NEW_KEY_RESULT_TO_OBJECTIVE,
		  response: data,
		  request: body
	};
}

export function getAutocompleteKeyResults(objectId, title) {

	return (dispatch, getStore) => {
		dispatch({ type: GET_AUTOCOMPLETE_KEY_RESULTS });
		dispatch({ type: ADD_REQUEST });

		return axios.get('api/keyresult/objective/' + objectId + '/' + title)
		.then(response => {
			dispatch(receivedKeyResults(response.data))
			dispatch({ type: REMOVE_REQUEST	});
		})
		.catch(response => {
			dispatch(receivedError(response.data))
			dispatch({ type: REMOVE_REQUEST	});
		});

	};
}

export function receivedKeyResults(data) {
	// If nothing received - replace to empty array
	data = data || [];

	return (dispatch, getStore) => {
		dispatch({
			type: RECEIVED_KEY_RESULTS,
			data
		});
	}
}

export function setAutocompleteKeyResultsSelectedItem(selectedItem) {
	return {
		type: SET_AUTOCOMPLETE_KEY_RESULTS_SELECTED_ITEM,
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