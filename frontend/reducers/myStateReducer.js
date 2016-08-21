import { isEmpty } from '../../backend/utils/ValidateService';

const initialState = {
    currentTab: getQuarter(),
    currentYear: getYear(),
	me: {
		"localRole": ""
	}
};

export default function myObjectivesReducer(state = initialState, action = {}) {

	switch (action.type) {
		case "RECEIVED_ERROR": {

			const { data } = action;

			console.log("RECEIVED_ERROR");
			console.log(data);
      console.log("ME +++", state.me);
			return Object.assign({}, state, {
				me: state.me
			});
		}

		case "RECEIVED_MY_OBJECTIVES": {
			const { data } = action;
      console.log("RECEIVED_MY_OBJECTIVES hit", data);
			return Object.assign({}, state, {
				me: isEmpty(data) ? state.me : data,
				currentTab: getQuarter(),
        currentYear: getYear()
			});
		}

		case "CHANGE_TAB": {
			const { currentTab } = action;

			return Object.assign({}, state, {
				currentTab: currentTab
			});
		}

		case "CHANGE_YEAR": {
			const { currentYear } = action;

			return Object.assign({}, state, {
				currentYear: currentYear
			});
		}

    case "SOFT_DELETE_MY_OBJECTIVE_BY_ID": {
			const { id } = action;
			console.log(state);
			return Object.assign({}, state, {
				me: deleteObjectiveFromMe(state.me, id)
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
