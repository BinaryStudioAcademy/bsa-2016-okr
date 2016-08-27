import users from '../components/mockData/users.js'
import {SEARCH_USER, GET_USERS_LIST,
		USERS_LIST_ERROR, RECEIVED_USERS_LIST} from '../actions/usersListActions.js'

const initialState = {
	user: [],
	searchValue: '',
    waiting: true
}

export default function usersListReducer(state = initialState, action) {

    switch (action.type) {

        case SEARCH_USER:
            const { searchValue } = action
            return Object.assign({}, state, {
                searchValue
            })

         case GET_USERS_LIST: {

            const {data} = action;
            return Object.assign({}, state, {
                waiting: true
            })
        }

        case USERS_LIST_ERROR: {

            const {data} = action;

            return Object.assign({}, state, {
                user: []
            })
        }

      case RECEIVED_USERS_LIST: {

            const {data, myId} = action;

						var myApprentices = [];
						var elseUsers = [];
						for (let i = 0; i < data.length; i++) {
							if (data[i].userId.mentor &&
								data[i].userId.mentor._id == myId) {
								myApprentices.push(data[i])
							} else {elseUsers.push(data[i])}
						}
						var userList = myApprentices.concat(elseUsers);

            return Object.assign({}, state, {
                user: userList,
                waiting: true
            })
        }
        default:
            return state;

    }
}
