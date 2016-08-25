import { ADD_REQUEST, REMOVE_REQUEST } from '../actions/appActions';

const initialState = {
  requestCount: 0,
  isLoading: false
};

export default function appReducer(state = initialState, action = {}) {

	switch (action.type) {
	case ADD_REQUEST: {
		let newRequestCount = state.requestCount + 1;

		return Object.assign({}, state, {
			requestCount: newRequestCount,
			isLoading: true
		});
	}

  case REMOVE_REQUEST: {

  	let newRequestCount;

  	if(state.requestCount < 1) {
  		newRequestCount = 0;
  	} else {
	  	newRequestCount = state.requestCount - 1;
  	}
		
		return Object.assign({}, state, {
			requestCount: newRequestCount,
			isLoading: newRequestCount === 0 ? false : true
		});
	}

	default:
		return state;
	}
}
