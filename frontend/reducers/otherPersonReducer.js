import { GET_USER,
	RECEIVED_USER,
	CHANGE_TAB,
	CHANGE_YEAR,
	TOOK_APPRENTICE,
	REMOVED_APPRENTICE,
	ADDED_NEW_OBJECTIVE_OTHER_USER,
	EDIT_KEY_RESULT_ENABLE_EDIT_ON_USER_PAGE,
	EDIT_KEY_RESULT_DISABLED_EDIT_ON_USER_PAGE,
	EDIT_KEY_RESULT_TITLE_AND_DIFFICULTY_ON_USER_PAGE,
	EDIT_KEY_RESULT_TITLE_AND_DIFFICULTY_ERROR_ON_USER_PAGE } from '../actions/otherPersonActions.js'
import { CHANGED_KEYRESULT_SCORE,
	CHANGED_KEYRESULT_SCORE_ERROR,
	SOFT_DELETE_OBJECTIVE_KEY_RESULT_BY_ID_SUCCESS,
	SOFT_DELETE_MY_OBJECTIVE_BY_ID,
	UPDATE_USER_OBJECTIVE,
	CHANGE_ARCHIVE_STATUS_LOCAL } from '../actions/myStateActions.js'
import { ADD_NEW_KEY_RESULT_TO_OBJECTIVE_OTHER_PERSON } from '../actions/keyResultActions';

import { currentYear, currentQuarter } from '../../backend/config/constants'
import { updateObjectiveDescription } from './myStateReducer';
import { changeArchiveInMyObjective } from './myStateReducer.js';
const initialState = {
	user: {
		quarters: [{
			userObjectives: []
		}]
	},
	waiting: true,
	selectedTab: currentQuarter,
	selectedYear: currentYear,
	editKeyResultId: '',
	editKeyResultIsEditing: false,
};

export default function otherPersonReducer(state = initialState, action) {

	switch (action.type) {
		case GET_USER:
		{
			return Object.assign({}, state, {
				waiting: true,
			});
		}
		case RECEIVED_USER:
		{
			const {data} = action;

			return Object.assign({}, state, {
				user: data,
				waiting: false,
				// selectedTab: currentQuarter,
				// selectedYear: currentYear
			})
		}

		case CHANGE_TAB:
		{
			const { selectedTab } = action;

			return Object.assign({}, state, {
				selectedTab
			});
		}

		case CHANGE_YEAR:
		{
			const { selectedYear } = action;

			return Object.assign({}, state, {
				selectedYear
			});
		}

		case TOOK_APPRENTICE:
		{
			const { response, me } = action;
			let userCopy = Object.assign({}, state.user);
			userCopy.mentor = {
				_id: me._id,
				createdAt: me.createdAt,
				localRole: me.localRole,
				menor: me.mentor,
				updatedAt: me.updatedAt,
				userInfo: me.userInfo
			}
			return Object.assign({}, state, {
				user: userCopy
			});
		}

		case REMOVED_APPRENTICE:
		{
			const { response } = action;
			let userCopy = Object.assign({}, state.user);
			userCopy.mentor = null;
			return Object.assign({}, state, {
				user: userCopy
			});
		}

		case UPDATE_USER_OBJECTIVE:
		{
			const { id, description, title } = action;

			return Object.assign({}, state, {
				me: updateObjectiveDescription(state.user, id, description, title)
			});

		}

		case SOFT_DELETE_MY_OBJECTIVE_BY_ID:
		{
			const { id } = action;

			return Object.assign({}, state, {
				user: deleteObjectiveFromMe(state.user, id)
			});

		}

		case CHANGE_ARCHIVE_STATUS_LOCAL:
		{
			let id = action.id;
			let flag = action.flag;

			return Object.assign({}, state, {
				user: changeArchiveInMyObjective(state.user, id, flag)
			})
		}

		case ADDED_NEW_OBJECTIVE_OTHER_USER:
		{
			const { responseData, requestData } = action;

			let newUser = addNewObjectiveToUser(state.user, requestData.quarterId, responseData);
			return Object.assign({}, state, {
				user: newUser
			});
		}
		case SOFT_DELETE_OBJECTIVE_KEY_RESULT_BY_ID_SUCCESS:
		{
			const { objectiveId, keyResultId, data } = action;

			return Object.assign({}, state, {
				user: deleteKeyResultFromObjective(state.user, objectiveId, keyResultId, data)
			});
		}

		case ADD_NEW_KEY_RESULT_TO_OBJECTIVE_OTHER_PERSON:
		{
			const { response, userObjectiveId } = action;

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

			let newUser = addNewKeyResultToMe(state.user, userObjectiveId, keyResult);

			return Object.assign({}, state, {
				user: newUser,
			});
		}

		case EDIT_KEY_RESULT_TITLE_AND_DIFFICULTY_ON_USER_PAGE:
		{
			let { data } = action;
			let { objectiveId, keyResultId, title, difficulty } = data;

			return Object.assign({}, state, {
				user: setTitleAndDifficultyToKeyResult(state.user, objectiveId, keyResultId, title, difficulty),
			});
		}

		case EDIT_KEY_RESULT_TITLE_AND_DIFFICULTY_ERROR_ON_USER_PAGE:
		{
			let { data } = action;

			console.log(EDIT_KEY_RESULT_TITLE_AND_DIFFICULTY_ERROR_ON_USER_PAGE);
			console.log(data);

			return state;
		}

		case EDIT_KEY_RESULT_ENABLE_EDIT_ON_USER_PAGE:
		{
			const { editKeyResultId } = action;

			return Object.assign({}, state, {
				editKeyResultId,
				editKeyResultIsEditing: true,
			})
		}

		case EDIT_KEY_RESULT_DISABLED_EDIT_ON_USER_PAGE:
		{
			return Object.assign({}, state, {
				editKeyResultIsEditing: false
			})
		}

		default:
			return state;

	}
}

