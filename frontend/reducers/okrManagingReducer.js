import users from '../components/mockData/users.js'
import { GET_OBJECTIVES_LIST, 
         OBJECTIVES_LIST_ERROR, 
         RECEIVED_OBJECTIVES_LIST,
         SEARCH_OBJECTIVE, 
         ACTIVE_OBJECTIVE,
         DELETE_OBJECTIVE_ERROR, 
         SOFT_DELETE_OBJECTIVE,
         RECEIVED_EDIT_OBJECTIVE_TEMPLATE, 
         EDIT_OBJECTIVE_TEMPLATE, 
         ACTIVE_KEY_RESULT,
         SOFT_DELETE_KEY_RESULT, 
         DELETE_KEY_RESULT_TEMPLATE, 
         RECEIVED_EDIT_KEY_RESULT,
         EDIT_KEY_RESULT, 
         RECEIVED_NEW_TEMPLATE, 
         CANCEL_EDIT_TEMPLATE, 
         RECEIVED_NEW_KEY_RESULT, 
         REMOVE_KEY_RESULT_FROM_TAMPLATE, 
         ADD_KEY_RESULT_TO_TEMPLATE,
         RECEIVED_DEFAULT_KEY_RESULT_ERROR, 
         RECEIVED_DEFAULT_KEY_RESULT } from '../actions/okrManagingActions.js'

import { ACTIVE_CATEGORY } from '../actions/categoriesActions.js'

const initialState = {
    objectives: [],
    waiting: true,
    visibleObjectives: [],
    keyResults: [''],
    index: 0,
    active: '',
    searchValue: '',
    editing: false,
    activeKeyResult: '',
    editingKeyResult: false
}

export default function okrManagingReducer(state = initialState, action) {
    
    switch (action.type) {             
        
        case GET_OBJECTIVES_LIST: 
            return Object.assign({}, state, {
                waiting: true,
                editing: false,
                editingKeyResult:false
            })

        case OBJECTIVES_LIST_ERROR:
            return Object.assign({}, state, {
                data
            })

        case RECEIVED_OBJECTIVES_LIST: {
            const {objectives} = action;
            return Object.assign({}, state, {
                objectives,
                visibleObjectives: objectives,
                waiting: false,
                searchValue: '',
            })
        }

        case SOFT_DELETE_OBJECTIVE: {
            const{id} = action;
            let visibleObjectives = JSON.parse(JSON.stringify(state.visibleObjectives));
            let objectives = JSON.parse(JSON.stringify(state.objectives));

            return Object.assign({}, state, {
                active: '',
                visibleObjectives: softdelete(visibleObjectives, id),
                objectives: softdelete(objectives, id),
                waiting: false,
                editing: false,
                editingKeyResult:false
            })
        }

        case DELETE_KEY_RESULT_TEMPLATE: {
       
            return Object.assign({}, state, {
                waiting: true
            })
        }

        case SOFT_DELETE_KEY_RESULT: {
            const{id} = action;
            let visibleObjectives = JSON.parse(JSON.stringify(state.visibleObjectives));
            let objectives = JSON.parse(JSON.stringify(state.objectives));

            return Object.assign({}, state, {
                visibleObjectives: softDeleteKeyResult(visibleObjectives, id),
                objectives: softDeleteKeyResult(objectives, id),
                waiting: false,
                editing: false,
                editingKeyResult:false
            })
        }        

        case SEARCH_OBJECTIVE: {
            const {searchValue} = action;
            return Object.assign({}, state, {
                active: '',
                visibleObjectives: updateVisibleItems(state.visibleObjectives, state.objectives, searchValue),
                editing: false,
                editingKeyResult: false
            })
        }

        case ACTIVE_CATEGORY: 
            return Object.assign({}, state, {
                editing: false,
                editingKeyResult:false
            })

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

        case CANCEL_EDIT_TEMPLATE: {
            return Object.assign({}, state, {
                editing: false,
                editingKeyResult: false
            })
        }
        
        case RECEIVED_EDIT_OBJECTIVE_TEMPLATE: {
            const { objective } = action;
            let visibleObjectives = JSON.parse(JSON.stringify(state.visibleObjectives));
            let objectives = JSON.parse(JSON.stringify(state.objectives));

            return Object.assign({}, state, {
                visibleObjectives: updateObjectiveList(visibleObjectives, objective),
                objectives: updateObjectiveList(objectives, objective),
                editing: false,
                editingKeyResult: false
            });
        }

        case RECEIVED_EDIT_KEY_RESULT: {
            const {keyResult, id} = action;
            let visibleObjectives = JSON.parse(JSON.stringify(state.visibleObjectives));
            let objectives = JSON.parse(JSON.stringify(state.objectives));

            return Object.assign({}, state, {
                visibleObjectives: updateKeyResult(visibleObjectives, keyResult, id),
                objectives: updateKeyResult(objectives, keyResult, id),
                editing: false,
                editingKeyResult: false
            })
        }
        case RECEIVED_NEW_TEMPLATE: {
            const {data} = action;
            

            var objective = {
                _id: data._id,
                category: data.category,
                createdAt: data.createdAt,
                creator: data.creator,
                defaultKeyResults: [], 
                description: data.description,
                isApproved: data.isApproved,
                isDeleted: data.isDeleted,
                keyResults: data.keyResults,
                title: data.title,
                updatedAt: data.updatedAt,
                used: data.used
            }

            return Object.assign({}, state, {
                visibleObjectives: addNewTemplate(state.visibleObjectives, objective),
                objectives: addNewTemplate(state.objectives, objective)
            })
        }
        
        case ADD_KEY_RESULT_TO_TEMPLATE : {
            const { keyResult } = action;
            return Object.assign({}, state, {
                keyResults: keyResult
            })
        }

        case REMOVE_KEY_RESULT_FROM_TAMPLATE : {
            const {index} = action;
            state.keyResults.splice(index, 1)
            return Object.assign({}, state, {
                keyResults:  state.keyResults
            })
        }
        
        case RECEIVED_NEW_KEY_RESULT : {

            const { data } = action;
            
            return Object.assign({}, state, {
                visibleObjectives: addKeyResult(state.visibleObjectives, data),
                objectives: addKeyResult(state.objectives, data)
            });
        }
             
        case RECEIVED_DEFAULT_KEY_RESULT : {
            let visibleObjectives = JSON.parse(JSON.stringify(state.visibleObjectives));
            let objectives = JSON.parse(JSON.stringify(state.objectives));
            const { data } = action;

            return Object.assign({}, state, {
                visibleObjectives: setDefaultKeyResult(visibleObjectives, data),
                objectives: setDefaultKeyResult(objectives, data)
            });
        }

        case RECEIVED_DEFAULT_KEY_RESULT_ERROR : {
            return state;
        }
        
        default: 
            return state;        
        
    }
}

