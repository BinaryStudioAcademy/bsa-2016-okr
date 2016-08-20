import { isEmpty } from '../../backend/utils/ValidateService';

const initialState = {
    currentTab: getQuarter(),
    currentYear: getYear(),
	me: {
		"localRole": "",
		"quarters": [
		{
			"year": 2016,
			"index": 1,
			"userObjectives": [
			{
				"_id": "57b6462e34f76cac0bd8db67",
				"templateId": {
					"_id": "57b6462b34f76cac0bd8bcdd",
					"title": "Usco pub rizazdik umo.",
					"description": "Pi feza jilivto waw la.",
					"category": "57b6462b34f76cac0bd8b9d3",
					"creator": "57b6462b34f76cac0bd8b9a6",
					"createdAt": "2016-11-23T10:54:21.850Z",
					"updatedAt": "2016-11-23T13:36:43.168Z",
					"isDeleted": false,
					"isApproved": true,
					"used": 7,
					"keyResults": [
					"57b6462c34f76cac0bd8cda7",
					"57b6462c34f76cac0bd8c93a"
					]
				},
				"userId": "57b6462b34f76cac0bd8b96e",
				"creator": "57b6462b34f76cac0bd8b96e",
				"keyResults": [
				{
					"templateId":  {
						"title": "Patavek.",
						"creator": "57b6462b34f76cac0bd8b970",
						"objectiveId": "57b6462b34f76cac0bd8bcdd",
						"used": 5,
						"difficulty": "easy"
					},
					"creator": "57b6462b34f76cac0bd8b96e",
					"_id": "57b6462e34f76cac0bd8db68",
					"score": 0.2
				}
				]
			}
			]
		},
    {
      "year": 2016,
      "index": 2,
      "userObjectives": [
      {
        "_id": "57b6462e34f76cac0bd8db67",
        "templateId": {
          "_id": "57b6462b34f76cac0bd8bcdd",
          "title": "Usco pub rizazdik umo.",
          "description": "Pi feza jilivto waw la.",
          "category": "57b6462b34f76cac0bd8b9d3",
          "creator": "57b6462b34f76cac0bd8b9a6",
          "createdAt": "2016-11-23T10:54:21.850Z",
          "updatedAt": "2016-11-23T13:36:43.168Z",
          "isDeleted": false,
          "isApproved": true,
          "used": 7,
          "keyResults": [
          "57b6462c34f76cac0bd8cda7",
          "57b6462c34f76cac0bd8c93a"
          ]
        },
        "userId": "57b6462b34f76cac0bd8b96e",
        "creator": "57b6462b34f76cac0bd8b96e",
        "keyResults": [
        {
          "templateId":  {
            "title": "Patavek.",
            "creator": "57b6462b34f76cac0bd8b970",
            "objectiveId": "57b6462b34f76cac0bd8bcdd",
            "used": 5,
            "difficulty": "easy"
          },
          "creator": "57b6462b34f76cac0bd8b96e",
          "_id": "57b6462e34f76cac0bd8db68",
          "score": 0.2
        }
        ]
      }
      ]
    },
    {
      "year": 2016,
      "index": 3,
      "userObjectives": [
      {
        "_id": "57b6462e34f76cac0bd8db67",
        "templateId": {
          "_id": "57b6462b34f76cac0bd8bcdd",
          "title": "Usco pub rizazdik umo.",
          "description": "Pi feza jilivto waw la.",
          "category": "57b6462b34f76cac0bd8b9d3",
          "creator": "57b6462b34f76cac0bd8b9a6",
          "createdAt": "2016-11-23T10:54:21.850Z",
          "updatedAt": "2016-11-23T13:36:43.168Z",
          "isDeleted": false,
          "isApproved": true,
          "used": 7,
          "keyResults": [
          "57b6462c34f76cac0bd8cda7",
          "57b6462c34f76cac0bd8c93a"
          ]
        },
        "userId": "57b6462b34f76cac0bd8b96e",
        "creator": "57b6462b34f76cac0bd8b96e",
        "keyResults": [
        {
          "templateId":  {
            "title": "Patavek.",
            "creator": "57b6462b34f76cac0bd8b970",
            "objectiveId": "57b6462b34f76cac0bd8bcdd",
            "used": 5,
            "difficulty": "easy"
          },
          "creator": "57b6462b34f76cac0bd8b96e",
          "_id": "57b6462e34f76cac0bd8db68",
          "score": 0.2
        }
        ]
      }
      ]
    },
    {
      "year": 2016,
      "index": 4,
      "userObjectives": [
      {
        "_id": "57b6462e34f76cac0bd8db67",
        "templateId": {
          "_id": "57b6462b34f76cac0bd8bcdd",
          "title": "Usco pub rizazdik umo.",
          "description": "Pi feza jilivto waw la.",
          "category": "57b6462b34f76cac0bd8b9d3",
          "creator": "57b6462b34f76cac0bd8b9a6",
          "createdAt": "2016-11-23T10:54:21.850Z",
          "updatedAt": "2016-11-23T13:36:43.168Z",
          "isDeleted": false,
          "isApproved": true,
          "used": 7,
          "keyResults": [
          "57b6462c34f76cac0bd8cda7",
          "57b6462c34f76cac0bd8c93a"
          ]
        },
        "userId": "57b6462b34f76cac0bd8b96e",
        "creator": "57b6462b34f76cac0bd8b96e",
        "keyResults": [
        {
          "templateId":  {
            "title": "Patavek.",
            "creator": "57b6462b34f76cac0bd8b970",
            "objectiveId": "57b6462b34f76cac0bd8bcdd",
            "used": 5,
            "difficulty": "easy"
          },
          "creator": "57b6462b34f76cac0bd8b96e",
          "_id": "57b6462e34f76cac0bd8db68",
          "score": 0.2
        }
        ]
      }
      ]
    }
		]
	}
};

export default function myObjectivesReducer(state = initialState, action = {}) {

	switch (action.type) {
		case "RECEIVED_ERROR": {

			const { data } = action;

			console.log("RECEIVED_ERROR");
			console.log(data);
      console.log("ME +++", state.me);
			return Object.assign({}, state, {
				me: state.me
			});
		}

		case "RECEIVED_MY_OBJECTIVES": {
			const { data } = action;
      console.log("RECEIVED_MY_OBJECTIVES hit", data);
			return Object.assign({}, state, {
				me: isEmpty(data) ? state.me : data,
				currentTab: getQuarter(),
                currentYear: getYear()
			});
		}

		case "CHANGE_TAB": {
			const { currentTab } = action;

			return Object.assign({}, state, {
				currentTab: currentTab
			});
		}

		case "CHANGE_YEAR": {
			const { currentYear } = action;

			return Object.assign({}, state, {
				currentYear: currentYear
			});
		}

    case "SOFT_DELETE_MY_OBJECTIVE_BY_ID": {
			const { id } = action;
			console.log(state);
			return Object.assign({}, state, {
				me: deleteObjectiveFromMe(state.me, id)
			})

		}

		default: {
			return state;
		}
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

function deleteObjectiveFromMe(me, id) {
	var meCopy = Object.assign({}, me);
	meCopy.quarters.forEach((quarter) => {
		for(var i=0 ; i<quarter.userObjectives.length; i++) {
    	if(quarter.userObjectives[i]._id == id) {
        quarter.userObjectives.splice(i, 1);
			}
		}
	});
	return meCopy
}
