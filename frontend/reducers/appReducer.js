import { ADD_REQUEST, REMOVE_REQUEST, INIT } from '../actions/appActions';

const initialState = {
  requestCount: 0,
  isLoading: false,
  isInitializing: true,
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

  	let showLoadingScreen = false;

  	if(state.isInitializing && newRequestCount !== 0) {
  		showLoadingScreen = true;
  	}
		
		return Object.assign({}, state, {
			requestCount: newRequestCount,
			isLoading: newRequestCount === 0 ? false : true,
			isInitializing: showLoadingScreen
		});
	}

	case INIT: {
		return Object.assign({}, state, {
			isInitializing: !!state.requestCount
		});
	}

	default:
		return state;
	}
}
