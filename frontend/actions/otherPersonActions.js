import axios from 'axios';
import CONST, { ROOT_URL } from '../../backend/config/constants';

import { ADD_REQUEST, REMOVE_REQUEST } from './appActions';
import {
	getNotAprovedObjectivesRequest,
	getNotAprovedKeysRequest,
} from './acceptObjectiveActions.js'

import {
	getStats,
	getMyHistory
} from './userDashboardActions';

import {
	updateUserObjective,
	softDeleteMyObjectiveById,
	softDeleteObjectiveKeyResultById,
	receivedMyObjectivesError
} from './myStateActions';

export const GET_USER = 'OPP:GET_USER';
export const RECEIVED_USER = 'OPP:RECEIVED_USER';
export const RECEIVED_ERROR = 'OPP:RECEIVED_ERROR';
export const RECEIVED_USER_ERROR = 'OPP:RECEIVED_USER_ERROR';
export const CHANGE_TAB = 'OPP:CHANGE_TAB';
export const CHANGE_YEAR = 'OPP:CHANGE_YEAR';
export const TAKE_APPRENTICE = 'OPP:TAKE_APPRENTICE';
export const TOOK_APPRENTICE = 'OPP:TOOK_APPRENTICE';
export const REMOVE_APPRENTICE = 'OPP:REMOVE_APPRENTICE';
export const REMOVED_APPRENTICE = 'OPP:REMOVED_APPRENTICE';
export const ADDED_NEW_OBJECTIVE_OTHER_USER = 'OPP:ADDED_NEW_OBJECTIVE_OTHER_USER';
export const ADD_NEW_OBJECTIVE_OTHER_USER = 'OPP:ADD_NEW_OBJECTIVE_OTHER_USER';
export const EDIT_KEY_RESULT_ENABLE_EDIT_ON_USER_PAGE = 'OPP:EDIT_KEY_RESULT_ENABLE_EDIT_ON_USER_PAGE';
export const EDIT_KEY_RESULT_DISABLED_EDIT_ON_USER_PAGE = 'OPP:EDIT_KEY_RESULT_DISABLED_EDIT_ON_USER_PAGE';
export const EDIT_KEY_RESULT_TITLE_AND_DIFFICULTY_ON_USER_PAGE = 'OPP:EDIT_KEY_RESULT_TITLE_AND_DIFFICULTY_ON_USER_PAGE';
export const EDIT_KEY_RESULT_TITLE_AND_DIFFICULTY_ERROR_ON_USER_PAGE = 'OPP:EDIT_KEY_RESULT_TITLE_AND_DIFFICULTY_ERROR_ON_USER_PAGE';
export const ADD_NEW_QUARTER = 'OPP:ADD_NEW_QUARTER';
export const ARCHIVE_USER_QUARTER = 'OPP:ARCHIVE_USER_QUARTER';
export const CHANGED_KEYRESULT_SCORE = 'OPP:CHANGED_KEYRESULT_SCORE';

export function arhiveUserQuarter(id, flag) {
	return (dispatch, getStore) => {
		dispatch({ type: ARCHIVE_USER_QUARTER});
		dispatch({ type: ADD_REQUEST });

		return axios.put(`${ ROOT_URL }/api/quarters/${ id }/archive/${ flag }`)
		.then( response => {
			dispatch({ type: REMOVE_REQUEST	});
			dispatch(getUser());
		})
		.then(() => {
			dispatch(getMyHistory(CONST.page.OTHER_PERSON_PAGE));
		})
		.catch( response => {
			dispatch(receivedError(response.data));
			dispatch({ type: REMOVE_REQUEST	});
		})
	}
}

