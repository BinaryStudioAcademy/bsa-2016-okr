const initialState = {
    users : [{
       _id: 0,
       avatar: "avatar1.png",
       firstName: "admin",
       lastName: "admin",
       email: "admin@admin.com",
       localRole: "Admin"
    },
    {
       _id: 1,
       avatar: "avatar1.png",
       firstName: "myName",
       lastName: "myLastName",
       email: "default@default.com",
       localRole: "Default"
    },
    {
       _id: 2,
       avatar: "avatar1.png",
       firstName: "Vasya",
       lastName: "Pupkin",
       email: "vasya@vasya.com",
       localRole: "User"
    },
    {
       _id: 3,
       avatar: "avatar1.png",
       firstName: "Napoleon",
       lastName: "Bonaparte",
       email: "nepoleon@bonaparte",
       localRole: "Admin"
    },
    {
       _id: 4,
       avatar: "avatar1.png",
       firstName: "admin",
       lastName: "admin",
       email: "admin@admin.com",
       localRole: "Admin"
    },
    {
       _id: 5,
       avatar: "avatar1.png",
       firstName: "admin",
       lastName: "admin",
       email: "admin@admin.com",
       localRole: "Admin"
    },
    {
       _id: 6,
       avatar: "avatar1.png",
       firstName: "admin",
       lastName: "admin",
       email: "admin@admin.com",
       localRole: "Admin"
    },
    {
       _id: 7,
       avatar: "avatar1.png",
       firstName: "admin",
       lastName: "admin",
       email: "admin@admin.com",
       localRole: "Admin"
    }
    ],
visibleUsers : [{
       _id: 0,
       avatar: "avatar1.png",
       firstName: "admin",
       lastName: "admin",
       email: "admin@admin.com",
       localRole: "Admin"
    },
    {
       _id: 1,
       avatar: "avatar1.png",
       firstName: "myName",
       lastName: "myLastName",
       email: "default@default.com",
       localRole: "Default"
    },
    {
       _id: 2,
       avatar: "avatar1.png",
       firstName: "Vasya",
       lastName: "Pupkin",
       email: "vasya@vasya.com",
       localRole: "User"
    },
    {
       _id: 3,
       avatar: "avatar1.png",
       firstName: "Napoleon",
       lastName: "Bonaparte",
       email: "nepoleon@bonaparte",
       localRole: "Admin"
    },
    {
       _id: 4,
       avatar: "avatar1.png",
       firstName: "admin",
       lastName: "admin",
       email: "admin@admin.com",
       localRole: "Admin"
    },
    {
       _id: 5,
       avatar: "avatar1.png",
       firstName: "admin",
       lastName: "admin",
       email: "admin@admin.com",
       localRole: "Admin"
    },
    {
       _id: 6,
       avatar: "avatar1.png",
       firstName: "admin",
       lastName: "admin",
       email: "admin@admin.com",
       localRole: "Admin"
    },
    {
       _id: 7,
       avatar: "avatar1.png",
       firstName: "admin",
       lastName: "admin",
       email: "admin@admin.com",
       localRole: "Admin"
    }
    ],
    roles: [],
    filter: ""
};


function updateVisibleUsers(users, filter) {

    
    let visibleUsers = [];

    if (filter === "")
        visibleUsers = JSON.parse(JSON.stringify(users));
    else 
        {
        for (let i = 0; i < users.length; i++) {

            if ((users[i].firstName.toUpperCase() + " " + users[i].lastName.toUpperCase()).indexOf(filter.toUpperCase()) === 0) {
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

export default function mappingReducer(state = initialState, action = {}) {

    switch (action.type) {


       case "RECEIVED_ERROR": {

          const {data} = action;

          console.log("RECEIVED_ERROR");
          console.log(data);

          return Object.assign({}, state, {
                users: state.users,
                visibleUsers: state.users,
                roles: state.roles,
                filter: state.filter,
            })
        }

      case "RECEIVED_GLOBAL_ROLES": {

          const {roles} = action;

          return Object.assign({}, state, {
                users: state.users,
                visibleUsers: state.users,
                roles: roles,
                filter: state.filter,
            })
        }

        case "USERS_ROLES_FILTER": {

            const {filter} = action;

             return Object.assign({}, state, {
                users: state.users,
                visibleUsers: updateVisibleUsers(state.users, filter),
                roles: state.roles,
                filter: filter,
            })
        }

        case "UPDATE_ROLES_LOCAL_ROLE": {

            const {localRole} = action;
            const {id} = action;

            let roles = JSON.parse(JSON.stringify(state.roles));

             return Object.assign({}, state, {
                users: state.users,
                visibleUsers: state.visibleUsers,
                roles: updateLocRole(roles, id, localRole),
                filter: state.filter
            })
        }

         case "UPDATE_USERS_LOCAL_ROLE": {

            const {localRole} = action;
            const {id} = action;

            let users = JSON.parse(JSON.stringify(state.users));   

             return Object.assign({}, state, {
                users: updateLocRole(users, id, localRole),
                visibleUsers: updateVisibleUsers(state.users, state.filter),
                roles: state.roles,
                filter: state.filter
            })
        }

        default: {
            return state;
        }
    }
}

