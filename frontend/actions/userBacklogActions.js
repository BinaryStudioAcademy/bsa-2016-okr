import axios from 'axios';
import { ROOT_URL } from '../../backend/config/constants';

import { ADD_REQUEST, REMOVE_REQUEST, ALERT_ERROR } from './appActions';
import { EDIT_KEY_RESULT_DISABLED_EDIT_ON_HOME_PAGE } from './myStateActions';
import {
    getNotAprovedObjectivesRequest,
    getNotAprovedKeysRequest,
} from './acceptObjectiveActions';

import {
    getStats,
    getMyHistory
} from './userDashboardActions';

export const RECEIVED_ERROR = 'RECEIVED_ERROR';
export const SET_TAB = 'SET_TAB';
export const ADDED_BACKLOG_OBJECTIVE = 'ADDED_BACKLOG_OBJECTIVE';
export const RECEIVED_BACKLOG_OBJECTIVES = 'RECEIVED_BACKLOG_OBJECTIVES';
export const RECEIVED_BACKLOG_OBJECTIVES_ERROR = 'RECEIVED_BACKLOG_OBJECTIVES_ERROR';
export const ADDED_NEW_OBJECTIVE = 'ADDED_NEW_OBJECTIVE';
export const UPDATE_USER_BACKLOG_OBJECTIVE = 'UPDATE_USER_BACKLOG_OBJECTIVE';
export const SOFT_DELETE_MY_BACKLOG_OBJECTIVE = 'SOFT_DELETE_MY_BACKLOG_OBJECTIVE';
export const ADD_NEW_BACKLOG_OBJECTIVE_KEY_RESULT = 'ADD_NEW_BACKLOG_OBJECTIVE_KEY_RESULT';
export const SOFT_DELETE_BACKLOG_OBJECTIVE_KEY_RESULT = 'SOFT_DELETE_BACKLOG_OBJECTIVE_KEY_RESULT';
export const EDIT_BACKLOG_KEY_RESULT_TITLE_AND_DIFFICULTY = 'EDIT_BACKLOG_KEY_RESULT_TITLE_AND_DIFFICULTY';
export const ADDED_BACKLOG_OBJECTIVE_TO_QUARTER = 'ADDED_BACKLOG_OBJECTIVE_TO_QUARTER';
export const ADD_TO_QUARTER_ERROR = 'ADD_TO_QUARTER_ERROR';
export const CLEAR_BACKLOG_ERRORS = 'CLEAR_BACKLOG_ERRORS';

export function setActiveTab(tabIndex) {
    return {
        type: SET_TAB,
        categoryTabIndex: tabIndex
    };
}

export function addBacklogObjective(body) {
    return (dispatch, getStore) => {
        dispatch({ type: ADD_REQUEST	});

        return axios.post(`${ ROOT_URL }/api/userObjective/me/backlog`, body)
            .then(response => {
                dispatch(addedBacklogObjective(response.data, body));
                dispatch({ type: REMOVE_REQUEST	});
            })
            .then(() => {
                dispatch(getMyHistory());
            })
            .catch(response => {
                dispatch(receivedBacklogObjectivesError(response.data));
                dispatch({ type: REMOVE_REQUEST	});
            });
    };
}

export function addedBacklogObjective(data, body) {
    return {
        type: ADDED_BACKLOG_OBJECTIVE,
        responseData: data,
        requestData: body,
    };
}

export function receivedBacklogObjectivesError(response) {
    return {
        type: RECEIVED_BACKLOG_OBJECTIVES_ERROR,
        data: response
    };
}

export function receivedBacklogObjectives(data) {
    data = data || [];

    return {
        type: RECEIVED_BACKLOG_OBJECTIVES,
        backlogObjectives: data
    };
}

export function getObjectivesByCategory(userId, categoryId) {
    return(dispatch, getStore) => {
        dispatch({ type: ADD_REQUEST });

        return axios.get(`${ ROOT_URL }/api/userObjective/${userId}/backlog/${categoryId}`)
            .then(response => {
                dispatch(receivedBacklogObjectives(response.data));
                dispatch({ type: REMOVE_REQUEST });
            })
            .catch(response => {
                dispatch(receivedBacklogObjectivesError(response.data));
                dispatch({ type: REMOVE_REQUEST });
            });
    }
}

export function receivedUpdateBacklogObjective(id, description, title) {
    return {
        type: UPDATE_USER_BACKLOG_OBJECTIVE,
        id: id,
        description,
        title
    };
}

export function updateBacklogObjective(id, description, title) {
    return (dispatch, getStore) => {
        dispatch({ type: ADD_REQUEST	});

        const body = {
            "description": description,
            "title": title
        };

        return axios.put(`${ ROOT_URL }/api/userObjective/${ id }`, body)
            .then(response => {
                dispatch(receivedUpdateBacklogObjective(id, description, title));
                dispatch({ type: REMOVE_REQUEST	});
            })
            .then(() => {
                dispatch(getMyHistory());
            })
            .catch(response => {
                dispatch(receivedBacklogObjectivesError(response.data));
                dispatch({ type: REMOVE_REQUEST	});
            });
    };
}

