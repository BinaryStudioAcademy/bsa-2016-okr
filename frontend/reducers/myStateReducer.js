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
    currentTab: currentQuarter,
    currentYear: currentYear,
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
				currentTab: currentQuarter,
        currentYear: currentYear
			});
		}

		case CHANGE_TAB: {
			const { currentTab } = action;

			return Object.assign({}, state, {
				currentTab: currentTab
			});
		}

		case CHANGE_YEAR: {
			const { currentYear } = action;

			return Object.assign({}, state, {
				currentYear: currentYear
			});
		}

		case CREATE_QUARTER: {
			const { payload } = action;

			var new_exQuarters = state.existedQuarters.concat(payload);
			new_exQuarters.sort();

			return Object.assign({}, state, {
				existedQuarters: new_exQuarters
			})
		}

    	case SOFT_DELETE_MY_OBJECTIVE_BY_ID: {
			const { id } = action;
			console.log(state);
			return Object.assign({}, state, {
				me: deleteObjectiveFromMe(state.me, id)
			})

		}

    case ADDED_NEW_OBJECTIVE: {
      const { response, request } = action;

      var objective = {
        _id: response._id,
        createdAt: response.createdAt,
        creator: response.creator,
        isDeleted: response.isDeleted,
        keyResults: [],
        templateId: {
          _id: response.templateId,
          category: request.category,
          description: request.description,
          title: request.title
        },
        updatedAt: response.updatedAt,
        userId: response.updatedAt
      }

      return Object.assign({}, state, {
        me: addNewObjectiveToMe(state.me, request.quarterId, objective)
      })
    }

		case ADD_NEW_KEY_RESULT_TO_OBJECTIVE: {
			const { response, request} = action;

			let keyResult = {
				_id: response._id,
				creator: response.creator,
				score: 0,
				templateId: {
					_id: response._id,
					createdAt: response.createdAt,
					creator: response.creator,
					difficulty: response.difficulty,
					isApproved: response.isApproved,
					isDeleted: response.isDeleted,
					objectiveId: response.objectiveId,
					title: response.title,
					updatedAt: response.updatedAt,
					used: response.used
				}
			};

			return Object.assign({}, state, {
				me: addNewKeyResultToMe(state.me, request.objectiveId, keyResult)
			})
		}

		case CHANGED_KEYRESULT_SCORE: {
			let { data } = action;
			let { objectiveId, keyResultId, score } = data;

			return Object.assign({}, state, {
				me: setScoreToKeyResult(objectiveId, keyResultId, score),
			});
		}

		case CHANGED_KEYRESULT_SCORE_ERROR: {
			let { data } = action;

			console.log(CHANGED_KEYRESULT_SCORE_ERROR);
			console.log(data);
			
			return state
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

function setScoreToKeyResult(objectiveId, keyResultId, score) {
	const meCopy = Object.assign({}, me);

	let quarterIndex, userObjectiveIndex, keyResultIndex;

	let quarterFoundedIndex = meCopy.quarters.findIndex((quarter) => {
		let userObjectiveFoundedIndex = quarter.userObjectives.findIndex((userObjective) => {
			return userObjective._id === userObjectiveId 
		});

		if(userObjectiveFoundedIndex !== -1) {
			userObjectiveIndex = userObjectiveFoundedIndex;
			return true;
		}
		
		return false;
	});

	if(quarterFoundedIndex !== -1) {
		quarterIndex = quarterFoundedIndex;

		let keyResultFoundedIndex = meCopy.quarters[quarterIndex].userObjectives[userObjectiveIndex].keyResults.findIndex((keyResult) => {
			return keyResult._id === keyResultId;
		});

		if(keyResultFoundedIndex !== -1) {
			keyResultIndex = keyResultFoundedIndex;
			meCopy.quarters[quarterIndex].userObjectives[userObjectiveIndex].keyResults[keyResultIndex].score = score;
		}
	}

	meCopy.quarters.some((quarter) => {
		return quarter.userObjectives.some((userObjective) => {
			if(userObjective._id === objectiveId) {
				let saved = userObjective.keyResults.some((keyResult) => {

				});
				
				return saved;
			}
			
			return false;
		})
	});

	return meCopy;
}

function addNewObjectiveToMe(me, quarterId, objective) {
	var meCopy = Object.assign({}, me);
	meCopy.quarters.forEach((quarter) => {
    if (quarter._id == quarterId) {
      quarter.userObjectives.push(objective);
		}
	});
	return meCopy
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