import users from '../components/mockData/users.js'

const initialState = {
	user: users,
	searchValue: '',
	userItem: ''
}
export default function patentDetailsReducer(state = initialState, action) {
    
    switch (action.type) {


        case 'SEARCH_USER': {
            const { searchValue } = action
            return Object.assign({}, state, {
                searchValue
            })               
        }

        case 'TAKE_USER': {
            const { userItem } = action
            return Object.assign({}, state, {
                userItem
            })               
        }

        default: {
            return state;        
        }
    }
}