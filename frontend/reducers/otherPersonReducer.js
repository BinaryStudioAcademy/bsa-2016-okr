import { GET_USER, RECEIVED_USER, CHANGE_TAB, CHANGE_YEAR } from '../actions/otherPersonActions.js'
import { currentYear, currentQuarter } from '../../backend/config/constants'

const initialState = {
	user: [],
	waiting: true,
	selectedTab: currentQuarter,
	selectedYear: currentYear
};

export default function otherPersonReducer(state = initialState, action) {
	
	switch (action.type) {
		case GET_USER: {
			return Object.assign({}, state, {
				waiting: true
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

		default: 
		return state;        
		
	}
}