import { isEmpty } from '../../backend/utils/ValidateService';
import { RECEIVED_ERROR, RECEIVED_ALL_CATEGORIES } from '../actions/categoriesActions';

const initialState = {
  list: []
};

export default function categoriesReducer(state = initialState, action = {}) {

	switch (action.type) {
	case RECEIVED_ERROR: {
		const { data } = action;
		return state;
	}

  case RECEIVED_ALL_CATEGORIES: {
		const { data } = action;

		return Object.assign({}, state, {
			list: data,
		});
	}

	default:
		return state;
	}
}
