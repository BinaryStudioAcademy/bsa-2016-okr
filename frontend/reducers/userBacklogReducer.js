import { isEmpty } from '../../backend/utils/ValidateService';

import {
    SET_TAB,
    RECEIVED_BACKLOG_OBJECTIVES,
    ADDED_BACKLOG_OBJECTIVE,
    UPDATE_USER_BACKLOG_OBJECTIVE,
    SOFT_DELETE_MY_BACKLOG_OBJECTIVE,
    ADD_NEW_BACKLOG_OBJECTIVE_KEY_RESULT,
    SOFT_DELETE_BACKLOG_OBJECTIVE_KEY_RESULT,
    RECEIVED_ERROR,
    ADDED_BACKLOG_OBJECTIVE_TO_QUARTER,
    EDIT_BACKLOG_KEY_RESULT_TITLE_AND_DIFFICULTY,
    ADD_TO_QUARTER_ERROR,
    CLEAR_BACKLOG_ERRORS
} from '../actions/userBacklogActions';

const initialState = {
    categoryTabIndex: 0,
    backlogObjectives: [],
    errorMessage: ''
};

export default function userBacklogReducer(state = initialState, action) {

    switch (action.type) {

        case ADDED_BACKLOG_OBJECTIVE: {
            const {responseData, requestData} = action;
            let data = state.backlogObjectives;
            data.push(responseData);
            return Object.assign({}, state, {
                backlogObjectives: data
            });
        }

        case SET_TAB:
            let categoryTabIndex = action.categoryTabIndex;
            return Object.assign({}, state, {
                categoryTabIndex
            });

        case RECEIVED_BACKLOG_OBJECTIVES:
            let backlogObjectives = action.backlogObjectives;
            return Object.assign({}, state, {
                backlogObjectives
            });

        case RECEIVED_ERROR:
            let data = action.data;
            console.log('¯\\_(ツ)_/¯: userBacklog ERROR', data);
            return state;

        case UPDATE_USER_BACKLOG_OBJECTIVE: {
            const {id, description, title} = action;
            let backlogObjectives = updateObjectiveInBacklog(state.backlogObjectives, id, description, title);
            return Object.assign({}, state, {
                backlogObjectives: backlogObjectives
            });
        }

        case SOFT_DELETE_MY_BACKLOG_OBJECTIVE: {
            const {id, flag} = action;
            let backlogObjectives = deleteObjectiveFromBacklog(state.backlogObjectives, id);
            return Object.assign({}, state, {
                backlogObjectives: backlogObjectives
            });
        }

        case ADD_NEW_BACKLOG_OBJECTIVE_KEY_RESULT: {
            const {response, userObjectiveId} = action;

            let keyResultIdInObjective = response.keyResultId;
            let templateKeyResult = response.keyResult;

            let keyResult = {
                _id: keyResultIdInObjective,
                creator: templateKeyResult.creator,
                deletedBy: null,
                deletedDate: null,
                isDeleted: false,
                score: 0,
                templateId: {
                    _id: templateKeyResult._id,
                    createdAt: templateKeyResult.createdAt,
                    creator: templateKeyResult.creator,
                    difficulty: templateKeyResult.difficulty,
                    isApproved: templateKeyResult.isApproved,
                    isDeleted: templateKeyResult.isDeleted,
                    objectiveId: templateKeyResult.objectiveId,
                    title: templateKeyResult.title,
                    updatedAt: templateKeyResult.updatedAt,
                    used: templateKeyResult.used
                }
            };

            let backlogObjectives = addNewKeyResultToBacklog(state.backlogObjectives, userObjectiveId, keyResult);

            return Object.assign({}, state, {
                backlogObjectives: backlogObjectives
            });
        }

        case SOFT_DELETE_BACKLOG_OBJECTIVE_KEY_RESULT: {
            const {objectiveId, keyResultId, flag, data} = action;

            return Object.assign({}, state, {
                backlogObjectives: deleteKeyResultFromObjective(state.backlogObjectives, objectiveId, keyResultId, flag, data)
            });
        }

        case EDIT_BACKLOG_KEY_RESULT_TITLE_AND_DIFFICULTY:
        {
            let { data } = action;
            let { objectiveId, keyResultId, title, difficulty } = data;

            return Object.assign({}, state, {
                backlogObjectives: setTitleAndDifficultyToKeyResult(state.backlogObjectives, objectiveId, keyResultId, title, difficulty),
            });
        }

        case CLEAR_BACKLOG_ERRORS: {
            return Object.assign({}, state, {
                errorMessage: ''
            });
        }

        case ADD_TO_QUARTER_ERROR: {
            let { message } = action.data;
            return Object.assign({}, state, {
                errorMessage: message
            });
        }

        default:
            return state;
    }
}

function addNewKeyResultToBacklog(objectives, userObjectiveId, keyResult) {
    let data = objectives;
    data.forEach((objective) => {
        objective._id === userObjectiveId ? objective.keyResults.push(keyResult) : null;
    });
    return data;
}

function updateObjectiveInBacklog(backlogObjectives, id, description, title) {
    let data = backlogObjectives;
    data.forEach((objective) => {
        if (objective._id === id) {
            objective.templateId.title = title;
            objective.templateId.description = description;
        }
    });
    return data;
}

function deleteObjectiveFromBacklog(backlogObjectives, id, flag) {
    let data = backlogObjectives;
    let ind = data.findIndex((objective) => {
        return objective._id === id;
    });

    if (ind !== -1) {
        data.splice(ind, 1);
    }
    return data;
}

function deleteKeyResultFromObjective(backlogObjectives, objectiveId, keyResultId, flag, response) {
    let data = backlogObjectives;
    let searchObjective = data.find((objective) => {
        return objective._id === objectiveId;
    });

    if (!isEmpty(searchObjective)) {
        let searchKeyResult = searchObjective.keyResults.find((keyresult) => {
            return keyresult._id === keyResultId;
        });

        if (!isEmpty(searchKeyResult)) {
            flag ? searchKeyResult.isDeleted = true : searchKeyResult.isDeleted = false;
        }
    }

    return data;
}

function setTitleAndDifficultyToKeyResult(backlogObjectives, objectiveId, keyResultId, title, difficulty) {
    let data = backlogObjectives;
    let searchObjective = data.find((objective) => {
        return objective._id === objectiveId;
    });

    if (!isEmpty(searchObjective)) {
        let searchKeyResult = searchObjective.keyResults.find((keyresult) => {
            return keyresult._id === keyResultId;
        });

        if (!isEmpty(searchKeyResult)) {
            searchKeyResult.templateId.title = title;
            searchKeyResult.templateId.difficulty = difficulty;
        }
    }

    return data;
}