export function deleteBacklogObjective(id, flag) {
    return {
        type: SOFT_DELETE_MY_BACKLOG_OBJECTIVE,
        id: id,
        flag: flag,
    };
}

export function softDeleteBacklogObjective(id, flag) {
    return (dispatch, getStore) => {
        dispatch({ type: ADD_REQUEST	});
        dispatch({ type: SOFT_DELETE_MY_BACKLOG_OBJECTIVE });

        return axios.delete(`${ ROOT_URL }/api/userObjective/${ id }/${ flag }`)
            .then(response => {
                dispatch(deleteBacklogObjective(id, flag));
                dispatch({ type: REMOVE_REQUEST	});
            })
            .then(() => {
                dispatch(getMyHistory());
            })
            .catch(response => {
                console.log(response, 'error');
                dispatch(receivedBacklogObjectivesError(response.data));
                dispatch({ type: REMOVE_REQUEST	});
            });
    };
}

export function addNewBacklogObjectiveKeyResults(userObjectiveId, body, callback, userId) {
    return (dispatch, getStore) => {
        dispatch({ type: ADD_REQUEST });

        return axios.post(`${ ROOT_URL }/api/userobjective/${ userObjectiveId }/keyresult/`, body)
            .then(response => {
                dispatch(addNewKeyResultToObjective(response.data, userObjectiveId));
                dispatch({ type: REMOVE_REQUEST	});
            })
            .then(() => {
                dispatch(getMyHistory());
            })
            .catch(response => {
                dispatch(receivedError(response.data));
                dispatch({ type: REMOVE_REQUEST	});
            });
    };
}

export function addNewKeyResultToObjective(data, userObjectiveId) {
    return {
        type: ADD_NEW_BACKLOG_OBJECTIVE_KEY_RESULT,
        response: data,
        userObjectiveId: userObjectiveId,
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

export function softDeleteObjectiveKeyResultByIdApi(objectiveId, keyResultId, flag) {
    return (dispatch, getStore) => {
        dispatch({ type: ADD_REQUEST	});

        return axios.delete(`${ ROOT_URL }/api/userObjective/${ objectiveId }/keyResult/${ keyResultId }/${ flag }`)
            .then(response => {
                dispatch(softDeleteBacklogObjectiveKeyResult(objectiveId, keyResultId, flag, response.data));
                dispatch({ type: REMOVE_REQUEST	});
            })
            .then(() => {
                dispatch(getMyHistory());
            })
            .catch(response => {
                dispatch(receivedError(response.data));
                dispatch({ type: REMOVE_REQUEST	});
            });
    };
}

export function softDeleteBacklogObjectiveKeyResult(objectiveId, keyResultId, flag, data) {
    return {
        type: SOFT_DELETE_BACKLOG_OBJECTIVE_KEY_RESULT,
        objectiveId,
        keyResultId,
        flag,
        data,
    };
}

export function editKeyResultEditTitleAndDifficulty(objectiveId, reqBody) {
    return(dispatch, getStore) => {
        dispatch({ type: ADD_REQUEST });

        return axios.put(`${ ROOT_URL }/api/userobjective/${ objectiveId }/keyresult/titleanddifficulty/`, reqBody)
            .then(response => {
                dispatch(keyResultTitleAndDifficultyChanged(response.data));
                dispatch({ type: EDIT_KEY_RESULT_DISABLED_EDIT_ON_HOME_PAGE });
                dispatch({ type: REMOVE_REQUEST });
            })
            .then(() => {
                dispatch(getMyHistory());
            })
            .catch(response => {
                dispatch(receivedError(response.data));
                dispatch({ type: REMOVE_REQUEST });
            });
    };
}

export function keyResultTitleAndDifficultyChanged(data) {
    return {
        type: EDIT_BACKLOG_KEY_RESULT_TITLE_AND_DIFFICULTY,
        data,
    };
}

export function addToQuarter(objectiveId, quarterInd, userId, callback) {
    return(dispatch, getStore) => {
        dispatch({ type: ADD_REQUEST });

        let body = {
            userId: userId,
            quarterInd: quarterInd
        };

        return axios.put(`${ ROOT_URL }/api/userobjective/me/backlog/${ objectiveId }`, body)
            .then(response => {
                dispatch(addToQuarterDispatch(response.data));
                dispatch(deleteBacklogObjective(objectiveId, true));
                dispatch({ type: REMOVE_REQUEST });
            })
            .then(() => {
                dispatch(getStats());
                dispatch(getMyHistory());
            })
            .catch(error => {
                dispatch(addToQuarterError(error.response.data));
                dispatch({ type: REMOVE_REQUEST });
            });
    };
}

export function clearErrors() {
    return {
        type: CLEAR_BACKLOG_ERRORS
    };
}

export function addToQuarterError(response) {
    return {
        type: ADD_TO_QUARTER_ERROR,
        data: response
    };
}

export function addToQuarterDispatch(response) {
    return {
        type: ADDED_BACKLOG_OBJECTIVE_TO_QUARTER,
        data: response
    };
}