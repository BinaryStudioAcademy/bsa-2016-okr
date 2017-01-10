import axios from 'axios';
import CONST, { ROOT_URL } from '../../backend/config/constants';

import { ADD_REQUEST, REMOVE_REQUEST, redirectAfterAuth } from './appActions';
import {
	getNotAprovedObjectivesRequest,
	getNotAprovedKeysRequest,
	clearObjApproveITems
} from './acceptObjectiveActions';

import {
	getStats,
	getMyHistory
} from './userDashboardActions';

export const GET_MY_OBJECTIVES = 'GET_MY_OBJECTIVES';
export const RECEIVED_MY_OBJECTIVES_ERROR = 'RECEIVED_MY_OBJECTIVES_ERROR';
export const RECEIVED_MY_OBJECTIVES = 'RECEIVED_MY_OBJECTIVES';
export const CHANGE_TAB = 'CHANGE_TAB';
export const CHANGE_YEAR = 'CHANGE_YEAR';
export const NEW_QUARTER_ADDED = 'NEW_QUARTER_ADDED';
export const ADD_NEW_QUARTER_ERROR = 'ADD_NEW_QUARTER_ERROR';
export const UPDATE_USER_OBJECTIVE = 'UPDATE_USER_OBJECTIVE';
export const SOFT_DELETE_MY_OBJECTIVE_BY_ID = 'SOFT_DELETE_MY_OBJECTIVE_BY_ID';
export const SOFT_DELETE_MY_OBJECTIVE_BY_ID_API = 'SOFT_DELETE_MY_OBJECTIVE_BY_ID_API';
export const ADD_NEW_OBJECTIVE = 'ADD_NEW_OBJECTIVE';
export const ADDED_NEW_OBJECTIVE = 'ADDED_NEW_OBJECTIVE';
export const CHANGED_KEYRESULT_SCORE = 'CHANGED_KEYRESULT_SCORE';
export const CHANGED_KEYRESULT_SCORE_ERROR = 'CHANGED_KEYRESULT_SCORE_ERROR';
export const SOFT_DELETE_OBJECTIVE_KEY_RESULT_BY_ID_API = 'SOFT_DELETE_OBJECTIVE_KEY_RESULT_BY_ID_API';
export const SOFT_DELETE_OBJECTIVE_KEY_RESULT_BY_ID_SUCCESS = 'SOFT_DELETE_OBJECTIVE_KEY_RESULT_BY_ID_SUCCESS';
export const GET_ME_BASIC = 'GET_ME_BASIC';
export const RECEIVED_ME_BASIC = 'RECEIVED_ME_BASIC';

export const CHANGE_ARCHIVE_STATUS = 'CHANGE_ARCHIVE_STATUS';
export const CHANGE_ARCHIVE_STATUS_LOCAL = 'CHANGE_ARCHIVE_STATUS_LOCAL';

export const EDIT_KEY_RESULT_ENABLE_EDIT_ON_HOME_PAGE = 'EDIT_KEY_RESULT_ENABLE_EDIT_ON_HOME_PAGE';
export const EDIT_KEY_RESULT_DISABLED_EDIT_ON_HOME_PAGE = 'EDIT_KEY_RESULT_DISABLED_EDIT_ON_HOME_PAGE';
export const EDIT_KEY_RESULT_TITLE_AND_DIFFICULTY_ON_HOME_PAGE = 'EDIT_KEY_RESULT_TITLE_AND_DIFFICULTY_ON_HOME_PAGE';
export const EDIT_KEY_RESULT_TITLE_AND_DIFFICULTY_ERROR_ON_HOME_PAGE = 'EDIT_KEY_RESULT_TITLE_AND_DIFFICULTY_ERROR_ON_HOME_PAGE';

export const ARCHIVE_MY_QUARTER = 'ARCHIVE_MY_QUARTER';
export const RESET = 'RESET';
export const MOVE_OBJECTIVE_TO_BACKLOG = 'MOVE_OBJECTIVE_TO_BACKLOG';

export function archiveMyQuarter(id, flag) {
	return (dispatch, getStore) => {
		dispatch({ type: ARCHIVE_MY_QUARTER});
		dispatch({ type: ADD_REQUEST });

		return axios.put(`${ ROOT_URL }/api/quarters/${ id }/archive/${ flag }`)
		.then( response => {
			dispatch({ type: REMOVE_REQUEST	});
			dispatch(getMe());
		})
		.then(() => {
			dispatch(getMyHistory());
		})
		.catch( response => {
			dispatch(receivedMyObjectivesError(response));
			dispatch({ type: REMOVE_REQUEST	});
		})
	}
}

export function reset() {
	 return {
	 	type: RESET
	 }
}

