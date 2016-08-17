import users from '../components/mockData/users.js'
import {SEND_REQUEST, RECEIVED_DATA, SEARCH_USER} from '../actions/otherPersonActions.js'

const initialState = {
	user: users,
	searchValue: '',
	id: '',
    waiting: true
}

export default function patentDetailsReducer(state = initialState, action) {
    
    switch (action.type) {
        case 'SEND_REQUEST': {
            return Object.assign({}, state, {
                waiting: true
            }) }
        case 'RECEIVED_DATA': {
            return Object.assign({}, state, {
                id: action.id,
                waiting: false
            })               
        }
        case 'SEARCH_USER': {
            const { searchValue } = action
            return Object.assign({}, state, {
                searchValue
            })               
        
}
        default: 
            return state;        
        
    }
}