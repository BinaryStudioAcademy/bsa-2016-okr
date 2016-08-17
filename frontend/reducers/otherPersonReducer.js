import users from '../components/mockData/users.js'
import {GET_USER, RECEIVED_USER, SEARCH_USER, 
        GET_USERS_LIST, USERS_LIST_ERROR, RECEIVED_USERS_LIST} from '../actions/otherPersonActions.js'

const initialState = {
	user: [],
	searchValue: '',
    waiting: true
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
        case SEARCH_USER: 
            const { searchValue } = action
            return Object.assign({}, state, {
                searchValue
            })               
        
         case GET_USERS_LIST: {

            const {data} = action;

            console.log("GET_USERS_LIST");
            console.log(data);

            return Object.assign({}, state, {
                waiting: true
            })
        }

        case USERS_LIST_ERROR: {
            
            const {data} = action;

            console.log("USERS_LIST_ERROR");
            console.log(data);

            return Object.assign({}, state, {
                user
            })
        }

      case RECEIVED_USERS_LIST: {

            const {data} = action;

            console.log("RECEIVED_USERS_LIST");
            console.log(data);

            return Object.assign({}, state, {
                user: data,
                waiting: true   
            })
        }
        default: 
            return state;        
        
    }
}