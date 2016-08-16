import users from '../components/mockData/users.js'

const initialState = {
	user: users,
	searchValue: '',
	userItem: '',
	id: ''
}

export default function patentDetailsReducer(state = initialState, action) {
    
    switch (action.type) {

    	case 'SEND_REQUEST': {
        
        }

        case 'RECEIVED_DATA': {
            const { id } = action;
            console.log(id);
            return Object.assign({}, state, {
                id
            })               
        }
        case 'SEARCH_USER': {
            const { searchValue } = action
            return Object.assign({}, state, {
                searchValue
            })               
        }

        case 'TAKE_USER': {
            const { id } = action
            return Object.assign({}, state, {
                id
            })               
        }

        default: {
            return state;        
        }
    }
}