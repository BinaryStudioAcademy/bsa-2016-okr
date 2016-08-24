import {
	GET_AUTOCOMPLETE_KEY_RESULTS,
	SET_AUTOCOMPLETE_KEY_RESULTS_SELECTED_ITEM,
	RECEIVED_ERROR,
	RECEIVED_KEY_RESULTS } from '../actions/keyResultActions';

const initialState = {
	data: [],
	selectedItem: {}
};

export default function keyResultReducer(state = initialState, action = {}) {

	switch (action.type) {
		case RECEIVED_ERROR:
		{

			const {data} = action;

			console.log("RECEIVED_ERROR");
			console.log(data);

			return Object.assign({}, state, {
				data
			})
		}

		case RECEIVED_KEY_RESULTS:
		{

			const {data} = action;
			return Object.assign({}, state, {
				data
			})
		}

		case SET_AUTOCOMPLETE_KEY_RESULTS_SELECTED_ITEM:
		{

			const {selectedItem} = action;
			return Object.assign({}, state, {
				selectedItem
			})
		}

		default:
		{
			return state;
		}
	}
}
