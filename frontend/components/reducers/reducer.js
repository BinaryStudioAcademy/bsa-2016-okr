const initialState = {
    message: "Init message"
};

export default function patentDetailsReducer(state = initialState, action) {
    
    switch (action.type) {

    	case "JUST_FOR_TEST": {

            const {message} = action;

             return Object.assign({}, state, {
                message: message
            })
        }


        default: {
            return state;        
        }
    }
}
