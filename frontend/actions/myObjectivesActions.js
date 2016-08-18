var axios = require('axios')

export function getMyObjectives(){

     return (dispatch, getStore) => {
console.log("getMyObjectives hit");
		  dispatch({
		   type: "GET_MY_OBJECTIVES"
		  });

	  return axios.get('api/userObjective/me')
	   .then(response => dispatch(receivedMyObjectives(response.data)))
	   .catch(response => dispatch(receivedError(response.data)));
	 };
}

export function receivedError(data) {
	 return {
	  type: "RECEIVED_ERROR",
	  data
	 };
}

export function receivedMyObjectives(data) {
	 return {
		  type: "RECEIVED_MY_OBJECTIVES",
		  data
	 };
}

export function setChangeTab(num) {
	 return {
		  type: "CHANGE_TAB",
		  currentTab: num
	 };
}
