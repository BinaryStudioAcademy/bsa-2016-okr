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
    console.log('-----2-----',data);
    return {
        type: "RECEIVED_ERROR",
        data
    };
}

export function receivedKeyResults(data) {
    console.log('-----1-----',data);
    return {
        type: "RECEIVED_KEY_RESULTS",
        data
    };
}