function setDefaultKeyResult(oldObjectives, data) {
		let objectives = [].concat(oldObjectives);

		let index = objectives.findIndex((objective) => {
				return objective._id === data._id;
		});

		if(index !== -1) {
				objectives[index].defaultKeyResults = [].concat(data.defaultKeyResults);
		}

		return objectives;
}

function addKeyResult(objectives, keyResult) {
    objectives = JSON.parse(JSON.stringify(objectives));
    let objectiveIndex = objectives.findIndex((objective) => {
        return objective._id === keyResult.objectiveId;
    });

    if(objectiveIndex !== -1) {
        objectives[objectiveIndex].keyResults.push(keyResult);
    }

    return objectives
}

function addNewTemplate(visibleObjectives, objective){
    let objectives = JSON.parse(JSON.stringify(visibleObjectives));
    objectives.push(objective);
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

function updateObjectiveList(oldObjectives, objective) {
    let newObjectives = [].concat(oldObjectives);
    
    let index = newObjectives.findIndex((el) => {
    	return el._id === objective._id;
    });

    if(index !== -1) {
    	newObjectives[index].title = objective.title;
    	newObjectives[index].description = objective.description;
    	newObjectives[index].category = objective.category;
    	newObjectives[index].updatedAt = objective.updatedAt;
    }
    
    return newObjectives;
}

function updateVisibleItems(visibleObjectives, objectives, searchValue){
    let objectivesAfterInputFilter = [];
    let newObjectivesList = JSON.parse(JSON.stringify(objectives));
    if (searchValue === "") {
        objectivesAfterInputFilter = newObjectivesList;
    }
    else {
        for (let i = 0; i < newObjectivesList.length; i++) {
          /*  let title = newObjectivesList[i].title.split(' ');
            for (let j=0; j < title.length; j++)*/
                if (newObjectivesList[i].title.toUpperCase().search(searchValue.toUpperCase()) >= 0)
                    objectivesAfterInputFilter.push(newObjectivesList[i])
               /* break;*/
                
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
