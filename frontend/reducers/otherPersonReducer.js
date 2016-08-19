import users from '../components/mockData/users.js'
import {GET_USER, RECEIVED_USER, CHANGE_TAB, CHANGE_YEAR} from '../actions/otherPersonActions.js'

const initialState = {
	user: [],
    waiting: true,
    currentTab : 1,
    currentYear: 2016
}

export default function patentDetailsReducer(state = initialState, action) {
    
    switch (action.type) {
        case GET_USER: {
            console.log("GET_USER");
            
            return Object.assign({}, state, {
                waiting: true
            }) 
        }
        case RECEIVED_USER: {

            const {data} = action;
            console.log("RECEIVED_USER");
            console.log(data);
            return Object.assign({}, state, {
                user: data,
                waiting: false
            })               
        }

        case CHANGE_TAB: {
            const { currentTab } = action;

            return Object.assign({}, state, {
                currentTab: currentTab
            });
        }

        case CHANGE_YEAR: {
            const { currentYear } = action;

            return Object.assign({}, state, {
                currentYear
            });
        }

        default: 
            return state;        
        
    }
}