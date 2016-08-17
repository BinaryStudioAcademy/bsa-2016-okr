import users from '../components/mockData/users.js'

const initialState = {
	user: users,
	searchValue: '',
	id: '',
    waiting: true
}

export default function patentDetailsReducer(state = initialState, action) {
    
    switch (action.type) {
        case 'SEND_REQUEST' :
            return Object.assign({}, state, {
                waiting: true
            }) 
        case 'RECEIVED_DATA': 
            const { id } = action;
            return Object.assign({}, state, {
                id,
                waiting: false
            })               
        
        case 'SEARCH_USER': 
            const { searchValue } = action
            return Object.assign({}, state, {
                searchValue
            })               
        

        default: 
            return state;        
        
    }
}