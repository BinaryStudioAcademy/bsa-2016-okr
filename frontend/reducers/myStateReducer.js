import { isEmpty } from '../../backend/utils/ValidateService';
import {
  RECEIVED_MY_OBJECTIVES_ERROR,
  RECEIVED_MY_OBJECTIVES,
  CHANGE_TAB,
  CHANGE_YEAR,
  CREATE_QUARTER,
  SOFT_DELETE_MY_OBJECTIVE_BY_ID,
  ADDED_NEW_OBJECTIVE
} from '../actions/myStateActions';

import {
	ADD_NEW_KEY_RESULT_TO_OBJECTIVE
} from '../actions/keyResultActions';

const initialState = {
    currentTab: getQuarter(),
    currentYear: getYear(),
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
				currentTab: getQuarter(),
        currentYear: getYear()
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

		default: {
			return state;
		}
	}
}

function getYear(){
    let today = new Date();
    return today.getFullYear()
}

function getQuarter(){
    let today = new Date();
    let first = new Date('2016-03-31T10:42:12.643Z'),
        second = new Date('2016-06-30T10:42:12.643Z'),
        third = new Date('2016-09-30T10:42:12.643Z');
    if (today < first)
        return 1;
    else if (today >= first && today <= second)
        return 2;
    else if(today > second && today <= third)
        return 3;
    else if(today > third)
        return 4;
}

function getExistedQuarters(){
	let quarters = [];
	for(let i = 1, currentQuarter = getQuarter(); i <= currentQuarter; i++){
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
	return meCopy
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
			return userObjective._id == objectiveId
		});

		if (index !== -1) {
			quarter.userObjectives[index].keyResults.push(keyResult);
		}
	});

	return meCopy
}