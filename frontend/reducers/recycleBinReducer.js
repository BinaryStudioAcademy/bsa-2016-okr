import {
	SEARCH_OBJECTS,
	CLEAR,
	UPDATE_ALL,
	SET_USER_NAME,
	DELETE_ITEM_FROM_STATE,
	UPDATE_USER_OBJECTIVES_REQUEST,
	UPDATE_USER_OBJECTIVES_REQUEST_ERROR,
	GET_USER_OBJECTIVES_REQUEST,
	RECEIVED_USER_OBJECTIVES,
	GET_USER_OBJECTIVES_REQUEST_ERROR,
	GET_USER_DELETED_OBJECTIVES_REQUEST,
	RECEIVED_USER_DELETED_OBJECTIVES,
	GET_USER_DELETED_OBJECTIVES_REQUEST_ERROR,
	CATEGORY_TYPE_FILTER,
	SET_SORTING_BY_DATE,
	SET_SORTING_BY_TITLE,
	SET_OBJECTIVE_TYPE,
	SET_CATEGORY_TYPE,
	SET_KEY_TYPE,
	SHOW_FILTERS,
	SET_RECYCLE_BIN_FILTER_DATE_FROM,
	SET_RECYCLE_BIN_FILTER_DATE_TO,
    GET_OBJECTIVE_TEMPLATES_REQUEST,
	RECEIVED_OBJECTIVE_TEMPLATES,
	GET_OBJECTIVE_TEMPLATES_REQUEST_ERROR,
	GET_KEY_RESULTS_TEMPLATES_REQUEST,
	RECEIVED_KEY_RESULTS_TEMPLATES,
	GET_KEY_RESULTS_TEMPLATES_REQUEST_ERROR, 
	UPDATE_TEMPLATE_OBJECTIVE_REQUEST,
	UPDATE_TEMPLATE_OBJECTIVE_REQUEST_ERROR,
    UPDATE_TEMPLATE_KEY_RESULT_REQUEST,
    UPDATE_TEMPLATE_KEY_RESULT_REQUEST_ERROR,
    GET_DELETED_CATEGORIES_REQUEST,
    RECEIVED_DELETED_CATEGORIES,
    GET_DELETED_CATEGORIES_REQUEST_ERROR,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_REQUEST_ERROR
} from '../actions/recycleBinActions';

import {NOT_SORTED, SORTED_ASC, SORTED_DESC} from "../../backend/config/constants"; 

const initialState = {
	recycleBinItems: [],
	searchValue: '',
	objectiveForUpdate: [],
	showRecycleBinFilters: false,
	visibleItems: [],
	setRecycleBinFilterDateFrom: '',
	setRecycleBinFilterDateTo: '',
	usersNames: [],
	objectiveType: true,
	keyType: true,
	sortByDate: SORTED_ASC,
	sortByTitle: NOT_SORTED,
	categoryType: true,
	categoryOrTypeFilter: "",
	userName: ""
};

