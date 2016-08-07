const initialState = {
    message: "Init message"
};

export default function message(state = initialState, action) {
    
    switch (action.type) {

    	case "JUST_FOR_TEST1": {

            console.log("ZASHEL");

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
