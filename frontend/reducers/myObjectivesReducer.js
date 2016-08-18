const initialState = {
  currentTab : 1,
  myObjectives: [
  {
  	"id": "57aa17fcf53e3058174f4de8",
  	"objTitle": "FROM REDUCER",
  	"objDescription": "Achieve A1 level",
  	"category": "Knowledge",
  	"ownerName": "John Dou",
  	"keyResults": [
  		{
  			"created": "2016-04-22T10:50:12.643Z",
  			"title": "Pass Advanced English test in Binary Studio",
  			"completed": "true",
  			"completedDate": "2016-06-22T10:50:12.643Z",
  			"score": "1"
  		},
  		{
  			"created": "2016-04-22T13:51:12.643Z",
  			"title": "Obtain a CAE certificate",
  			"completed": "true",
  			"completedDate": "",
  			"score": "1"
  		}
  	],
  	"assignBy": "",
  	"isDeleted": "false",
  	"startDate": "2016-01-22T10:42:12.643Z"
  }
]
};

export default function myObjectivesReducer(state = initialState, action = {}) {

    switch (action.type) {
      case "RECEIVED_ERROR": {

          const {data} = action;

          console.log("RECEIVED_ERROR");
          console.log(data);

          return Object.assign({}, state, {
                myObjectives: state.myObjectives
            })
        }

      case "RECEIVED_MY_OBJECTIVES": {
          console.log("RECEIVED_MY_OBJECTIVES hit");

          const {data} = action;
          console.log(data);
          return Object.assign({}, state, {

                myObjectives: state.myObjectives
            })
        }

        case "CHANGE_TAB": {

            const {currentTab} = action;

            return Object.assign({}, state, {
                  currentTab
              })
          }

        default: {
            return state;
        }
    }
}
