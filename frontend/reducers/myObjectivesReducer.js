const initialState = {
	currentTab : 1,
	currentYear: 2016,
	objectives: [
		{
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
				}
			]
		}
	]
};

export default function myObjectivesReducer(state = initialState, action = {}) {

	switch (action.type) {
		case "RECEIVED_ERROR": {

			const { data } = action;

			console.log("RECEIVED_ERROR");
			console.log(data);

			return Object.assign({}, state, {
				objectives: state.objectives
			});
		}

		case "RECEIVED_MY_OBJECTIVES": {
			const { data } = action;

			console.log("RECEIVED_MY_OBJECTIVES hit", data);
			
			return Object.assign({}, state, {
				objectives: data
			});
		}

		case "CHANGE_TAB": {
			const { currentTab } = action;

			return Object.assign({}, state, {
				currentTab: currentTab
			});
		}

		default: {
			return state;
		}
	}
}
