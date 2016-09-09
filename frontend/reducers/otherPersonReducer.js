import { GET_USER,
				 RECEIVED_USER,
				 CHANGE_TAB,
				 CHANGE_YEAR,
				 TOOK_APPRENTICE,
				 REMOVED_APPRENTICE,
				 ADDED_NEW_OBJECTIVE_OTHER_USER } from '../actions/otherPersonActions.js'
import { CHANGED_KEYRESULT_SCORE,
				 CHANGED_KEYRESULT_SCORE_ERROR,
				 SOFT_DELETE_OBJECTIVE_KEY_RESULT_BY_ID_SUCCESS,
				 SOFT_DELETE_MY_OBJECTIVE_BY_ID,
				 UPDATE_USER_OBJECTIVE } from '../actions/myStateActions.js'
import { ADD_NEW_KEY_RESULT_TO_OBJECTIVE } from '../actions/keyResultActions';

import { currentYear, currentQuarter } from '../../backend/config/constants'
import { updateObjectiveDescription } from './myStateReducer';

const initialState = {
	user: {},
	waiting: true,
	selectedTab: currentQuarter,
	selectedYear: currentYear
};

export default function otherPersonReducer(state = initialState, action) {

	switch (action.type) {
		case GET_USER: {
			return Object.assign({}, state, {
				waiting: true,
			});
		}
		case RECEIVED_USER: {
			const {data} = action;

			return Object.assign({}, state, {
				user: data,
				waiting: false,
				// selectedTab: currentQuarter,
				// selectedYear: currentYear
			})
		}

		case CHANGE_TAB: {
			const { selectedTab } = action;

			return Object.assign({}, state, {
				selectedTab
			});
		}

		case CHANGE_YEAR: {
			const { selectedYear } = action;

			return Object.assign({}, state, {
				selectedYear
			});
		}

		case TOOK_APPRENTICE: {
			const { response, me } = action;
			let userCopy = Object.assign({}, state.user);
			userCopy.mentor = {
				_id : me._id,
				createdAt : me.createdAt,
				localRole : me.localRole,
				menor : me.mentor,
				updatedAt : me.updatedAt,
				userInfo : me.userInfo
			}
			return Object.assign({}, state, {
				user : userCopy
			});
		}

		case REMOVED_APPRENTICE: {
			const { response } = action;
			let userCopy = Object.assign({}, state.user);
			userCopy.mentor = null;
			return Object.assign({}, state, {
				user : userCopy
			});
		}

		case UPDATE_USER_OBJECTIVE: {
			const { id, description } = action;

			return Object.assign({}, state, {
				me: updateObjectiveDescription(state.user, id, description)
			});

		}

		case SOFT_DELETE_MY_OBJECTIVE_BY_ID: {
			const { id } = action;

			return Object.assign({}, state, {
				user: deleteObjectiveFromMe(state.user, id)
			});

		}

		case ADDED_NEW_OBJECTIVE_OTHER_USER: {
			const { responseData, requestData } = action;

			let newUser = addNewObjectiveToUser(state.user, requestData.quarterId, responseData);
			return Object.assign({}, state, {
				user: newUser
			});
		}
		case SOFT_DELETE_OBJECTIVE_KEY_RESULT_BY_ID_SUCCESS: {
			const { objectiveId, keyResultId, data } = action;

			return Object.assign({}, state, {
				user: deleteKeyResultFromObjective(state.user, objectiveId, keyResultId, data)
			});
		}

		case ADD_NEW_KEY_RESULT_TO_OBJECTIVE: {
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
/*		case CHANGED_KEYRESULT_SCORE: {
			let { data } = action;
			let { objectiveId, keyResultId, score } = data;
			console.log(data)
			return Object.assign({}, state, {
				user: setScoreToKeyResult(state.user, objectiveId, keyResultId, score),
			});
		}

		case CHANGED_KEYRESULT_SCORE_ERROR: {
			let { data } = action;

			console.log(CHANGED_KEYRESULT_SCORE_ERROR);
			console.log(data);

			return state;
		}
*/

		default:
		return state;

	}
}

function setScoreToKeyResult(user, objectiveId, keyResultId, score) {

	const userCopy = Object.assign({}, user);

	let quarterIndex = -1;
	let	userObjectiveIndex = -1;
	let	keyResultIndex = -1;

	let quarterFoundedIndex = userCopy.quarters.findIndex((quarter) => {
		let userObjectiveFoundedIndex = quarter.userObjectives.findIndex((userObjective) => {
			return userObjective._id === objectiveId
		});

		if(userObjectiveFoundedIndex !== -1) {
			userObjectiveIndex = userObjectiveFoundedIndex;
			return true;
		}

		return false;
	});

	if(quarterFoundedIndex !== -1) {
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

	if(index !== -1) {
		userCopy.quarters[index].userObjectives.push(objective);
	}

	return userCopy;
}

function deleteKeyResultFromObjective(user, objectiveId, keyResultId, newKeyResult) {
	var userCopy = Object.assign({}, user);
	let quarterIndex, objectiveIndex, keyResultIndex;

	quarterIndex = userCopy.quarters.findIndex((quarter) => {
		objectiveIndex = quarter.userObjectives.findIndex((userObjective)=>{
			return userObjective._id === objectiveId;
		});
		if (objectiveIndex !== -1) {
			return true;
		}

		return false;
	});

	//console.log('Quarter index founded',quarterIndex,'objectiveIndex',objectiveIndex);

	if(quarterIndex !== -1) {
		keyResultIndex = userCopy.quarters[quarterIndex].userObjectives[objectiveIndex].keyResults.findIndex((keyResult) => {
			return keyResult._id === keyResultId;
		});
		if(keyResultIndex !== -1) {
			userCopy.quarters[quarterIndex].userObjectives[objectiveIndex].keyResults.splice(keyResultIndex, 1);
		}
	}
	//console.log('Success deleting keyResult from objective');
	return userCopy;
}

function deleteObjectiveFromMe(user, id) {
	var userCopy = Object.assign({}, user);
	userCopy.quarters.forEach((quarter) => {
		for(var i=0 ; i<quarter.userObjectives.length; i++) {
			if(quarter.userObjectives[i]._id == id) {
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
