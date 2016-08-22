import users from '../components/mockData/users.js'
import {GET_OBJECTIVES_LIST, OBJECTIVES_LIST_ERROR, RECEIVED_OBJECTIVES_LIST,
        SET_SORT , SEARCH_OBJECTIVE, ACTIVE_OBJECTIVE,
        DELETE_OBJECTIVE, DELETE_OBJECTIVE_ERROR, RECEIVED_DELETE_OBJECTIVE} from '../actions/okrManagingActions.js'

const initialState = {
    objectives: [],
    waiting: true,
    visibleObjectives: [],
    active: 0,
    term: '',
    sort: '',
    searchValue: '',
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
                active: 0,
                objectives,
                visibleObjectives: objectives,
                waiting: true   
            })
        }

        case DELETE_OBJECTIVE: {
            console.log("DELETE_OBJECTIVE");

            return Object.assign({}, state, {
                waiting: true
            })
        }

        case RECEIVED_DELETE_OBJECTIVE: {

            const {id} = action;

            console.log("RECEIVED_DELETE_OBJECTIVE");

            return Object.assign({}, state, {
                active: 0,
                visibleObjectives: objectives,
                waiting: true   
            })
        }


        case SET_SORT: {
            const sort = action.sort;
            console.log(sort);

            return Object.assign({}, state, {
                sort
            })
        }
        case ACTIVE_OBJECTIVE: {
            const {active} = action;

            return Object.assign({}, state, {
                active
            })
        }
        case SEARCH_OBJECTIVE: {
            const {searchValue} = action;
            return Object.assign({}, state, {
                active: 0,
                visibleObjectives: updateVisibleItems(state.visibleObjectives, state.objectives, searchValue)

            })
        }

        default: 
            return state;        
        
    }
}

function updateVisibleItems(visibleObjectives, objectives, searchValue){
    let objectivesAfterInputFilter = [];

    if (searchValue === "") {
        objectivesAfterInputFilter = objectives;
    }
    else {
        for (let i = 0; i < objectives.length; i++) {
            if (objectives[i].title.toUpperCase().indexOf(searchValue.toUpperCase()) !== -1) {
                objectivesAfterInputFilter.push(objectives[i])
            }
        }
    }
    return objectivesAfterInputFilter;
}