var axios = require('axios')

export function getAllCategories() {

     return (dispatch, getStore) => {
		  dispatch({
		   type: "GET_ALL_CATEGORIES"
		  });

	  return axios.get('api/category/')
	   .then(response => dispatch(receivedAllCategories(response.data)))
	   .catch(response => dispatch(receivedError(response.data)));
	 };
}

export function receivedAllCategories(data) {
	 return {
		  type: "RECEIVED_ALL_CATEGORIES",
		  data: data
	 };
}

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

export function createQuarter(quarter){
	return{
		type: "CREATE_QUARTER",
		payload: quarter
	}
}

export function softDeleteMyObjectiveById(id) {
  return {
     type: "SOFT_DELETE_MY_OBJECTIVE_BY_ID",
     id: id
  };
}

export function softDeleteMyObjectiveByIdApi(id, body) {
  return (dispatch, getStore) => {
   dispatch({
    type: "SOFT_DELETE_MY_OBJECTIVE_BY_ID_API"
   });

 return axios.put(('api/userObjective/' + id), body)
  .then(response => dispatch(softDeleteMyObjectiveById(id)))
  .catch(response => dispatch(receivedError(response.data)));
  };
}

export function addNewObjective(body) {
  return (dispatch, getStore) => {
   dispatch({
    type: "ADD_NEW_OBJECTIVE"
   });

 return axios.post(('api/userObjective/'), body)
  .then(response => dispatch(AddedNewObjective(response.data)))
  .catch(response => dispatch(receivedError(response.data)));
  };
}

export function AddedNewObjective(data) {
  return {
     type: "ADDED_NEW_OBJECTIVE",
     data: data
  };
}