export default function recBynReducer(state = initialState, action) {
	
	switch (action.type) {

		case RECEIVED_DELETED_CATEGORIES: {

			const {data} = action;

			let newRecycleBinItems = JSON.parse(JSON.stringify(state.recycleBinItems));  

			let category = {};

			category.type = "category";
			category.category = "categories";
			category.description = "category";

			for (let i = 0; i < data.length; i++) {

				category.id = data[i]._id;
				
				category.title = data[i].title;

				if (data[i].deletedBy == null) 
					category.deletedBy = "default";
				else
					category.deletedBy = data[i].deletedBy.userInfo.firstName + " " + data[i].deletedBy.userInfo.lastName;

				if (data[i].deletedDate == null)
					category.deletedDate = "2016-07-22T10:51:12.643Z";
				else
					category.deletedDate = data[i].deletedDate;

				let copy = Object.assign({}, category);

				newRecycleBinItems.push(copy);

			}

			return Object.assign({}, state, {
				recycleBinItems: newRecycleBinItems,
				visibleItems: updateVisibleItems(newRecycleBinItems, state.setRecycleBinFilterDateFrom,
					state.setRecycleBinFilterDateTo, state.categoryOrTypeFilter, state.objectiveType, 
					state.keyType, state.sortByDate, state.sortByTitle, state.categoryType, state.userName),
				usersNames: getAllNames(newRecycleBinItems)

			});
		}

		case RECEIVED_OBJECTIVE_TEMPLATES: {

			const {data} = action;

			let newRecycleBinItems = JSON.parse(JSON.stringify(state.recycleBinItems));  

			let objective = {};

			objective.type = "objective";

			for (let i = 0; i < data.length; i++) {
				
				objective.id = data[i]._id;
				objective.category = data[i].category.title;
				objective.title = data[i].title;
				objective.description = data[i].description;

				if (data[i].deletedBy == null) 
					objective.deletedBy = "default";
				else
					objective.deletedBy = data[i].deletedBy.userInfo.firstName + " " + data[i].deletedBy.userInfo.lastName;

				if (data[i].deletedDate == null)
					objective.deletedDate = "2016-07-22T10:51:12.643Z";
				else
					objective.deletedDate = data[i].deletedDate;

				let copy = Object.assign({}, objective);

				newRecycleBinItems.push(copy);

			}

		
			return Object.assign({}, state, {
				recycleBinItems: newRecycleBinItems,
				visibleItems: updateVisibleItems(newRecycleBinItems, state.setRecycleBinFilterDateFrom,
					state.setRecycleBinFilterDateTo, state.categoryOrTypeFilter, state.objectiveType, 
					state.keyType, state.sortByDate, state.sortByTitle, state.categoryType, state.userName),
				usersNames: getAllNames(newRecycleBinItems)
			});

		}


		case RECEIVED_KEY_RESULTS_TEMPLATES: {

			const {data} = action;

			let newRecycleBinItems = JSON.parse(JSON.stringify(state.recycleBinItems));  

			let key = {};

			key.type = "key result";

			for (let i = 0; i < data.length; i++) {
				
				key.id = data[i]._id;
				key.category = data[i].objectiveId.category.title;
				key.title = data[i].title;
				key.description = data[i].objectiveId.description;


				if (data[i].deletedBy == null) 
					key.deletedBy = "default";
				else
					key.deletedBy = data[i].deletedBy.userInfo.firstName + " " + data[i].deletedBy.userInfo.lastName;

				if (data[i].deletedDate == null)
					key.deletedDate = "2016-07-22T10:51:12.643Z";
				else
					key.deletedDate = data[i].deletedDate;

				let copy = Object.assign({}, key);

				newRecycleBinItems.push(copy);
			}


			return Object.assign({}, state, {
				recycleBinItems: newRecycleBinItems,
				visibleItems: updateVisibleItems(newRecycleBinItems, state.setRecycleBinFilterDateFrom,
					state.setRecycleBinFilterDateTo, state.categoryOrTypeFilter, state.objectiveType, 
					state.keyType, state.sortByDate, state.sortByTitle, state.categoryType, state.userName),
				usersNames: getAllNames(newRecycleBinItems)

			});

		}

		case CLEAR: {
			return Object.assign({}, state, {
				recycleBinItems: [],
				searchValue: '',
				objectiveForUpdate: [],
				showRecycleBinFilters: false,
				visibleItems: [],
				setRecycleBinFilterDateFrom: '',
				setRecycleBinFilterDateTo: '',
				usersNames: [],
				objectiveType: true,
				keyType: true,
				sortByDate: SORTED_ASC,
				sortByTitle: NOT_SORTED,
				categoryType: true,
				categoryOrTypeFilter: "",
				userName: ""								
			});
		}

		case RECEIVED_USER_OBJECTIVES: {

			const {data} = action;

				let newRecycleBinItems = JSON.parse(JSON.stringify(state.recycleBinItems));  


				let objectiveForUpdate = [];		

				let key = {};

				key.type = "key result";

				for (let i = 0; i < data.length; i++) {
					
					if (data[i].isDeleted === true)
						continue;

					for (let j = 0; j < data[i].keyResults.length; j++) {

						if (data[i].keyResults[j].isDeleted) {

							key.id = data[i].keyResults[j]._id;

							key.category = data[i].templateId.category.title;

							key.title = data[i].keyResults[j].templateId.title;

							key.description = data[i].templateId.description;

							if (data[i].keyResults[j].deletedBy == null) 
								key.deletedBy = "default";
							else
								key.deletedBy = data[i].keyResults[j].deletedBy.userInfo.firstName + " " + data[i].keyResults[j].deletedBy.userInfo.lastName;

							if (data[i].keyResults[j].deletedDate == null)
								key.deletedDate = "2016-07-22T10:51:12.643Z";
							else
								key.deletedDate = data[i].keyResults[j].deletedDate;

							let copy = Object.assign({}, key);

							newRecycleBinItems.push(copy);

							objectiveForUpdate.push(data[i]);
						}

					}
				}

				return Object.assign({}, state, {
					recycleBinItems: newRecycleBinItems,
					visibleItems: updateVisibleItems(newRecycleBinItems, state.setRecycleBinFilterDateFrom,
						state.setRecycleBinFilterDateTo, state.categoryOrTypeFilter, state.objectiveType, 
						state.keyType, state.sortByDate, state.sortByTitle, state.categoryType, state.userName),
					usersNames: getAllNames(newRecycleBinItems),
					objectiveForUpdate: objectiveForUpdate
				})
			}

			case RECEIVED_USER_DELETED_OBJECTIVES: {

				const {data} = action;

				let newRecycleBinItems = JSON.parse(JSON.stringify(initialState.recycleBinItems));

				let objective = {};

				objective.type = "objective";

				for (let i = 0; i < data.length; i++) {
					
					objective.id = data[i]._id;
					objective.category = data[i].templateId.category.title;
					objective.title = data[i].templateId.title;
					objective.description = data[i].templateId.description;

					if (data[i].deletedBy == null) 
						objective.deletedBy = "default";
					else
						objective.deletedBy = data[i].deletedBy.userInfo.firstName + " " + data[i].deletedBy.userInfo.lastName;

					if (data[i].deletedDate == null)
						objective.deletedDate = "2016-07-22T10:51:12.643Z";
					else
						objective.deletedDate = data[i].deletedDate;

					let copy = Object.assign({}, objective);

					newRecycleBinItems.push(copy);

				}

				return Object.assign({}, state, {
					recycleBinItems: newRecycleBinItems,
					visibleItems: updateVisibleItems(newRecycleBinItems, state.setRecycleBinFilterDateFrom,
						state.setRecycleBinFilterDateTo, state.categoryOrTypeFilter, state.objectiveType, 
						state.keyType, state.sortByDate, state.sortByTitle, state.categoryType, state.userName),
					usersNames: getAllNames(newRecycleBinItems)

				})
			}

			case UPDATE_ALL: {

				const {dateFrom, dateTo, categoryOrTypeFilter, objectiveType, keyType, sortByDate, categoryType, userName, isSortingUsed} = action;

				return Object.assign({}, state, {
					setRecycleBinFilterDateFrom: dateFrom,
					setRecycleBinFilterDateTo: dateTo,
					categoryOrTypeFilter: categoryOrTypeFilter,
					objectiveType: objectiveType,
					keyType: keyType,
					sortByDate: sortByDate,
					categoryType: categoryType,
					userName: userName,
					isSortingUsed: isSortingUsed,
					visibleItems: updateVisibleItems(state.recycleBinItems, dateFrom,
						dateTo, categoryOrTypeFilter, objectiveType, 
						keyType, sortByDate, state.sortByTitle,  categoryType, userName)
				})
			}

			case DELETE_ITEM_FROM_STATE: {
				
				const {id} = action;

				for (let i = 0; i < state.recycleBinItems.length; i++) {

					if (id === state.recycleBinItems[i].id) {

						state.recycleBinItems.splice(i, 1);
						break;
					}
				}

				return Object.assign({}, state, {
					recycleBinItems: state.recycleBinItems,
					visibleItems: updateVisibleItems(state.recycleBinItems, state.setRecycleBinFilterDateFrom,
						state.setRecycleBinFilterDateTo, state.categoryOrTypeFilter, state.objectiveType, 
						state.keyType, state.sortByDate, state.sortByTitle,  state.categoryType, state.userName)
				})
			}

			case SEARCH_OBJECTS: {
				const {searchValue} = action;
				return Object.assign({}, state, {
					searchValue
				})
			}

			case SET_USER_NAME: {

				const {value} = action;

				return Object.assign({}, state, {
					userName: value,
					visibleItems: updateVisibleItems(state.recycleBinItems, state.setRecycleBinFilterDateFrom,
						state.setRecycleBinFilterDateTo, state.categoryOrTypeFilter, state.objectiveType, 
						state.keyType, state.sortByDate, state.sortByTitle, state.categoryType, value)
				})
			}

			case CATEGORY_TYPE_FILTER: {

				const {value} = action;

				return Object.assign({}, state, {
					categoryOrTypeFilter: value,
					visibleItems: updateVisibleItems(state.recycleBinItems, state.setRecycleBinFilterDateFrom,
						state.setRecycleBinFilterDateTo, value, state.objectiveType, state.keyType, 
						state.sortByDate, state.sortByTitle, state.categoryType, state.userName)
				})
			}

			case SET_CATEGORY_TYPE: {

				const {value} = action;

				return Object.assign({}, state, {
					categoryType: value,
					visibleItems: updateVisibleItems(state.recycleBinItems, state.setRecycleBinFilterDateFrom,
						state.setRecycleBinFilterDateTo, state.categoryOrTypeFilter, state.objectiveType, 
						state.keyType, state.sortByDate, state.sortByTitle, value, state.userName)
				})
			}

			case SET_OBJECTIVE_TYPE: {

				const {value} = action;

				return Object.assign({}, state, {
					objectiveType: value,
					visibleItems: updateVisibleItems(state.recycleBinItems, state.setRecycleBinFilterDateFrom,
						state.setRecycleBinFilterDateTo, state.categoryOrTypeFilter, value, state.keyType, 
						state.sortByDate, state.sortByTitle, state.categoryType, state.userName)
				})
			}

			case SET_KEY_TYPE: {

				const {value} = action;

				return Object.assign({}, state, {
					keyType: value,
					visibleItems: updateVisibleItems(state.recycleBinItems, state.setRecycleBinFilterDateFrom, 
						state.setRecycleBinFilterDateTo, state.categoryOrTypeFilter, 
						state.objectiveType, value, state.sortByDate, state.sortByTitle,  state.categoryType, state.userName)
				})
			}

			case SET_SORTING_BY_TITLE: {

				const {value} = action;

				return Object.assign({}, state, {
					sortByTitle: value,
					visibleItems: updateVisibleItems(state.recycleBinItems, state.setRecycleBinFilterDateFrom,
						state.setRecycleBinFilterDateTo, state.categoryOrTypeFilter,
						state.objectiveType, state.keyType, state.sortByDate, value,  state.categoryType, state.userName)
				})
			}

			case SET_SORTING_BY_DATE: {

				const {value} = action;

				return Object.assign({}, state, {
					sortByDate: value,
					visibleItems: updateVisibleItems(state.recycleBinItems, state.setRecycleBinFilterDateFrom,
						state.setRecycleBinFilterDateTo, state.categoryOrTypeFilter,
						state.objectiveType, state.keyType, value, state.sortByTitle, state.categoryType, state.userName)
				})
			}

			case SHOW_FILTERS: {

				const {showRecycleBinFilters} = action;

				return Object.assign({}, state, {
					showRecycleBinFilters
				})
			}

			case SET_RECYCLE_BIN_FILTER_DATE_FROM: {

				const {setRecycleBinFilterDateFrom} = action;

				return Object.assign({}, state, {
					setRecycleBinFilterDateFrom,
					visibleItems: updateVisibleItems(state.recycleBinItems, setRecycleBinFilterDateFrom, state.setRecycleBinFilterDateTo,
						state.categoryOrTypeFilter, state.objectiveType, state.keyType, state.sortByDate, state.sortByTitle,
						  state.categoryType, state.userName)
				})
			}

			case SET_RECYCLE_BIN_FILTER_DATE_TO: {

				const {setRecycleBinFilterDateTo} = action;

				return Object.assign({}, state, {
					setRecycleBinFilterDateTo,
					visibleItems: updateVisibleItems(state.recycleBinItems, state.setRecycleBinFilterDateFrom, setRecycleBinFilterDateTo,
						state.categoryOrTypeFilter, state.objectiveType, state.keyType, state.sortByDate, state.sortByTitle, 
						 state.categoryType, state.userName)
				})
			}

			case GET_USER_OBJECTIVES_REQUEST_ERROR: {
				
				console.log(GET_USER_OBJECTIVES_REQUEST_ERROR);

				return Object.assign({}, state);
			}

			case GET_USER_DELETED_OBJECTIVES_REQUEST_ERROR: {

				console.log(GET_USER_DELETED_OBJECTIVES_REQUEST_ERROR);

				return Object.assign({}, state);
			}

			case UPDATE_USER_OBJECTIVES_REQUEST_ERROR: {

				console.log(UPDATE_USER_OBJECTIVES_REQUEST_ERROR);

				return Object.assign({}, state);
			}


			case GET_OBJECTIVE_TEMPLATES_REQUEST_ERROR: {

				console.log(GET_OBJECTIVE_TEMPLATES_REQUEST_ERROR);

				return Object.assign({}, state);
			}


			case GET_KEY_RESULTS_TEMPLATES_REQUEST_ERROR: {

				console.log(GET_KEY_RESULTS_TEMPLATES_REQUEST_ERROR);

				return Object.assign({}, state);
			}

			case UPDATE_TEMPLATE_OBJECTIVE_REQUEST_ERROR: {

				console.log(UPDATE_TEMPLATE_OBJECTIVE_REQUEST_ERROR);

				return Object.assign({}, state);
			}

			case UPDATE_TEMPLATE_KEY_RESULT_REQUEST_ERROR: {

				console.log(UPDATE_TEMPLATE_KEY_RESULT_REQUEST_ERROR);

				return Object.assign({}, state);
			}

			case GET_DELETED_CATEGORIES_REQUEST_ERROR: {

				console.log(GET_DELETED_CATEGORIES_REQUEST_ERROR);

				return Object.assign({}, state);
			}

			case UPDATE_CATEGORY_REQUEST_ERROR: {

				console.log(UPDATE_CATEGORY_REQUEST_ERROR);

				return Object.assign({}, state);
			}

			default: {
				return state;
			}
		}
	}

	function getAllNames(items) {

		let names = [];
		let found;

		for (let i = 0; i < items.length; i++) {

			found = false;

			for (let j = 0; j < names.length; j++) {
				if (names[j].name.indexOf(items[i].deletedBy) != -1) {
					found = true;
				}
			}

			if (!found) {
				names.push({name: items[i].deletedBy, id: names.length});
			}
		}

		return names;

	}

