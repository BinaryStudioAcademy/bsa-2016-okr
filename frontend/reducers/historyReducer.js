import {
	CLEAR_STATE,
	SEARCH_OBJECTS,
	SHOW_FILTERS,
	SET_HISTORY_FILTER_DATE_FROM,
	SET_HISTORY_FILTER_DATE_TO,
	SET_NAME_FILTER,
	SET_TYPE_FILTER,
	GET_SORTED_ITEMS,
	RECEIVED_SORTED_ITEMS,
	SET_SORT,
	RESET_FILTERS,
	GET_FILTERED_ITEMS,
	RECEIVED_FILTERED_ITEMS,
	GET_HISTORY_ITEMS,
	RECEIVED_HISTORY_ITEMS,
	HISTORY_ITEMS_ERROR,
	SET_HISTORY_LIMIT,
} from '../actions/historyActions';

const initialState = {
	limit: 100,
	lastHistoryRequest: GET_HISTORY_ITEMS,
	historyItems: [],
	searchValue: '',
	showHistoryFilters: false,
	nameFilter: '',
	typeFilter: '',
	sort:{
        up: true,
        sortField: 'date'
	},
	setHistoryFilterDateFrom:'',
	setHistoryFilterDateTo:''

};

export default function historyReducer(state = initialState, action) {
	switch (action.type) {
		case CLEAR_STATE: {
			return Object.assign({}, state, initialState)
		}

		case SEARCH_OBJECTS: {
			const {searchValue} = action;
			return Object.assign({}, state, {
				searchValue
			})
		}

		case GET_HISTORY_ITEMS: {
			return Object.assign({}, state)
		}

		case RESET_FILTERS: {
			return Object.assign({}, state, {
				nameFilter: '',
				typeFilter: '',
				sort:{
					up: true,
					sortField: 'date'
				},
				setHistoryFilterDateFrom: '',
				setHistoryFilterDateTo: ''
			})
		}

		case GET_FILTERED_ITEMS: {
			return Object.assign({}, state)
		}

		case HISTORY_ITEMS_ERROR: {

			const {data} = action;

			console.log("HISTORY_ITEMS_ERROR");
			console.log(data);

			return Object.assign({}, state)
		}

		case RECEIVED_FILTERED_ITEMS: {

			const historyItems = action.historyItems;
			return Object.assign({}, state, {
				historyItems,
				lastHistoryRequest: GET_FILTERED_ITEMS
			})
		}

		case RECEIVED_HISTORY_ITEMS: {

			const historyItems = action.historyItems;

			return Object.assign({}, state, {
				historyItems,
				visibleItems: historyItems,
				lastHistoryRequest: GET_HISTORY_ITEMS
			})
		}

		case SET_HISTORY_LIMIT: {
			const {limit} = action;
			return Object.assign({}, state, {
				limit
			})
		}

		case SET_SORT: {
			const sort = action.sort;

			return Object.assign({}, state, {
				sort
			})
		}

		case SET_NAME_FILTER: {
			const {nameFilter} = action;
			return Object.assign({}, state, {
				nameFilter
			})
		}

		case SET_TYPE_FILTER: {
			const {typeFilter} = action;
			return Object.assign({}, state, {
				typeFilter
			})
		}

		case SHOW_FILTERS: {
			const {showHistoryFilters} = action;
			return Object.assign({}, state, {
				showHistoryFilters
			})
		}

		case SET_HISTORY_FILTER_DATE_FROM: {
			const {setHistoryFilterDateFrom} = action;
			return Object.assign({}, state, {
				setHistoryFilterDateFrom,
				visibleItems: filterDate(state.visibleItems, setHistoryFilterDateFrom, state.setHistoryFilterDateTo, state.historyItems)
			})
		}

		case SET_HISTORY_FILTER_DATE_TO: {
			const {setHistoryFilterDateTo} = action;
			return Object.assign({}, state, {
				setHistoryFilterDateTo,
				visibleItems: filterDate(state.visibleItems, state.setHistoryFilterDateFrom, setHistoryFilterDateTo, state.historyItems)
			})
		}

		default: {
			return state;
		}
	}
}

function filterDate(items, dateFrom, dateTo, historyItems) {
	items = historyItems;
	let visibleItems = [];
	let from = new Date(dateFrom);
	let to = new Date(dateTo);

	if (!dateFrom && !dateTo) {
		visibleItems = historyItems;
	}
	else if (!dateFrom && dateTo) {
		for (let i = 0; i < historyItems.length; i++) {
			let itemDate = new Date(historyItems[i].createdAt);
			itemDate.setHours(0, 0, 0, 0);

			if (to >= itemDate) {
				visibleItems.push(historyItems[i]);
			}
		}
	}
	else if (dateFrom && !dateTo) {
		for (let i = 0; i < historyItems.length; i++) {
			let itemDate = new Date(historyItems[i].createdAt);
			itemDate.setHours(0, 0, 0, 0);

			if (from <= itemDate) {
				visibleItems.push(historyItems[i]);
			}
		}
	}
	else {
		for (let i = 0; i < historyItems.length; i++) {
			let itemDate = new Date(historyItems[i].createdAt);
			itemDate.setHours(0, 0, 0, 0);

			if (from <= itemDate && to >= itemDate) {
				visibleItems.push(historyItems[i]);
			}
		}
	}

	return visibleItems;
}
