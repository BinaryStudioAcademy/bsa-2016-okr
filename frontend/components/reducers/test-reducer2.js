const initialState = {
    counter: 0
};

export default function counter(state = initialState, action) {
    
    switch (action.type) {

    	case "JUST_FOR_TEST2": {

            const {counter} = action;

            return Object.assign({}, state, {
                counter: counter
            })
        }


        default: {
            return state;        
        }
    }
}
