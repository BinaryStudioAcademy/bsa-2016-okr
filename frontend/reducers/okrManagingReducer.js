import users from '../components/mockData/users.js'
import {GET_OBJECTIVES_LIST, OBJECTIVES_LIST_ERROR, RECEIVED_OBJECTIVES_LIST,
        SET_SORT , SEARCH_OBJECTIVE, ACTIVE_OBJECTIVE,
        DELETE_OBJECTIVE, DELETE_OBJECTIVE_ERROR, SOFT_DELETE_OBJECTIVE} from '../actions/okrManagingActions.js'

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

            return Object.assign({}, state, {
                waiting: true
            })
        }

        case OBJECTIVES_LIST_ERROR: {
            
            const {data} = action;

            return Object.assign({}, state, {
                data
            })
        }

      case RECEIVED_OBJECTIVES_LIST: {

            const {objectives} = action;

            return Object.assign({}, state, {
                active: 0,
                objectives,
                visibleObjectives: objectives,
                waiting: false   
            })
        }

        case DELETE_OBJECTIVE: {
       
            return Object.assign({}, state, {
                waiting: true
            })
        }

        case SOFT_DELETE_OBJECTIVE: {
            const{id} = action;
            let objectives = JSON.parse(JSON.stringify(state.visibleObjectives));

            return Object.assign({}, state, {
                active: 0,
                visibleObjectives: update(objectives, id),
                waiting: false   
            })
        }

        case SET_SORT: {
            const sort = action.sort;

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
function update(objectives, id) {
     for (let i = 0; i < objectives.length; i++) {

          if (objectives[i]._id == id) {
            objectives.splice(i, 1);

          }
    }

    return objectives;

}