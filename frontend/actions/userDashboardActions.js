var axios = require('axios');

export const SET_TAB = 'SET_TAB';
export const CHANGE_SHOW_TABS ='CHANGE_SHOW_TABS'



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