export function getMe() {
	return (dispatch, getStore) => {
		dispatch({ type: GET_MY_OBJECTIVES });
		dispatch({ type: ADD_REQUEST });

		return axios.get(`${ ROOT_URL }/api/user/me/`)
		.then(response => {
			dispatch(receivedMyObjectives(response.data));
			dispatch({ type: REMOVE_REQUEST	});
		})
		.then(() => {
			dispatch(getStats());
			//dispatch(getMyHistory());
		})
		.catch(response => {
			dispatch(receivedMyObjectivesError(response));
			dispatch({ type: REMOVE_REQUEST	});
		});
	};
}

export function getMeBasic() {
	return (dispatch, getStore) => {
		dispatch({ type: GET_ME_BASIC });
		dispatch({ type: ADD_REQUEST });

		return axios.get(`${ ROOT_URL }/api/user/mebasic/`)
		.then(response => {
			dispatch(receivedMeBasic(response.data));
			dispatch({ type: REMOVE_REQUEST	});
		})
		.then(() => {
			dispatch(redirectAfterAuth());
		})
		.then(() => {
			let localRole = getStore().myState.me.localRole;

			if(localRole === CONST.user.localRole.ADMIN) {
				dispatch(getNotAprovedObjectivesRequest());
				dispatch(getNotAprovedKeysRequest());
			}
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

export function receivedMeBasic(data) {
	return {
		type: RECEIVED_ME_BASIC,
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
	return (dispatch, getStore) => {
		dispatch({
			type: CHANGE_YEAR,
			selectedYear: year
		});
		dispatch(getStats());
	}
}

export function createQuarter(quarter) {
	return (dispatch, getStore) => {
		axios.post(`${ ROOT_URL }/api/quarters/`, quarter)
		.then((response) => {
			dispatch(newQuarterAdded(response.data));
		})
		.then(() => {
			dispatch(getMyHistory());
		})
		.catch((error) => {
			dispatch(addNewQuarterError(error));
		});
	};
}

export function newQuarterAdded(quarter) {
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

export function updateUserObjective(id, description, title) {
	return {
		type: UPDATE_USER_OBJECTIVE,
		id: id,
		description,
		title
	};
}

export function updateUserObjectiveApi(id, description, title, callback, userId) {
	return (dispatch, getStore) => {
		dispatch({ type: ADD_REQUEST	});

		const body = {
			"description": description,
			"title": title
		};

		return axios.put(`${ ROOT_URL }/api/userObjective/${ id }`, body)
		.then(response => {
			dispatch(updateUserObjective(id, description, title));
			dispatch({ type: REMOVE_REQUEST	});
			/*
			if (callback != null) {
				dispatch(callback(userId));
			}
			*/
		})
		.then(() => {
			dispatch(getMyHistory());
		})
		.catch(response => {
			dispatch(receivedMyObjectivesError(response.data));
			dispatch({ type: REMOVE_REQUEST	});
		});
	};
}

export function softDeleteMyObjectiveById(id, flag) {
	return {
		type: SOFT_DELETE_MY_OBJECTIVE_BY_ID,
		id: id,
		flag: flag,
	};
}

export function softDeleteMyObjectiveByIdApi(id, flag, callback, userId) {
	return (dispatch, getStore) => {
		dispatch({ type: ADD_REQUEST	});
		dispatch({ type: SOFT_DELETE_MY_OBJECTIVE_BY_ID_API });

		return axios.delete(`${ ROOT_URL }/api/userObjective/${ id }/${ flag }`)
		.then(response => {
			dispatch(softDeleteMyObjectiveById(id, flag));
			dispatch({ type: REMOVE_REQUEST	});


			/*
			if (callback != null) {
				dispatch(callback(userId));
			}
			*/
		})
		.then(() => {
			dispatch(getStats());
			dispatch(getMyHistory());
		})
/*		.then(() => {
			let localRole = getStore().myState.me.localRole;

			if(localRole === CONST.user.localRole.ADMIN) {
				dispatch(getNotAprovedObjectivesRequest());
				dispatch(getNotAprovedKeysRequest());
			}
		})*/
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

		return axios.post(`${ ROOT_URL }/api/userObjective/`, body)
		.then(response => {
			dispatch(addedNewObjective(response.data, body));
			dispatch({ type: REMOVE_REQUEST	});
			/*
			if (callback != null) {
				dispatch(callback(userId));
			}
			*/
		})
		.then(() => {
			dispatch(getStats());
			dispatch(getMyHistory());
		})
		.then(() => {
			let localRole = getStore().myState.me.localRole;

			if(localRole === CONST.user.localRole.ADMIN) {
				dispatch(clearObjApproveITems());
				dispatch(getNotAprovedObjectivesRequest());
				dispatch(getNotAprovedKeysRequest());
			}
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

		return axios.put(`${ ROOT_URL }/api/userobjective/${ objectiveId }/keyresult/score/`, body)
		.then(response => {
			dispatch(keyResultScoreChanged(response.data));
			dispatch({ type: REMOVE_REQUEST	});

			/*
			if (callback != null) {
				dispatch(callback(userId));
			}
			*/
		})
		.then(() => {
			dispatch(getStats());
			dispatch(getMyHistory());
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

export function softDeleteObjectiveKeyResultByIdApi(objectiveId, keyResultId, flag, callback, userId) {
	return (dispatch, getStore) => {
		dispatch({ type: ADD_REQUEST	});

		return axios.delete(`${ ROOT_URL }/api/userObjective/${ objectiveId }/keyResult/${ keyResultId }/${ flag }`)
				.then(response => {
					dispatch(softDeleteObjectiveKeyResultById(objectiveId, keyResultId, flag, response.data));
					dispatch({ type: REMOVE_REQUEST	});
				})
				.then(() => {
					dispatch(getStats());
					dispatch(getMyHistory());
				})
				/*.then(() => {
					let localRole = getStore().myState.me.localRole;

					if(localRole === CONST.user.localRole.ADMIN) {
						dispatch(getNotAprovedObjectivesRequest());
						dispatch(getNotAprovedKeysRequest());
					}
				})*/
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

		return axios.put(`${ ROOT_URL }/api/userobjective/${ objectiveId }/archive/${ changeTo }`)
		.then( response => {
			dispatch( { type: REMOVE_REQUEST} );
			dispatch( changeArchiveStatusLocal(changeTo, objectiveId));
		})
		.then(() => {
			dispatch(getMyHistory());
		})
	 	// .catch( response =>{
	 	// 	dispatch( receivedMyObjectivesError(response.data));
	 	// 	dispatch({ type: REMOVE_REQUEST	});
	 	// });
	};
}

export function changeArchiveStatusLocal (changeTo, objectiveId) {
	 return {
	 	type: CHANGE_ARCHIVE_STATUS_LOCAL,
	 	flag: changeTo,
	 	id: objectiveId
	 }
}

export function softDeleteObjectiveKeyResultById(objectiveId, keyResultId, flag, data) {
	return {
		type: SOFT_DELETE_OBJECTIVE_KEY_RESULT_BY_ID_SUCCESS,
		objectiveId,
		keyResultId,
		flag,
		data,
	};
}

export function editKeyResultEnableEditOnHomePage(editKeyResultId) {
	const action = {
		type: EDIT_KEY_RESULT_ENABLE_EDIT_ON_HOME_PAGE,
		editKeyResultId
	};

	return action;
}

export function editKeyResultDisabledEditOnHomePage() {
	const action = {
		type: EDIT_KEY_RESULT_DISABLED_EDIT_ON_HOME_PAGE,
	};
	return action;
}

export function editKeyResultEditTitleAndDifficulty (objectiveId, reqBody) {
	return(dispatch, getStore) => {
		dispatch({ type: ADD_REQUEST });

		return axios.put(`${ ROOT_URL }/api/userobjective/${ objectiveId }/keyresult/titleanddifficulty/`, reqBody)
				.then(response => {
					dispatch(softDeleteMyObjectiveById(objectiveId, true));
					dispatch({ type: EDIT_KEY_RESULT_DISABLED_EDIT_ON_HOME_PAGE });
					dispatch({ type: REMOVE_REQUEST });
				})
				.then(() => {
					dispatch(getMyHistory());
				})
				.catch(response => {
					dispatch(keyResultTitleAndDifficultyError(response.data));
					dispatch({ type: REMOVE_REQUEST });
				});
	};
}

export function keyResultTitleAndDifficultyChanged(data) {
	return {
		type: EDIT_KEY_RESULT_TITLE_AND_DIFFICULTY_ON_HOME_PAGE,
		data,
	};
}

export function keyResultTitleAndDifficultyError(data) {
	return {
		type: EDIT_KEY_RESULT_TITLE_AND_DIFFICULTY_ERROR_ON_HOME_PAGE,
		data,
	};
}

export function moveObjectiveToBacklog(objectiveId, userId, callback) {
	return (dispatch, getStore) => {
		dispatch({ type: ADD_REQUEST });

		let reqBody = {
			userId: userId
		};

		return axios.put(`${ ROOT_URL }/api/userobjective/movetobacklog/${ objectiveId }`, reqBody)
			.then(response => {
				dispatch(moveToBacklog(objectiveId));
				dispatch({ type: REMOVE_REQUEST });
			})
			.then(() => {
				dispatch(getStats());
				dispatch(getMyHistory());
			})
			.catch(response => {
				dispatch(moveBacklogError(response.data));
				dispatch({ type: REMOVE_REQUEST });
			});
	};
}

export function moveToBacklog(id) {
	return {
		type: SOFT_DELETE_MY_OBJECTIVE_BY_ID,
		id: id,
		flag: true,
	};
}
