import { GET_USER, RECEIVED_USER, CHANGE_TAB, CHANGE_YEAR, TOOK_APPRENTICE, REMOVED_APPRENTICE} from '../actions/otherPersonActions.js'
import { CHANGED_KEYRESULT_SCORE, CHANGED_KEYRESULT_SCORE_ERROR } from '../actions/myStateActions.js'
import { currentYear, currentQuarter } from '../../backend/config/constants'

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
