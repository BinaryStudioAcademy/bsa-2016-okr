import { isEmpty } from '../../backend/utils/ValidateService';
import { RECEIVED_ERROR, 
				 RECEIVED_ALL_CATEGORIES,
				 RECIVED_DELETE_CATEGORY, 
				 DELETE_CATEGORY_ERROR,
				 ACTIVE_CATEGORY, 
				 CANCEL_EDIT_CATEGORY,
				 RECIVED_EDIT_CATEGORY, 
				 EDIT_CATEGORY_ERROR,
				 RECIVED_NEW_CATEGORY, 
				 RECIVED_NEW_CATEGORY_ERROR } from '../actions/categoriesActions';
				 
import { ACTIVE_OBJECTIVE, 
				 ACTIVE_KEY_RESULT } from '../actions/okrManagingActions.js';

const initialState = {
  list: [],
  edit: false,
  activeCategory: ''
};

export default function categoriesReducer(state = initialState, action = {}) {

	switch (action.type) {
	case RECEIVED_ERROR: {
		const { data } = action;
		return state;
	}

  case RECEIVED_ALL_CATEGORIES: {
		const { data } = action;
		return Object.assign({}, state, {
			list: data,
			edit: false,
			activeCategory: ''
		});
	}

	case ACTIVE_OBJECTIVE:
		return Object.assign({}, state, {
			edit: false,
			activeCategory: ''
		});

	case ACTIVE_KEY_RESULT: 
    return Object.assign({}, state, {
      edit: false
     })

	case DELETE_CATEGORY_ERROR: 
		return state;

  case RECIVED_DELETE_CATEGORY: {
		const { id = '', flag } = action;

		return Object.assign({}, state, {
			list: softDelete(state.list, id, flag),
		});
	}

	case ACTIVE_CATEGORY: {
  const {activeCategory} = action;

	  return Object.assign({}, state, {
	  	activeCategory,
	    edit: true           
	  })
  }

  case CANCEL_EDIT_CATEGORY: 
	  return Object.assign({}, state, {
	    edit: false
	  })

	case RECIVED_EDIT_CATEGORY: {
  const {data, reqBody} = action;

	  return Object.assign({}, state, {
	  	edit: false,
	  	list: update(state.list, data.category, reqBody)     
	  })
  }

  case EDIT_CATEGORY_ERROR: 
		return state;
	

	case RECIVED_NEW_CATEGORY: {
		const {data} = action;
		return Object.assign({}, state, {
			list: addCategory(state.list, data),
			edit: false
		})
	}

	case RECIVED_NEW_CATEGORY_ERROR: 
		return state;

	default:
		return state;
	}
}

function addCategory(list, data){
	let categories = JSON.parse(JSON.stringify(list));
	categories.push(data);
	return categories
}

function softDelete(oldCategories, id, flag) {
	let categories = [].concat(oldCategories);

	let index = categories.findIndex((category) => {
		return category._id === id;
	});

	if(index !== -1) {
		categories[index].isDeleted = flag;
	}

	return categories;
}

function update(list, id, category){
	let categories = JSON.parse(JSON.stringify(list));
	for (let i = 0; i < categories.length; i++) {
    if (categories[i]._id == id) {
      categories[i].title = category.title;
    }
  }
  return categories
}