import axios from 'axios';
import { ADD_REQUEST, REMOVE_REQUEST } from './appActions';
import { GET_NOT_APPROVED_OBJECTIVES_REQUEST,
				 GET_NOT_APPROVED_KEYS_REQUEST } from './acceptObjective.js'
export const GET_MY_OBJECTIVES = 'GET_MY_OBJECTIVES';
export const RECEIVED_MY_OBJECTIVES_ERROR = 'RECEIVED_MY_OBJECTIVES_ERROR';
export const RECEIVED_MY_OBJECTIVES = 'RECEIVED_MY_OBJECTIVES';
export const CHANGE_TAB = 'CHANGE_TAB';
export const CHANGE_YEAR = 'CHANGE_YEAR';
export const NEW_QUARTER_ADDED = 'NEW_QUARTER_ADDED';
export const ADD_NEW_QUARTER_ERROR = 'ADD_NEW_QUARTER_ERROR';
export const UPDATE_USER_OBJECTIVE = 'UPDATE_USER_OBJECTIVE';
export const UPDATE_USER_OBJECTIVE_API = 'UPDATE_USER_OBJECTIVE_API';
export const SOFT_DELETE_MY_OBJECTIVE_BY_ID = 'SOFT_DELETE_MY_OBJECTIVE_BY_ID';
export const SOFT_DELETE_MY_OBJECTIVE_BY_ID_API = 'SOFT_DELETE_MY_OBJECTIVE_BY_ID_API';
export const ADD_NEW_OBJECTIVE = 'ADD_NEW_OBJECTIVE';
export const ADDED_NEW_OBJECTIVE = 'ADDED_NEW_OBJECTIVE';
export const CHANGED_KEYRESULT_SCORE = 'CHANGED_KEYRESULT_SCORE';
export const CHANGED_KEYRESULT_SCORE_ERROR = 'CHANGED_KEYRESULT_SCORE_ERROR';
export const SOFT_DELETE_OBJECTIVE_KEY_RESULT_BY_ID_API = 'SOFT_DELETE_OBJECTIVE_KEY_RESULT_BY_ID_API';
export const SOFT_DELETE_OBJECTIVE_KEY_RESULT_BY_ID_SUCCESS = 'SOFT_DELETE_OBJECTIVE_KEY_RESULT_BY_ID_SUCCESS';

export const CHANGE_ARCHIVE_STATUS = 'CHANGE_ARCHIVE_STATUS';
export const CHANGE_ARCHIVE_STATUS_LOCAL = 'CHANGE_ARCHIVE_STATUS_LOCAL';

export const SET_ACTIVE_KEY_RESULT_ON_HOME_PAGE = 'SET_ACTIVE_KEY_RESULT_ON_HOME_PAGE';
export const CANCEL_EDIT_KEY_RESULT = 'CANCEL_EDIT_KEY_RESULT';

const session = require('../../backend/config/session');

export function getMe() {
	return (dispatch, getStore) => {
		dispatch({ type: GET_MY_OBJECTIVES });
		dispatch({ type: ADD_REQUEST });

		return axios.get('/api/user/me/')
		.then(response => {
			dispatch(receivedMyObjectives(response.data));
			dispatch({ type: REMOVE_REQUEST	});
		})
		.catch(response => {
			dispatch(receivedMyObjectivesError(response));
			dispatch({ type: REMOVE_REQUEST	});
		});
	};
}

export function receivedMyObjectivesError(response) {
	return {
		type: RECEIVED_MY_OBJECTIVES_ERROR,
		data: response
	};
}

export function receivedMyObjectives(data) {
	return {
		type: RECEIVED_MY_OBJECTIVES,
		data: data
	};
}

export function setChangeTab(num) {
	return {
		type: CHANGE_TAB,
		selectedTab: num
	};
}

export function setChangeYear(year) {
	return {
		type: CHANGE_YEAR,
		selectedYear: year
	};
}

export function createQuarter(quarter){
	return(dispatch) => {
		axios.post('/api/quarters/', quarter)
		.then(() => {
			dispatch(newQuarterAdded(quarter));
		})
		.catch((error) => {
			dispatch(addNewQuarterError(error));
		})
	}
}

export function newQuarterAdded(quarter){
	return {
		type: NEW_QUARTER_ADDED,
		quarter: quarter
	}
}

export function addNewQuarterError(error) {
	return {
		type: ADD_NEW_QUARTER_ERROR,
		error: error
	}
}

export function updateUserObjective(id, description) {
	return {
		type: UPDATE_USER_OBJECTIVE,
		id: id,
		description
	};
}

export function updateUserObjectiveApi(id, description, callback, userId) {
	return (dispatch, getStore) => {
		dispatch({ type: ADD_REQUEST	});
		dispatch({ type: UPDATE_USER_OBJECTIVE_API });

		return axios.put(('/api/userObjective/' + id), {"description": description})
		.then(response => {
			dispatch(updateUserObjective(id, description));
			dispatch({ type: REMOVE_REQUEST	});

			/*
			if (callback != null) {
				dispatch(callback(userId));
			}
			*/
		})
		.catch(response => {
			dispatch(receivedMyObjectivesError(response.data));
			dispatch({ type: REMOVE_REQUEST	});
		});
	};
}

export function softDeleteMyObjectiveById(id) {
	return {
		type: SOFT_DELETE_MY_OBJECTIVE_BY_ID,
		id: id
	};
}

