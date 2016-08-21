import users from '../components/mockData/users.js'
import {GET_USER, RECEIVED_USER, CHANGE_TAB, CHANGE_YEAR} from '../actions/otherPersonActions.js'

const initialState = {
	user: [],
    waiting: true,
    currentTab: getQuarter(),
    currentYear: getYear()
}

export default function patentDetailsReducer(state = initialState, action) {
    
    switch (action.type) {
        case GET_USER: {
            console.log("GET_USER");
            
            return Object.assign({}, state, {
                waiting: true
            }) 
        }
        case RECEIVED_USER: {

            const {data} = action;
            console.log("RECEIVED_USER");
            console.log(data);
            return Object.assign({}, state, {
                user: data,
                waiting: false,
                currentTab: getQuarter(),
                currentYear: getYear()

            })               
        }

        case CHANGE_TAB: {
            const { currentTab } = action;

            return Object.assign({}, state, {
                currentTab
            });
        }

        case CHANGE_YEAR: {
            const { currentYear } = action;

            return Object.assign({}, state, {
                currentYear
            });
        }

        default: 
            return state;        
        
    }
}
function getYear(){
    let today = new Date();   
    return today.getFullYear() 
}

function getQuarter(){
    let today = new Date();
    let first = new Date('2016-03-31T10:42:12.643Z'),
        second = new Date('2016-06-30T10:42:12.643Z'),
        third = new Date('2016-09-30T10:42:12.643Z');
    if (today < first)
        return 1;
    else if (today >= first && today <= second)
        return 2;
    else if(today > second && today <= third)
        return 3;
    else if(today > third)
        return 4;
}