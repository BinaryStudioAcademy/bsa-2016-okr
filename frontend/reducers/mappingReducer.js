const initialState = {
    users : [],
    visibleUsers : [],
    roles: [],
    filter: ""
};


export default function mappingReducer(state = initialState, action = {}) {

    switch (action.type) {

       case "MAPPING_RECEIVED_USERS": {

            const {data} = action;   

            for (let i = 0; i < data.length; i++) {

                data[i].avatar = "avatar1.png";
                data[i].name = data[i].userInfo.firstName + " " + data[i].userInfo.lastName;;
                data[i].email = data[i].userInfo.email;
                data[i].globalRole = data[i].userInfo.globalRole;

            }
            
            return Object.assign({}, state, {
                users: JSON.parse(JSON.stringify(data)),
                visibleUsers: JSON.parse(JSON.stringify(data)) 
            })
      }

        case "MAPPING_UPDATE_USER_ERROR": {

          const {data} = action;

          console.log(data);

          console.log("MAPPING_UPDATE_USER_ERROR");

          return state;
        }

        case "GET_USERS_ERROR": {

          const {data} = action;

          console.log(data);

          console.log("GET_USERS_ERROR");

          return state;
        }


       case "MAPPING_RECEIVED_ERROR": {

          const {data} = action;

          console.log("RECEIVED_ERROR");

          return state;
        }

      case "MAPPING_RECEIVED_GLOBAL_ROLES": {

          const {roles} = action;

          return Object.assign({}, state, {
                roles: roles
            })
        }

        case "MAPPING_USERS_ROLES_FILTER": {

            const {filter} = action;

             return Object.assign({}, state, {
                visibleUsers: updateVisibleUsers(state.users, filter),
                filter: filter
            })
        }

        case "MAPPING_UPDATE_ROLES_LOCAL_ROLE": {

            const {localRole} = action;
            const {id} = action;

            let roles = JSON.parse(JSON.stringify(state.roles));

             return Object.assign({}, state, {
                roles: updateLocRole(roles, id, localRole)

            })
        }

         case "MAPPING_UPDATE_USERS_LOCAL_ROLE": {

            const {localRole} = action;
            const {id} = action;

            let users = JSON.parse(JSON.stringify(state.users));   

             return Object.assign({}, state, {
                users: updateLocRole(users, id, localRole),
                visibleUsers: updateVisibleUsers(users, state.filter)
            })
        }

        default: {
            return state;
        }
    }
}


function updateVisibleUsers(users, filter) {

    
    let visibleUsers = [];

    if (filter === "")
        visibleUsers = JSON.parse(JSON.stringify(users));
    else 
        {
        for (let i = 0; i < users.length; i++) {

            if (users[i].name.toUpperCase().indexOf(filter.toUpperCase()) === 0 ||
              users[i].email.toUpperCase().indexOf(filter.toUpperCase()) === 0 ) {
                visibleUsers.push(users[i]);
              }
        }
    }

    return visibleUsers;
}

function updateLocRole(array, id, localRole) {

     for (let i = 0; i < array.length; i++) {

          if (array[i]._id === id) {
              if (localRole != array[i].localRole)
                  array[i].localRole = localRole;

              break;

          }
    }

    return array;

}