export function softDeleteMyObjectiveByIdApi(id, callback, userId) {
	return (dispatch, getStore) => {
		dispatch({ type: ADD_REQUEST	});
		dispatch({ type: SOFT_DELETE_MY_OBJECTIVE_BY_ID_API });

		return axios.delete('/api/userObjective/' + id + '/true')
		.then(response => {
			dispatch(softDeleteMyObjectiveById(id));
			dispatch({ type: REMOVE_REQUEST	});

			dispatch({ type: GET_NOT_APPROVED_OBJECTIVES_REQUEST })
			dispatch({ type: GET_NOT_APPROVED_KEYS_REQUEST })
			/*
			if (callback != null) {
				dispatch(callback(userId));
			}
			*/
		})
		.catch(response => {
			dispatch(receivedMyObjectivesError(response.data));
			dispatch({ type: REMOVE_REQUEST	});
		});
	};
}

export function addNewObjective(body, callback, userId) {
	return (dispatch, getStore) => {
		dispatch({ type: ADD_NEW_OBJECTIVE });
		dispatch({ type: ADD_REQUEST	});

		return axios.post(('/api/userObjective/'), body)
		.then(response => {
			dispatch(addedNewObjective(response.data, body));
			dispatch({ type: REMOVE_REQUEST	});
			
			dispatch({ type: GET_NOT_APPROVED_OBJECTIVES_REQUEST })
			dispatch({ type: GET_NOT_APPROVED_KEYS_REQUEST })

			/*
			if (callback != null) {
				dispatch(callback(userId));
			}
			*/
		})
		.catch(response => {
			dispatch(receivedMyObjectivesError(response.data));
			dispatch({ type: REMOVE_REQUEST	});
		});
	};
}

export function addedNewObjective(data, body) {
	return {
		type: ADDED_NEW_OBJECTIVE,
		responseData: data,
		requestData: body,
	};
}

export function changeKeyResultScore(objectiveId, body, callback, userId) {
	return (dispatch, getStore) => {
		dispatch({ type: ADD_REQUEST });

		return axios.put(`/api/userobjective/${ objectiveId }/keyresult/score/`, body)
		.then(response => {
			dispatch(keyResultScoreChanged(response.data));
			dispatch({ type: REMOVE_REQUEST	});

			/*
			if (callback != null) {
				dispatch(callback(userId));
			}
			*/
		})
		.catch(response => {
			dispatch(keyResultScoreChangedError(response.data));
			dispatch({ type: REMOVE_REQUEST	});
		});
	};
}

export function keyResultScoreChanged(data) {
	return {
		type: CHANGED_KEYRESULT_SCORE,
		data,
	};
}

export function keyResultScoreChangedError(data) {
	return {
		type: CHANGED_KEYRESULT_SCORE_ERROR,
		data,
	};
}

export function softDeleteObjectiveKeyResultByIdApi(objectiveId, keyResultId, callback, userId) {
	return (dispatch, getStore) => {
		dispatch({ type: ADD_REQUEST	});
		//dispatch({ type: SOFT_DELETE_OBJECTIVE_KEY_RESULT_BY_ID_API });

		return axios.delete('/api/userObjective/' + objectiveId +'/keyResult/'+ keyResultId +'/true')
				.then(response => {
					dispatch(softDeleteObjectiveKeyResultById(objectiveId, keyResultId, response.data));
					dispatch({ type: REMOVE_REQUEST	});
					
					dispatch({ type: GET_NOT_APPROVED_OBJECTIVES_REQUEST })
					dispatch({ type: GET_NOT_APPROVED_KEYS_REQUEST })
					/*
					if (callback != null) {
						dispatch(callback(userId));
					}
					*/
				})
				.catch(response => {
					dispatch(receivedMyObjectivesError(response.data));
					dispatch({ type: REMOVE_REQUEST	});
				});
	};
}

export function changeArchiveStatus(changeTo, objectiveId) {
	 return (dispatch, getStore) => {
	 	dispatch({
	 		type:CHANGE_ARCHIVE_STATUS
	 	})
	 	dispatch({ type: ADD_REQUEST });

	 	return axios.put(`/api/userobjective/${objectiveId}/archive/${changeTo}`)
	 	.then( response => {
	 	 	dispatch( { type: REMOVE_REQUEST} );
	 	 	dispatch( changeArchiveStatusLocal(changeTo, objectiveId)); 
	 	 })
	 	// .catch( response =>{ 
	 	// 	dispatch( receivedMyObjectivesError(response.data));
	 	// 	dispatch({ type: REMOVE_REQUEST	});
	 	// } );
	 }
}

export function changeArchiveStatusLocal (changeTo, objectiveId) {
	 return {
	 	type: CHANGE_ARCHIVE_STATUS_LOCAL,
	 	flag: changeTo,
	 	id: objectiveId
	 }
}

export function softDeleteObjectiveKeyResultById(objectiveId, keyResultId, data) {
	return {
		type: SOFT_DELETE_OBJECTIVE_KEY_RESULT_BY_ID_SUCCESS,
		objectiveId,
		keyResultId,
		data,
	};
}

export function setActiveKeyResultOnHomePage(activeKeyResult) {
	const action = {
		type: SET_ACTIVE_KEY_RESULT_ON_HOME_PAGE,
		activeKeyResult
	};

	return action;
}

export function cancelEdit() {
	const action = {
		type: CANCEL_EDIT_KEY_RESULT,
	};
	return action;
}