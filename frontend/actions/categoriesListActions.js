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

export function receivedError(data) {
  console.log(data);
	 return {
	  type: "RECEIVED_ERROR",
	  data: data
	 };
}