function updateVisibleItems(items, dateFrom, dateTo, categoryOrTypeFilter, objectiveType, keyType, sortByDate, sortByTitle, categoryType, userName) {

	let initVisibleItems = filterDate(items, dateFrom, dateTo);

	let itemsAfterInputFilter = [];

	if (categoryOrTypeFilter === "") {
		itemsAfterInputFilter = initVisibleItems;
	}
		else {

			for (let i = 0; i < initVisibleItems.length; i++) {
				if (initVisibleItems[i].type.toUpperCase().indexOf(categoryOrTypeFilter.toUpperCase()) >= 0 ||
					initVisibleItems[i].category.toUpperCase().indexOf(categoryOrTypeFilter.toUpperCase()) >= 0)  {
					itemsAfterInputFilter.push(initVisibleItems[i]);
			}
		}
	}

	let itemsAfterUserNameFilter = [];

	if (userName === "") {
		itemsAfterUserNameFilter = itemsAfterInputFilter;
	}
	else {

		for (let i = 0; i < itemsAfterInputFilter.length; i++) {
			if (itemsAfterInputFilter[i].deletedBy === userName)
				itemsAfterUserNameFilter.push(itemsAfterInputFilter[i]);
		}
	}

	initVisibleItems = itemsAfterUserNameFilter;

	let visibleItems = [];

	for (let i = 0; i < initVisibleItems.length; i++) {
		if (initVisibleItems[i].type === "objective" && objectiveType) {
			visibleItems.push(initVisibleItems[i]);
		}
		if (initVisibleItems[i].type === "key result" && keyType) {
			visibleItems.push(initVisibleItems[i]);
		}
		if (initVisibleItems[i].type === "category" && categoryType) {
			visibleItems.push(initVisibleItems[i]);
		}
	}


	if (sortByDate != NOT_SORTED) {

		if (sortByDate === SORTED_ASC) {
			visibleItems.sort(function(a, b) {
				return new Date(a.deletedDate) - new Date(b.deletedDate);
			});
		}
		else {
			visibleItems.sort(function(a, b) {
				return new Date(b.deletedDate) - new Date(a.deletedDate);
			});
		}
	}

	if (sortByTitle != NOT_SORTED) {

		if (sortByTitle ===  SORTED_ASC) {

			visibleItems.sort(function(a, b) {
				if(a.title < b.title) return -1;
			    if(a.title > b.title) return 1;
			    return 0;
			});
		}
		else {

			visibleItems.sort(function(a, b) {
				if(a.title < b.title) return 1;
			    if(a.title > b.title) return -1;
			    return 0;
			});
		}
	}

	return visibleItems;
}

function filterDate(items, dateFrom, dateTo) { 

	let visibleItems = [];

	if(dateFrom === "" && dateTo === "") { 	

		visibleItems = JSON.parse(JSON.stringify(items));

	}
	else if(dateFrom === "" && dateTo != "") {
		items =  JSON.parse(JSON.stringify(items));
		for (let i = 0; i < items.length; i++) {
			if (new Date(dateTo) >= new Date(items[i].deletedDate)) {
				visibleItems.push(items[i]);
			}
		}
	}
	else if(dateFrom != "" && dateTo === ""){
		items =  JSON.parse(JSON.stringify(items));
		for (let i = 0; i < items.length; i++) {
			if (new Date(dateFrom) <= new Date(items[i].deletedDate)) {
				visibleItems.push(items[i]);
			}
		}
	}
	else {
		items =  JSON.parse(JSON.stringify(items));
		for (let i = 0; i < items.length; i++) {
			if (new Date(dateFrom) <= new Date(items[i].deletedDate) && new Date(dateTo) >= new Date(items[i].deletedDate)) {
				visibleItems.push(items[i]);
			}
		}
	}
	return visibleItems;
}