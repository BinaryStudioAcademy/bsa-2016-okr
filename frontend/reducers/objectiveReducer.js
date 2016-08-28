import {
	GET_AUTOCOMPLETE_OBJECTIVES,
	RECEIVED_AUTOCOMPLETE_OBJECTIVES,
	SET_AUTOCOMPLETE_OBJECTIVES_SELECTED_ITEM,
	RECEIVED_ERROR,
} from '../actions/objectiveActions';

const initialState = {
	data: [],
	selectedItem: {}
};

export default function objectiveReducer(state = initialState, action = {}) {

	switch (action.type) {
	case RECEIVED_ERROR: {
		const {data} = action;

		console.log("RECEIVED_ERROR");
		console.log(data);

		return state;
	}

	case RECEIVED_AUTOCOMPLETE_OBJECTIVES: {
		const { data } = action;
		
		return Object.assign({}, state, {
			data
		});
	}

	case SET_AUTOCOMPLETE_OBJECTIVES_SELECTED_ITEM: {
		const { selectedItem } = action;
		
		return Object.assign({}, state, {
			selectedItem
		});
	}

	default:
		return state;
	}
}