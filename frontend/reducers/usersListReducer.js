import users from '../components/mockData/users.js'
import {SEARCH_USER, GET_USERS_LIST,
		USERS_LIST_ERROR, RECEIVED_USERS_LIST,
	SORT_USERS, SORT_APPRENTICES} from '../actions/usersListActions.js'

const initialState = {
	user: [],
	myApprentices: [],
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

				case SORT_USERS: {

					 const {order} = action;
					 return Object.assign({}, state, {
							 user: sortByuserProgress(state.user, order)
					 })
			 }

			 case SORT_APPRENTICES: {

					const {order} = action;
					return Object.assign({}, state, {
							myApprentices: sortByuserProgress(state.myApprentices, order)
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
							data[i].userProgress = calculateProgress(data[i]);
							if (data[i].userId.mentor &&
								data[i].userId.mentor._id == myId) {
								myApprentices.push(data[i])
							} else {elseUsers.push(data[i])}
						}

            return Object.assign({}, state, {
                user: sortByuserProgress(elseUsers, "DESC"),
								myApprentices: sortByuserProgress(myApprentices, "DESC"),
                waiting: true,
                searchValue: ''
            })
        }
        default:
            return state;

    }
}

function calculateProgress(data) {
var sum = 0,
		count = 0,
		progress = 0;

let score = data.userObjectives.forEach((objective) => {
	let kr = objective.keyResults.forEach((item) => {
		sum = item.score + sum;
		count++;
	})
})

if(count == 0) {
	progress = 0;
} else {
	progress = Math.round(100*sum/count);
}
return progress;
}

function sortByuserProgress(data, type) {
	if(type === "ASC"){
		data.sort(function(a, b) {
			return a.userProgress - b.userProgress
		});
	} else if (type === "DESC") {
		data.sort(function(a, b) {
			return b.userProgress - a.userProgress
		});
	}
	return data;
}
