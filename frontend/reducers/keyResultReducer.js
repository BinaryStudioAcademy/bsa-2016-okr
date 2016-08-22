const initialState = {
    data: []
};

export default function keyResultReducer(state = initialState, action = {}) {

    switch (action.type) {


        case "RECEIVED_ERROR": {

            const {data} = action;

            console.log("RECEIVED_ERROR");
            console.log(data);

            return Object.assign({}, state, {
                keyResults: keyResults
            })
        }

        case "RECEIVED_KEY_RESULTS": {

            const {data} = action;
            return Object.assign({}, state, {
                data
            })
        }

        default: {
            return state;
        }
    }
}
