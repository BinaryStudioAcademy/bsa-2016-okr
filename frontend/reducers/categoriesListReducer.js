import { isEmpty } from '../../backend/utils/ValidateService';

const initialState = {
  categories: {}
};

export default function categoriesReducer(state = initialState, action = {}) {

	switch (action.type) {
		case "RECEIVED_ERROR": {
			const { data } = action;
			return Object.assign({}, state, {
				categories: state.categories
			});
		}

    case "RECEIVED_ALL_CATEGORIES": {
			const { data } = action;
			return Object.assign({}, state, {
				categories: isEmpty(data) ? categories : data
			});
		}

		default: {
			return state;
		}
	}
}
