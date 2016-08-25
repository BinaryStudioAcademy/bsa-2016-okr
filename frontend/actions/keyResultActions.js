import axios from 'axios';
import { ADD_REQUEST, REMOVE_REQUEST } from './appActions';

// Get key results for show autocomplete list
export const GET_AUTOCOMPLETE_KEY_RESULTS = 'GET_AUTOCOMPLETE_KEY_RESULTS';
export const RECEIVED_KEY_RESULTS = 'RECEIVED_KEY_RESULTS';

// Add new key result to UserObjective
export const ADD_NEW_KEY_RESULT = 'ADD_NEW_KEY_RESULT';
export const RECEIVED_ADDED_NEW_KEY_RESULT = 'ADD_NEW_KEY_RESULT';

// Set selected autocomplete key results to global store
export const SET_AUTOCOMPLETE_KEY_RESULTS_SELECTED_ITEM = 'SET_AUTOCOMPLETE_KEY_RESULTS_SELECTED_ITEM';

// Return AXIOS error
export const RECEIVED_ERROR = 'RECEIVED_ERROR';

export function addNewKeyResults(body) {
	return (dispatch, getStore) => {
		dispatch({
			type: ADD_REQUEST
		});

		dispatch({
			type: ADD_NEW_KEY_RESULT
		});

		return axios.post(('api/keyresult/'), body)
				.then(response => dispatch(receivedAddedNewKeyResult(response.data)))
				.catch(response => dispatch(receivedError(response.data)));
	};
}

export function receivedAddedNewKeyResult(data) {
	return (dispatch, getStore) => {
		dispatch({
			type: REMOVE_REQUEST
		});

		dispatch({
			type: RECEIVED_ADDED_NEW_KEY_RESULT,
		  data: data
		});
	};
}

export function getAutocompleteKeyResults(objectId, title) {

	return (dispatch, getStore) => {
		dispatch({
			type: ADD_REQUEST
		});

		dispatch({
			type: GET_AUTOCOMPLETE_KEY_RESULTS
		});

		return axios.get('api/keyresult/objective/' + objectId + '/' + title)
		.then(response => dispatch(receivedKeyResults(response.data)))
		.catch(response => dispatch(receivedError(response.data)));

	};
}

export function receivedKeyResults(data) {
	// If nothing received - replace to empty array
	if ((data === '') || ((data === undefined))){
		data=[];
	}

	return (dispatch, getStore) => {
		dispatch({
			type: REMOVE_REQUEST
		});

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
	if ((data === '') || ((data === undefined))){
		data=[];
	}

	return (dispatch, getStore) => {
		dispatch({
			type: REMOVE_REQUEST
		});

		dispatch({
			type: RECEIVED_ERROR,
			data
		});
	}
}