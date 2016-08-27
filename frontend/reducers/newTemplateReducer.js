import { RECEIVED_NEW_TEMPLATE } from '../actions/newTemplateActions.js'

const initialState = {
	
}

export default function myObjectivesReducer(state = initialState, action = {}) {

	switch (action.type) {

		case RECEIVED_NEW_TEMPLATE: {

			return Object.assign({}, state, {
			});
		}

		default: {
			return state;
		}
	}
}