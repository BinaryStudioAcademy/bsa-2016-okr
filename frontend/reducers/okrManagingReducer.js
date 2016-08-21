import users from '../components/mockData/users.js'
import {GET_OBJECTIVES_LIST, OBJECTIVES_LIST_ERROR, RECEIVED_OBJECTIVES_LIST} from '../actions/okrManagingActions.js'

const initialState = {
    objectives: [],
    waiting: true,
    active: 0,
    term: '',
    editing: false
}

export default function patentDetailsReducer(state = initialState, action) {
    
    switch (action.type) {             
        
         case GET_OBJECTIVES_LIST: {
            console.log("GET_OBJECTIVES_LIST");

            return Object.assign({}, state, {
                waiting: true
            })
        }

        case OBJECTIVES_LIST_ERROR: {
            
            const {data} = action;

            console.log("OBJECTIVES_LIST_ERROR");
            console.log(data);

            return Object.assign({}, state, {
                data
            })
        }

      case RECEIVED_OBJECTIVES_LIST: {

            const {objectives} = action;

            console.log("RECEIVED_OBJECTIVES_LIST");
            console.log(objectives);

            return Object.assign({}, state, {
                objectives,
                waiting: true   
            })
        }
        default: 
            return state;        
        
    }
}