import axios from 'axios';
import { ADD_REQUEST, REMOVE_REQUEST } from './appActions';
import { 
	getNotAprovedObjectivesRequest,
	getNotAprovedKeysRequest, 
} from './acceptObjectiveActions.js'

import { getStats, getMyHistory, OTHER_PERSON_PAGE } from './userDashboardActions';

// Get key results for show autocomplete list
export const GET_AUTOCOMPLETE_KEY_RESULTS = 'GET_AUTOCOMPLETE_KEY_RESULTS';
export const RECEIVED_KEY_RESULTS = 'RECEIVED_KEY_RESULTS';

// Add new key result to UserObjective
export const ADD_NEW_KEY_RESULT = 'ADD_NEW_KEY_RESULT';
export const ADD_NEW_KEY_RESULT_TO_OBJECTIVE = 'ADD_NEW_KEY_RESULT_TO_OBJECTIVE';
export const ADD_NEW_KEY_RESULT_TO_OBJECTIVE_OTHER_PERSON = 'ADD_NEW_KEY_RESULT_TO_OBJECTIVE_OTHER_PERSON';


// Set selected autocomplete key results to global store
export const SET_AUTOCOMPLETE_KEY_RESULTS_SELECTED_ITEM = 'SET_AUTOCOMPLETE_KEY_RESULTS_SELECTED_ITEM';

// Return AXIOS error
export const RECEIVED_ERROR = 'RECEIVED_ERROR';

export function addNewKeyResults(userObjectiveId, body, callback, userId) {
	return (dispatch, getStore) => {
		dispatch({ type: ADD_NEW_KEY_RESULT });
		dispatch({ type: ADD_REQUEST });

		return axios.post((`/api/userobjective/${ userObjectiveId }/keyresult/`), body)
		.then(response => {

			if (!body.isItHomePage) {
				dispatch(addNewKeyResultToObjectiveOtherPerson(response.data, userObjectiveId));
			}

			dispatch(addNewKeyResultToObjective(response.data, userObjectiveId));
			dispatch({ type: REMOVE_REQUEST	});
			/*
			if (callback != null) {
				dispatch(callback(userId));
			}
			*/
		})
		.then(() => {
			let type = body.isItHomePage ? '' : OTHER_PERSON_PAGE;
			
			dispatch(getStats(type));
			dispatch(getMyHistory(type));
		})
		.then(() => {
			let localRole = getStore().myState.me.localRole;
			
			if(localRole === CONST.user.localRole.ADMIN) {
				dispatch(getNotAprovedObjectivesRequest());
				dispatch(getNotAprovedKeysRequest());
			}
		})
		.catch(response => {
			dispatch(receivedError(response.data));
			dispatch({ type: REMOVE_REQUEST	});
		});
	};
}

export function addNewKeyResultToObjective(data, userObjectiveId) {
	return {
		type: ADD_NEW_KEY_RESULT_TO_OBJECTIVE,
		response: data,
		userObjectiveId: userObjectiveId,
	};
}

export function addNewKeyResultToObjectiveOtherPerson(data, userObjectiveId) {
	return {
		type: ADD_NEW_KEY_RESULT_TO_OBJECTIVE_OTHER_PERSON,
		response: data,
		userObjectiveId: userObjectiveId,
	};
}

export function getAutocompleteKeyResults(objectId, title) {
	return (dispatch, getStore) => {
		dispatch({ type: GET_AUTOCOMPLETE_KEY_RESULTS });
		dispatch({ type: ADD_REQUEST });

		return axios.get('/api/keyresult/objective/' + objectId + '/' + encodeURIComponent(title))
		.then(response => {
			dispatch(receivedKeyResults(response.data));
			dispatch({ type: REMOVE_REQUEST	});
		})
		.catch(response => {
			dispatch(receivedError(response.data));
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