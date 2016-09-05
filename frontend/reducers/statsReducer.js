import { isEmpty } from '../../backend/utils/ValidateService';

import {
	GET_CATEGORIES_STATS,
	RECEIVED_CATEGORIES_STATS,
	GET_KEYRESULT_STATS,
	RECEIVED_KEYRESULT_STATS,
	RECEIVED_ERROR,
} from '../actions/statsActions';


const initialState = {
	categories: [],
	keyResults: [],
}

export default function statsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_CATEGORIES_STATS: {
			return state;
		}		

		case RECEIVED_CATEGORIES_STATS: {
			let { data } = action;

			if(isEmpty(data)) {
				return state;
			}

			let categories = removeId(data);

			return Object.assign({}, state, {
				categories: categories,
			});
		}

		case GET_KEYRESULT_STATS: {
			return state;
		}

		case RECEIVED_KEYRESULT_STATS: {
			let { data } = action;

			if(isEmpty(data)) {
				return state;
			}
			
			let keyResults = removeId(data);

			return Object.assign({}, state, {
				keyResults: keyResults,
			});
		}

		case RECEIVED_ERROR: {
			console.log('ERROR in STATS');

			return state;
		}

		default: {
			return state;
		}
	}
}

function removeId(data) {
	return data.map((el) => {
		return {
			title: el.title,
			score: el.score,
		};
	});
}