var axios = require('axios');

export const GET_MY_OBJECTIVES = 'GET_MY_OBJECTIVES';
export const RECEIVED_MY_OBJECTIVES_ERROR = 'RECEIVED_MY_OBJECTIVES_ERROR';
export const RECEIVED_MY_OBJECTIVES = 'RECEIVED_MY_OBJECTIVES';
export const CHANGE_TAB = 'CHANGE_TAB';
export const CHANGE_YEAR = 'CHANGE_YEAR';
export const CREATE_QUARTER = 'CREATE_QUARTER';
export const SOFT_DELETE_MY_OBJECTIVE_BY_ID = 'SOFT_DELETE_MY_OBJECTIVE_BY_ID';
export const SOFT_DELETE_MY_OBJECTIVE_BY_ID_API = 'SOFT_DELETE_MY_OBJECTIVE_BY_ID_API';
export const ADD_NEW_OBJECTIVE = 'ADD_NEW_OBJECTIVE';
export const ADDED_NEW_OBJECTIVE = 'ADDED_NEW_OBJECTIVE';

export function getMe() {

     return (dispatch, getStore) => {
		  dispatch({
		   type: GET_MY_OBJECTIVES
		  });

	  return axios.get('api/user/me/')
	   .then(response => dispatch(receivedMyObjectives(response.data)))
	   .catch(response => dispatch(receivedObjectivesError(response.data)));
	 };
}

export function receivedMyObjectivesError(data) {
	 return {
	  type: RECEIVED_MY_OBJECTIVES_ERROR,
	  data: data
	 };
}

export function receivedMyObjectives(data) {
	 return {
		  type: RECEIVED_MY_OBJECTIVES,
		  data: data
	 };
}

export function setChangeTab(num) {
	 return {
		  type: CHANGE_TAB,
		  currentTab: num
	 };
}

export function setChangeYear(year) {
	 return {
		  type: CHANGE_YEAR,
		  currentYear: year
	 };
}

export function createQuarter(quarter){
	return{
		type: CREATE_QUARTER,
		payload: quarter
	}
}

export function softDeleteMyObjectiveById(id) {
  return {
     type: SOFT_DELETE_MY_OBJECTIVE_BY_ID,
     id: id
  };
}

export function softDeleteMyObjectiveByIdApi(id, body) {
  return (dispatch, getStore) => {
   dispatch({
    type: SOFT_DELETE_MY_OBJECTIVE_BY_ID_API
   });

 return axios.put(('api/userObjective/' + id), body)
  .then(response => dispatch(softDeleteMyObjectiveById(id)))
  .catch(response => dispatch(receivedMyObjectivesError(response.data)));
  };
}

export function addNewObjective(body) {
  return (dispatch, getStore) => {
   dispatch({
    type: ADD_NEW_OBJECTIVE
   });

 return axios.post(('api/userObjective/'), body)
  .then(response => dispatch(AddedNewObjective(response.data, body)))
  .catch(response => dispatch(receivedMyObjectivesError(response.data)));
  };
}

export function AddedNewObjective(data, body) {
  return {
     type: ADDED_NEW_OBJECTIVE,
     response: data,
     request: body
  };
}
