import users from '../components/mockData/users.js'
import {GET_USER, RECEIVED_USER} from '../actions/otherPersonActions.js'

const initialState = {
    objectives: users,
	user: [],
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
                objectives: users,
                user: data,
                waiting: false
            })               
        }

        default: 
            return state;        
        
    }
}