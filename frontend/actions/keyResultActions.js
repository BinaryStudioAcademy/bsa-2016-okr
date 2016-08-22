var axios = require('axios')

export function getAutocompleteKeyResults(objectId, title) {

    return (dispatch, getStore) => {

        dispatch({
            type: "GET_AUTOCOMPLETE_KEY_RESULTS"
        });

        return axios.get('api/keyresult/objective/' + objectId + '/' + title)
            .then(response => dispatch(receivedKeyResults(response.data)))
            .catch(response => dispatch(receivedError(response.data)));

    };
}

export function receivedError(data) {
    return {
        type: "RECEIVED_ERROR",
        data
    };
}

export function receivedKeyResults(data) {
    return {
        type: "RECEIVED_KEY_RESULTS",
        data
    };
}