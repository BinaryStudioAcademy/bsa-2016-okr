var axios = require('axios')

export function getMe() {

     return (dispatch, getStore) => {
		  dispatch({
		   type: "GET_MY_OBJECTIVES"
		  });

	  return axios.get('api/user/me/')
	   .then(response => dispatch(receivedMyObjectives(response.data)))
	   .catch(response => dispatch(receivedError(response.data)));
	 };
}

export function receivedError(data) {
  console.log(data);
	 return {
	  type: "RECEIVED_ERROR",
	  data: data
	 };
}

export function receivedMyObjectives(data) {
	 return {
		  type: "RECEIVED_MY_OBJECTIVES",
		  data: data
	 };
}

export function setChangeTab(num) {
	 return {
		  type: "CHANGE_TAB",
		  currentTab: num
	 };
}

export function setChangeYear(year) {
	 return {
		  type: "CHANGE_YEAR",
		  currentYear: year
	 };
}

export function softDeleteMyObjectiveById(id) {
  return {
     type: "SOFT_DELETE_MY_OBJECTIVE_BY_ID",
     id: id
  };
}

export function softDeleteMyObjectiveByIdApi(id) {
  return (dispatch, getStore) => {
   dispatch({
    type: "SOFT_DELETE_MY_OBJECTIVE_BY_ID_API"
   });
   /*TODO Add body for put
   body = {
     "isDeleted" : "true"
   }
   */
 return axios.put('api/userObjective/' + id)
  .then(response => dispatch(softDeleteMyObjectiveById(id)))
  .catch(response => dispatch(receivedError(response.data)));
  };
}
