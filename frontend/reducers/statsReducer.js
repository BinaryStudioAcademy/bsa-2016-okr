import { isEmpty } from '../../backend/utils/ValidateService';

import {
	GET_USERS_STATS,
	RECEIVED_USERS_STATS,
	GET_CATEGORIES_STATS,
	RECEIVED_CATEGORIES_STATS,
	GET_KEYRESULT_STATS,
	RECEIVED_KEYRESULT_STATS,
	RECEIVED_ERROR,
	SHOW_FILTERS,
	SET_FILTERS,
	RESET_FILTERS
} from '../actions/statsActions';


const initialState = {
	categories: [],
	keyResults: [],
	showStatsFilters: false,
	filters: {
		userId: null,
		dateFrom: null,
		dateTo: null,
		year: null,
		quarter: null
	}
};

export default function statsReducer(state = initialState, action) {

	switch (action.type) {

		case GET_USERS_STATS: {
			return state;
		}

		case RECEIVED_USERS_STATS: {
			let { data } = action;

			let users = data;

			return Object.assign({}, state, {
				users: users
			});
		}

		case GET_CATEGORIES_STATS: {
			return state;
		}		

		case RECEIVED_CATEGORIES_STATS: {
			let { data } = action;

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

			let keyResults = removeId(data);

			return Object.assign({}, state, {
				keyResults: keyResults,
			});
		}

		case RECEIVED_ERROR: {
			console.log('ERROR in STATS');

			return state;
		}

		case SHOW_FILTERS: {

			const { showStatsFilters } = action;

			return Object.assign({}, state, {
				showStatsFilters
			});
		}

		case SET_FILTERS: {
			const { filters } = action;
			return Object.assign({}, state, {
				filters
			});
		}

		case RESET_FILTERS: {
			return Object.assign({}, state, {
				filters: {
					userId: null,
					dateFrom: null,
					dateTo: null,
					year: null,
					quarter: null
				}
			});
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