export function getUser(id) {
	return (dispatch, getStore) => {
		dispatch({ type: GET_USER });
		dispatch({ type: ADD_REQUEST });

		return axios.get(`${ ROOT_URL }/api/user/${ id }`)
		.then(response => {
			dispatch(receivedUser(response.data));
			dispatch({ type: REMOVE_REQUEST });
		})
		.then(() => {
			// dispatch(getStats(CONST.page.OTHER_PERSON_PAGE));
			// dispatch(getMyHistory(CONST.page.OTHER_PERSON_PAGE));
		})
		.catch(response => {
			dispatch(receivedUserError(response));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function receivedUserError(data) {
	return {
		type: RECEIVED_USER_ERROR,
		data
	};
}

export function receivedUser(data) {
	return {
		type: RECEIVED_USER,
		data
	};
}

export function addNewObjective(body) {
	return (dispatch, getStore) => {
		dispatch({ type: ADD_NEW_OBJECTIVE_OTHER_USER });
		dispatch({ type: ADD_REQUEST	});

		return axios.post(`${ ROOT_URL }/api/userObjective/`, body)
		.then(response => {
			dispatch(addedNewObjective(response.data, body));
			dispatch({ type: REMOVE_REQUEST	});
		})
		.then(() => {
			dispatch(getStats(CONST.page.OTHER_PERSON_PAGE));
			dispatch(getMyHistory(CONST.page.OTHER_PERSON_PAGE));
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
			dispatch(receivedError(response.data));
			dispatch({ type: REMOVE_REQUEST	});
		});
	};
}

export function addedNewObjective(data, body) {
	return {
		type: ADDED_NEW_OBJECTIVE_OTHER_USER,
		responseData: data,
		requestData: body,
	};
}

export function setChangeTab(num) {
	return {
		type: CHANGE_TAB,
		selectedTab: num
	};
}

export function takeApprentice(id, me) {
	return (dispatch, getStore) => {
		dispatch({ type: TAKE_APPRENTICE });
		dispatch({ type: ADD_REQUEST });

		return axios.post(`${ ROOT_URL }/api/user/takeApprentice/${ id }`)
		.then(response => {
			dispatch(tookApprentice(response.data, me));
			dispatch({ type: REMOVE_REQUEST });
		})
		.then(() => {
			dispatch(getMyHistory(CONST.page.OTHER_PERSON_PAGE));
		})
		.catch(response => {
			dispatch(receivedError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function tookApprentice(response, me) {
	return {
		type: TOOK_APPRENTICE,
		response,
		me
	};
}

export function removeApprentice(id) {

	return (dispatch, getStore) => {
		dispatch({ type: REMOVE_APPRENTICE });
		dispatch({ type: ADD_REQUEST });

		return axios.post(`${ ROOT_URL }/api/user/removeApprentice/${ id }`)
		.then(response => {
			dispatch(removedApprentice(response.data));
			dispatch({ type: REMOVE_REQUEST });
		})
		.then(() => {
			dispatch(getMyHistory(CONST.page.OTHER_PERSON_PAGE));
		})
		.catch(response => {
			dispatch(receivedError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function removedApprentice(response) {
	return {
		type: REMOVED_APPRENTICE,
		response
	};
}

export function editKeyResultEnableEditOnUserPage(editKeyResultId) {
	const action = {
		type: EDIT_KEY_RESULT_ENABLE_EDIT_ON_USER_PAGE,
		editKeyResultId
	};

	return action;
}

export function editKeyResultDisabledEditOnUserPage() {
	const action = {
		type: EDIT_KEY_RESULT_DISABLED_EDIT_ON_USER_PAGE,
	};
	return action;
}

export function editKeyResultEditTitleAndDifficulty (objectiveId, reqBody) {
	return(dispatch, getStore) => {
		dispatch({ type: ADD_REQUEST });

		return axios.put(`${ ROOT_URL }/api/userobjective/${ objectiveId }/keyresult/titleanddifficulty/`, reqBody)
		.then(response => {
			dispatch(keyResultTitleAndDifficultyChanged(response.data));
			dispatch({ type: EDIT_KEY_RESULT_DISABLED_EDIT_ON_USER_PAGE });
			dispatch({ type: REMOVE_REQUEST });
		})
		.then(() => {
			dispatch(getMyHistory(CONST.page.OTHER_PERSON_PAGE));
		})
		.catch(response => {
			dispatch(keyResultTitleAndDifficultyError(response.data));
			dispatch({ type: REMOVE_REQUEST });
		});
	};
}

export function keyResultTitleAndDifficultyChanged(data) {
	return {
		type: EDIT_KEY_RESULT_TITLE_AND_DIFFICULTY_ON_USER_PAGE,
		data,
	};
}

export function keyResultTitleAndDifficultyError(data) {
	return {
		type: EDIT_KEY_RESULT_TITLE_AND_DIFFICULTY_ERROR_ON_USER_PAGE,
		data,
	};
}

export function createQuarter(body) {
	return (dispatch, getStore) => {
		axios.post(`${ ROOT_URL }/api/quarters/`, body)
		.then((response) => {
			dispatch(createQuarterSuccess(response.data));
		})
		.then(() => {
			dispatch(getMyHistory(CONST.page.OTHER_PERSON_PAGE));
		})
		.catch((error) => {
			dispatch(receivedError(error));
		});
	};
}

export function createQuarterSuccess(data) {
	return {
		type: ADD_NEW_QUARTER,
		data,
	};
}

export function setChangeYear(year) {
	return (dispatch, getStore) => {
		dispatch({
			type: CHANGE_YEAR,
			selectedYear: year
		});
		dispatch(getStats(CONST.page.OTHER_PERSON_PAGE));
	}
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
			dispatch(getStats(CONST.page.OTHER_PERSON_PAGE));
			dispatch(getMyHistory(CONST.page.OTHER_PERSON_PAGE));
		})
		.catch(response => {
			dispatch(receivedError(response.data));
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

export function receivedError(data) {
	return {
		type: RECEIVED_ERROR,
		data,
	};
}

export function softDeleteMyObjectiveByIdApi(id, flag, callback, userId) {
	return (dispatch, getStore) => {
		dispatch({ type: ADD_REQUEST	});

		return axios.delete(`${ ROOT_URL }/api/userObjective/${ id }/${ flag }`)
			.then(response => {
				dispatch(softDeleteMyObjectiveById(id, flag));
				dispatch({ type: REMOVE_REQUEST	});
			})
			.then(() => {
				dispatch(getStats(CONST.page.OTHER_PERSON_PAGE));
				dispatch(getMyHistory(CONST.page.OTHER_PERSON_PAGE));
			})
			/*		.then(() => {
			 let localRole = getStore().myState.me.localRole;

			 if(localRole === CONST.user.localRole.ADMIN) {
			 dispatch(getNotAprovedObjectivesRequest());
			 dispatch(getNotAprovedKeysRequest());
			 }
			 })*/
			.catch(response => {
				dispatch(receivedError(response.data));
				dispatch({ type: REMOVE_REQUEST	});
			});
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
				dispatch(getStats(CONST.page.OTHER_PERSON_PAGE));
				dispatch(getMyHistory(CONST.page.OTHER_PERSON_PAGE));
			})
			/*.then(() => {
			 let localRole = getStore().myState.me.localRole;

			 if(localRole === CONST.user.localRole.ADMIN) {
			 dispatch(getNotAprovedObjectivesRequest());
			 dispatch(getNotAprovedKeysRequest());
			 }
			 })*/
			.catch(response => {
				dispatch(receivedError(response.data));
				dispatch({ type: REMOVE_REQUEST	});
			});
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
				dispatch(getMyHistory(CONST.page.OTHER_PERSON_PAGE));
			})
			.catch(response => {
				dispatch(receivedError(response.data));
				dispatch({ type: REMOVE_REQUEST	});
			});
	};
}
