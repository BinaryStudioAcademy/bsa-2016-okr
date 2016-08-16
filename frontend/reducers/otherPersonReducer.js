import users from '../components/mockData/users.js'

const initialState = {
	user: users,
	searchValue: '',
	id: ''
}

export default function patentDetailsReducer(state = initialState, action) {
    
    switch (action.type) {

        case 'RECEIVED_DATA': {
            const { id } = action;
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

        default: {
            return state;        
        }
    }
}