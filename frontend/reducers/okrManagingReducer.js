import users from '../components/mockData/users.js'
import {GET_OBJECTIVES_LIST, OBJECTIVES_LIST_ERROR, RECEIVED_OBJECTIVES_LIST,
        SET_SORT , SEARCH_OBJECTIVE, ACTIVE_OBJECTIVE,
        DELETE_OBJECTIVE, DELETE_OBJECTIVE_ERROR, SOFT_DELETE_OBJECTIVE,
        RECIVED_EDIT_OBJECTIVE_TEMPLATE, EDIT_OBJECTIVE_TEMPLATE, ACTIVE_KEY_RESULT,
        SOFT_DELETE_KEY_RESULT, DELETE_KEY_RESULT_TEMPLATE, RECIVED_EDIT_KEY_RESULT,
        EDIT_KEY_RESULT, RECEIVED_NEW_TEMPLATE} from '../actions/okrManagingActions.js'

const initialState = {
    objectives: [],
    waiting: true,
    visibleObjectives: [],
    active: '',
    searchValue: '',
    editing: false,
    activeKeyResult: '',
    editingKeyResult: false
}

export default function okrManagingReducer(state = initialState, action) {
    
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
                active: '',
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
                active: '',
                visibleObjectives: softdelete(objectives, id),
                waiting: false,
                editing: false
            })
        }

        case DELETE_KEY_RESULT_TEMPLATE: {
       
            return Object.assign({}, state, {
                waiting: true
            })
        }

        case SOFT_DELETE_KEY_RESULT: {
            const{id} = action;
            let objectives = JSON.parse(JSON.stringify(state.visibleObjectives));

            return Object.assign({}, state, {
                visibleObjectives: softDeleteKeyResult(objectives, id),
                waiting: false,
                editing: false,
                editingKeyResult:false
            })
        }        
        case SET_SORT: {
            const sort = action.sort;

            return Object.assign({}, state, {
                sort
            })
        }

        case SEARCH_OBJECTIVE: {
            const {searchValue} = action;
            return Object.assign({}, state, {
                active: '',
                visibleObjectives: updateVisibleItems(state.visibleObjectives, state.objectives, searchValue)

            })
        }

        case ACTIVE_OBJECTIVE: {
            const {active} = action;

            return Object.assign({}, state, {
                active,
                editing: true,
                editingKeyResult: false
            })
        }
        case ACTIVE_KEY_RESULT: {
            const {activeKeyResult} = action;

            return Object.assign({}, state, {
                activeKeyResult,
                editingKeyResult: true,
                editing: false
            })
        }

        case RECIVED_EDIT_OBJECTIVE_TEMPLATE: {
            const {objective, id} = action;
            let objectives = JSON.parse(JSON.stringify(state.visibleObjectives));

            return Object.assign({}, state, {
                visibleObjectives: update(objectives, objective, id),
                editing: false,
                editingKeyResult: false
            })
        }

        case RECIVED_EDIT_KEY_RESULT: {
            const {keyResult, id} = action;
            let objectives = JSON.parse(JSON.stringify(state.visibleObjectives));

            return Object.assign({}, state, {
                visibleObjectives: updateKeyResult(objectives, keyResult, id),
                editing: false,
                editingKeyResult: false
            })
        }
        case RECEIVED_NEW_TEMPLATE: {
            const {data} = action;
            

            var objective ={
                _id: data._id,
                category: data.category,
                createdAt: data.createdAt,
                creator: data.creator,
                defaultKeyResults: data.defaultKeyResults, 
                description: data.description,
                isApproved: data.isApproved,
                isDeleted: data.isDeleted,
                keyResults: data.defaultKeyResults,
                title: data.title,
                updatedAt: data.updatedAt,
                used: data.used
            }

            return Object.assign({}, state, {
                visibleObjectives: addNewTemplate(state.visibleObjectives, objective),
                objectives: addNewTemplate(state.objectives, objective)
            })
        }
        
        default: 
            return state;        
        
    }
}

function addNewTemplate(visibleObjectives, objective){
    let objectives = JSON.parse(JSON.stringify(visibleObjectives));
    objectives.push(objective)
    console.log(objectives)
    return objectives;
}
function updateKeyResult(objectives, keyResult, id){
    for (let i = 0; i < objectives.length; i++) 
        for (let j = 0; j < objectives[i].keyResults.length; j++){
            if (objectives[i].keyResults[j]._id == id) {
                objectives[i].keyResults[j].title = keyResult.title;
                objectives[i].keyResults[j].difficulty = keyResult.difficulty;
          }
    }
    return objectives;
}
function update(objectives, objective, id){
    for (let i = 0; i < objectives.length; i++) {
        if (objectives[i]._id == id) {
            objectives[i].title =objective.title;
            objectives[i].description =objective.description;
            objectives[i].category =objective.category;
          }
    }
    return objectives
}
function updateVisibleItems(visibleObjectives, objectives, searchValue){
    let objectivesAfterInputFilter = [];
    let newObjectivesList = JSON.parse(JSON.stringify(objectives));
    if (searchValue === "") {
        objectivesAfterInputFilter = newObjectivesList;
    }
    else {
        for (let i = 0; i < newObjectivesList.length; i++) {
            if (newObjectivesList[i].title.toUpperCase().indexOf(searchValue.toUpperCase()) !== -1) {
                objectivesAfterInputFilter.push(newObjectivesList[i])
            }
        }
    }
    return objectivesAfterInputFilter;
}
function softdelete(objectives, id) {
     for (let i = 0; i < objectives.length; i++) {

          if (objectives[i]._id == id) {
            objectives.splice(i, 1);

          }
    }

    return objectives;
}

function softDeleteKeyResult(objectives, id) {
    for (let i = 0; i < objectives.length; i++) 
        for (let j = 0; j < objectives[i].keyResults.length; j++){
            if (objectives[i].keyResults[j]._id == id) {
                objectives[i].keyResults.splice(j, 1);
          }
    }
    return objectives;
}
