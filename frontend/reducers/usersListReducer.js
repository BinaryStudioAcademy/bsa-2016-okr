import users from '../components/mockData/users.js'
import {SEARCH_USER, GET_USERS_LIST, 
		USERS_LIST_ERROR, RECEIVED_USERS_LIST} from '../actions/usersListActions.js'

const initialState = {
	user: [],
	searchValue: '',
    waiting: true
}

export default function patentDetailsReducer(state = initialState, action) {
    
    switch (action.type) {

        case SEARCH_USER: 
            const { searchValue } = action
            return Object.assign({}, state, {
                searchValue
            })               
        
         case GET_USERS_LIST: {

            const {data} = action;

            console.log("GET_USERS_LIST");

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
function makeName()
{
    var name = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    var nameLength = 5 + Math.floor(Math.random()*5);

    for( var i = 0; i < nameLength; i++ )
        name += possible.charAt(Math.floor(Math.random() * possible.length));

    return name;
}