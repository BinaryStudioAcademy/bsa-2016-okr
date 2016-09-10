import {
	RECEIVED_NOT_APPROVED_OBJECTIVES,
	GET_NOT_APPROVED_OBJECTIVES_REQUEST_ERROR,
	CLEAR_OBJ_APPROVE_ITEMS,
	RECEIVED_NOT_APPROVED_KEYS,
	GET_NOT_APPROVED_KEYS_REQUEST_ERROR,
	DELETE_ITEM_FROM_OBJ_APP_STATE,
	UPDATE_OBJECTIVE_TEMPLATE_ERROR,
	UPDATE_KEY_TEMPLATE_ERROR,
	SET_ACC_OBJ_FILTER
} from '../actions/acceptObjective';

const initialState = {
	items: [],
	visibleItems: [],
	countObject: ''
};

export default function accObjReducer(state = initialState, action) {
	
	switch (action.type) {

		case RECEIVED_NOT_APPROVED_KEYS: {

			const {data} = action;

			console.log(data);

			console.log(data);

			let items = JSON.parse(JSON.stringify(state.items)); 

			let key = {};

			key.type = "key result";

			for (let i = 0; i < data.length; i++) {
				
				key.title = data[i].title;
				key.description = data[i].objectiveId.description;
				key.category = data[i].objectiveId.category.title;
				key.userName = data[i].creator.userInfo.firstName + " " + data[i].creator.userInfo.lastName;
				key.id = data[i]._id;

				items.push(Object.assign({}, key));

			}

			return Object.assign({}, state, {
				items: items,
				visibleItems: items,
				countObject: items.length
			});

		}

		case SET_ACC_OBJ_FILTER: {
				
				const {value} = action;

				return Object.assign({}, state, {
					items: state.items,
					visibleItems: updateVisibleItems(state.items, value)
				})
		}

		case DELETE_ITEM_FROM_OBJ_APP_STATE: {
				
				const {id} = action;

				for (let i = 0; i < state.items.length; i++) {

					if (id === state.items[i].id) {

						state.items.splice(i, 1);

						break;
					}
				}

				return Object.assign({}, state, {
					recycleBinItems: state.items,
					visibleItems: state.items,
					countObject: state.items.length
				})
		}

		case RECEIVED_NOT_APPROVED_OBJECTIVES: {

			const {data} = action;

			console.log(RECEIVED_NOT_APPROVED_OBJECTIVES);

			let items = JSON.parse(JSON.stringify(state.items)); 
			
			let objective = {};

			objective.type = "objective";

			for (let i = 0; i < data.length; i++) {
				
				objective.title = data[i].title;
				objective.description = data[i].description;
				objective.category = data[i].category.title;
				objective.userName = data[i].creator.userInfo.firstName + " " + data[i].creator.userInfo.lastName;
				objective.id = data[i]._id;

				items.push(Object.assign({}, objective));

			}

			return Object.assign({}, state, {
				items: items,
				visibleItems: items,
				countObject: items.length
			});

		}


		case UPDATE_OBJECTIVE_TEMPLATE_ERROR: {

			console.log(UPDATE_OBJECTIVE_TEMPLATE_ERROR);

			return Object.assign({}, state);

		}

		case UPDATE_KEY_TEMPLATE_ERROR: {

			console.log(UPDATE_KEY_TEMPLATE_ERROR);

			return Object.assign({}, state);

		}

		case GET_NOT_APPROVED_KEYS_REQUEST_ERROR: {

			console.log(GET_NOT_APPROVED_KEYS_REQUEST_ERROR);

			return Object.assign({}, state);

		}


		case GET_NOT_APPROVED_OBJECTIVES_REQUEST_ERROR: {

			console.log(GET_NOT_APPROVED_OBJECTIVES_REQUEST_ERROR);

			return Object.assign({}, state);

		}

		case CLEAR_OBJ_APPROVE_ITEMS: {
			return Object.assign({}, state, {
				items: [],
				visibleItems: [],						
			});
		}

		default: {
			return state;
		}

	}
}


function updateVisibleItems(items, filter) {

	
	let visibleItems = [];

	console.log(filter);

	if (filter === "")
		visibleItems = JSON.parse(JSON.stringify(items));
	else 
	{
		for (let i = 0; i < items.length; i++) {

			if (items[i].userName.toUpperCase().indexOf(filter.toUpperCase()) === 0 ||
				items[i].title.toUpperCase().indexOf(filter.toUpperCase()) === 0 ||
				items[i].type.toUpperCase().indexOf(filter.toUpperCase()) === 0 ||
				items[i].category.toUpperCase().indexOf(filter.toUpperCase()) === 0) {
				visibleItems.push(items[i]);
			}
		}
    }

    console.log(visibleItems);


	return visibleItems;
}