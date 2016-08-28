var axios = require('axios');

export const SET_TAB = 'SET_TAB';
export const CHANGE_SHOW_TABS ='CHANGE_SHOW_TABS';
export const GET_MY_HISTORY = 'GET_MY_HISTORY';
export const RECEIVED_MY_HISTORY = 'RECEIVED_MY_HISTORY';
export const MY_HISTORY_ERROR = 'MY_HISTORY_ERROR';


export function getMyHistory() {
	 return (dispatch, getStore) => {
	 	let myStore = getStore().myState;
	 	console.log(getStore());
	 	dispatch({type: GET_MY_HISTORY});
	 	return axios.get('/api/history/user/'+ myStore.me._id)
	 	.then( (response) => dispatch(receivedMyHistory(response.data)))
		.catch( (response) => dispatch(myHistoryError(response.data)));
	 }
}

export function receivedMyHistory(data) {
	return {
		type: RECEIVED_MY_HISTORY,
		data
	}
}
export function myHistoryError(data) {
	return {
		type: MY_HISTORY_ERROR,
		data
	}
}

export function changeShowTopTabs() {
	return (dispatch, getStore) => {
		let store = getStore().userDashboard;
		dispatch({
			type: CHANGE_SHOW_TABS,
			showTopTabs: !store.showTopTabs
		})
	}
}
	 
export function setTab(tabIndex) {
	const action = {
		type: SET_TAB,
		tabIndex
	}
	return action;
}