function setScoreToKeyResult(user, objectiveId, keyResultId, score) {

	const userCopy = Object.assign({}, user);

	let quarterIndex = -1;
	let userObjectiveIndex = -1;
	let keyResultIndex = -1;

	let quarterFoundedIndex = userCopy.quarters.findIndex((quarter) => {
		let userObjectiveFoundedIndex = quarter.userObjectives.findIndex((userObjective) => {
			return userObjective._id === objectiveId
		});

		if (userObjectiveFoundedIndex !== -1) {
			userObjectiveIndex = userObjectiveFoundedIndex;
			return true;
		}

		return false;
	});

	if (quarterFoundedIndex !== -1) {
		quarterIndex = quarterFoundedIndex;

		if (userObjectiveIndex !== -1) {
			let keyResultFoundedIndex = userCopy.quarters[quarterIndex].userObjectives[userObjectiveIndex].keyResults.findIndex((keyResult) => {
				return keyResult._id === keyResultId;
			});
			console.log('index', userObjectiveIndex);
			if (keyResultFoundedIndex !== -1) {
				keyResultIndex = keyResultFoundedIndex;
				userCopy.quarters[quarterIndex].userObjectives[userObjectiveIndex].keyResults[keyResultIndex].score = score;
			}
		}
	}

	return userCopy;
}

function addNewObjectiveToUser(user, quarterId, objective) {
	let userCopy = Object.assign({}, user);

	let index = userCopy.quarters.findIndex((quarter) => {
		return quarter._id == quarterId;
	});

	if (index !== -1) {
		userCopy.quarters[index].userObjectives.push(objective);
	}

	return userCopy;
}

function deleteKeyResultFromObjective(user, objectiveId, keyResultId, newKeyResult) {
	var userCopy = Object.assign({}, user);
	let quarterIndex, objectiveIndex, keyResultIndex;

	quarterIndex = userCopy.quarters.findIndex((quarter) => {
		objectiveIndex = quarter.userObjectives.findIndex((userObjective)=> {
			return userObjective._id === objectiveId;
		});
		if (objectiveIndex !== -1) {
			return true;
		}

		return false;
	});

	//console.log('Quarter index founded',quarterIndex,'objectiveIndex',objectiveIndex);

	if (quarterIndex !== -1) {
		keyResultIndex = userCopy.quarters[quarterIndex].userObjectives[objectiveIndex].keyResults.findIndex((keyResult) => {
			return keyResult._id === keyResultId;
		});
		if (keyResultIndex !== -1) {
			userCopy.quarters[quarterIndex].userObjectives[objectiveIndex].keyResults.splice(keyResultIndex, 1);
		}
	}
	//console.log('Success deleting keyResult from objective');
	return userCopy;
}

function deleteObjectiveFromMe(user, id) {
	var userCopy = Object.assign({}, user);
	userCopy.quarters.forEach((quarter) => {
		for (var i = 0; i < quarter.userObjectives.length; i++) {
			if (quarter.userObjectives[i]._id == id) {
				quarter.userObjectives.splice(i, 1);
			}
		}
	});
	return userCopy;
}

function addNewKeyResultToMe(user, objectiveId, keyResult) {
	var userCopy = Object.assign({}, user);

	userCopy.quarters.forEach((quarter) => {
		let index = quarter.userObjectives.findIndex((userObjective) => {
			return userObjective._id == objectiveId;
		});

		if (index !== -1) {
			quarter.userObjectives[index].keyResults.push(keyResult);
		}
	});

	return userCopy
}

function setTitleAndDifficultyToKeyResult(me, objectiveId, keyResultId, title, difficulty) {
	const meCopy = Object.assign({}, me);

	let quarterIndex = -1;
	let userObjectiveIndex = -1;
	let keyResultIndex = -1;

	let quarterFoundedIndex = meCopy.quarters.findIndex((quarter) => {
		let userObjectiveFoundedIndex = quarter.userObjectives.findIndex((userObjective) => {
			return userObjective._id === objectiveId
		});

		if (userObjectiveFoundedIndex !== -1) {
			userObjectiveIndex = userObjectiveFoundedIndex;
			return true;
		}

		return false;
	});

	if (quarterFoundedIndex !== -1) {
		quarterIndex = quarterFoundedIndex;

		if (userObjectiveIndex !== -1) {
			let keyResultFoundedIndex = meCopy.quarters[quarterIndex].userObjectives[userObjectiveIndex].keyResults.findIndex((keyResult) => {
				return keyResult._id === keyResultId;
			});

			if (keyResultFoundedIndex !== -1) {
				keyResultIndex = keyResultFoundedIndex;

				meCopy.quarters[quarterIndex].userObjectives[userObjectiveIndex].keyResults[keyResultIndex].templateId.title = title;
				meCopy.quarters[quarterIndex].userObjectives[userObjectiveIndex].keyResults[keyResultIndex].templateId.difficulty = difficulty;
			}
		}
	}

	return meCopy;
}