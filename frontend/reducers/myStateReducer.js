import { isEmpty } from '../../backend/utils/ValidateService';
import { currentYear, currentQuarter } from '../../backend/config/constants';
import {
	RECEIVED_MY_OBJECTIVES_ERROR,
	RECEIVED_MY_OBJECTIVES,
	CHANGE_TAB,
	CHANGE_YEAR,
	CREATE_QUARTER,
	SOFT_DELETE_MY_OBJECTIVE_BY_ID,
	ADDED_NEW_OBJECTIVE,
	CHANGED_KEYRESULT_SCORE,
	CHANGED_KEYRESULT_SCORE_ERROR,
} from '../actions/myStateActions';

import {
	ADD_NEW_KEY_RESULT_TO_OBJECTIVE
} from '../actions/keyResultActions';

const initialState = {
	currentYear,
	currentQuarter,
	selectedTab: currentQuarter,
	selectedYear: currentYear,
	existedQuarters: getExistedQuarters(),
	me: {
		"localRole": ""
	}
};

export default function myObjectivesReducer(state = initialState, action = {}) {

	switch (action.type) {
		case RECEIVED_MY_OBJECTIVES_ERROR: {

			const { data } = action;

			console.log("RECEIVED_ERROR >>>" , data);
			console.log("state.me >>>", state.me);
			return Object.assign({}, state, {
				me: state.me
			});
		}

		case RECEIVED_MY_OBJECTIVES: {
			const { data } = action;

			return Object.assign({}, state, {
				me: isEmpty(data) ? state.me : data,
			});
		}

		case CHANGE_TAB: {
			const { selectedTab } = action;

			return Object.assign({}, state, {
				selectedTab: selectedTab
			});
		}

		case CHANGE_YEAR: {
			const { selectedYear } = action;

			return Object.assign({}, state, {
				selectedYear: selectedYear
			});
		}

		case CREATE_QUARTER: {
			const { payload } = action;

			var new_exQuarters = state.existedQuarters.concat(payload);
			new_exQuarters.sort();

			return Object.assign({}, state, {
				existedQuarters: new_exQuarters
			});
		}

		case SOFT_DELETE_MY_OBJECTIVE_BY_ID: {
			const { id } = action;

			return Object.assign({}, state, {
				me: deleteObjectiveFromMe(state.me, id)
			});

		}

		case ADDED_NEW_OBJECTIVE: {
			const { responseData, requestData } = action;

			let newMe = addNewObjectiveToMe(state.me, requestData.quarterId, responseData);

			return Object.assign({}, state, {
				me: newMe
			});
		}

		case ADD_NEW_KEY_RESULT_TO_OBJECTIVE: {
			const { response, userObjectiveId } = action;

			let keyResultIdInObjective = response.keyResultId;
			let templateKeyResult = response.keyResult;

			let keyResult = {
				_id: keyResultIdInObjective,
				creator: templateKeyResult.creator,
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

			let newMe = addNewKeyResultToMe(state.me, userObjectiveId, keyResult)

			return Object.assign({}, state, {
				me: newMe,
			});
		}

		case CHANGED_KEYRESULT_SCORE: {
			let { data } = action;
			let { objectiveId, keyResultId, score } = data;

			return Object.assign({}, state, {
				me: setScoreToKeyResult(state.me, objectiveId, keyResultId, score),
			});
		}

		case CHANGED_KEYRESULT_SCORE_ERROR: {
			let { data } = action;

			console.log(CHANGED_KEYRESULT_SCORE_ERROR);
			console.log(data);
			
			return state;
		}

		default: {
			return state;
		}
	}
}

function getExistedQuarters(){
	let quarters = [];
	for(let i = 1; i <= currentQuarter; i++) {
		quarters.push(i);
	}

	return quarters;
}

function deleteObjectiveFromMe(me, id) {
	var meCopy = Object.assign({}, me);
	meCopy.quarters.forEach((quarter) => {
		for(var i=0 ; i<quarter.userObjectives.length; i++) {
			if(quarter.userObjectives[i]._id == id) {
				quarter.userObjectives.splice(i, 1);
			}
		}
	});
	return meCopy;
}

function setScoreToKeyResult(me, objectiveId, keyResultId, score) {
	const meCopy = Object.assign({}, me);

	let quarterIndex = -1;
	let	userObjectiveIndex = -1;
	let	keyResultIndex = -1;

	let quarterFoundedIndex = meCopy.quarters.findIndex((quarter) => {
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
			let keyResultFoundedIndex = meCopy.quarters[quarterIndex].userObjectives[userObjectiveIndex].keyResults.findIndex((keyResult) => {
				return keyResult._id === keyResultId;
			});

			if (keyResultFoundedIndex !== -1) {
				keyResultIndex = keyResultFoundedIndex;
				meCopy.quarters[quarterIndex].userObjectives[userObjectiveIndex].keyResults[keyResultIndex].score = score;
			}
		}
	}

	return meCopy;
}

function addNewObjectiveToMe(me, quarterId, objective) {
	let meCopy = Object.assign({}, me);
	
	let index = meCopy.quarters.findIndex((quarter) => {
		return quarter._id == quarterId;
	});

	if(index !== -1) {
		meCopy.quarters[index].userObjectives.push(objective);
	}

	return meCopy;
}

function addNewKeyResultToMe(me, objectiveId, keyResult) {
	var meCopy = Object.assign({}, me);

	meCopy.quarters.forEach((quarter) => {
		let index = quarter.userObjectives.findIndex((userObjective) => {
			return userObjective._id == objectiveId;
		});

		if (index !== -1) {
			quarter.userObjectives[index].keyResults.push(keyResult);
		}
	});

	return meCopy
}