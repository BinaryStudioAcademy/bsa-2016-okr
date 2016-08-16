const initialState = {
    users : [{
       id: 0,
       avatar: "avatar1.png",
       firstName: "admin",
       lastName: "admin",
       email: "admin@admin.com",
       localRole: "Admin"
    },
    {
       id: 1,
       avatar: "avatar1.png",
       firstName: "myName",
       lastName: "myLastName",
       email: "default@default.com",
       localRole: "Default"
    },
    {
       id: 2,
       avatar: "avatar1.png",
       firstName: "Vasya",
       lastName: "Pupkin",
       email: "vasya@vasya.com",
       localRole: "User"
    },
    {
       id: 3,
       avatar: "avatar1.png",
       firstName: "Napoleon",
       lastName: "Bonaparte",
       email: "nepoleon@bonaparte",
       localRole: "Admin"
    },
    {
       id: 4,
       avatar: "avatar1.png",
       firstName: "admin",
       lastName: "admin",
       email: "admin@admin.com",
       localRole: "Admin"
    },
    {
       id: 5,
       avatar: "avatar1.png",
       firstName: "admin",
       lastName: "admin",
       email: "admin@admin.com",
       localRole: "Admin"
    },
    {
       id: 6,
       avatar: "avatar1.png",
       firstName: "admin",
       lastName: "admin",
       email: "admin@admin.com",
       localRole: "Admin"
    },
    {
       id: 7,
       avatar: "avatar1.png",
       firstName: "admin",
       lastName: "admin",
       email: "admin@admin.com",
       localRole: "Admin"
    }
    ],
visibleUsers : [{
       id: 0,
       avatar: "avatar1.png",
       firstName: "admin",
       lastName: "admin",
       email: "admin@admin.com",
       localRole: "Admin"
    },
    {
       id: 1,
       avatar: "avatar1.png",
       firstName: "myName",
       lastName: "myLastName",
       email: "default@default.com",
       localRole: "Default"
    },
    {
       id: 2,
       avatar: "avatar1.png",
       firstName: "Vasya",
       lastName: "Pupkin",
       email: "vasya@vasya.com",
       localRole: "User"
    },
    {
       id: 3,
       avatar: "avatar1.png",
       firstName: "Napoleon",
       lastName: "Bonaparte",
       email: "nepoleon@bonaparte",
       localRole: "Admin"
    },
    {
       id: 4,
       avatar: "avatar1.png",
       firstName: "admin",
       lastName: "admin",
       email: "admin@admin.com",
       localRole: "Admin"
    },
    {
       id: 5,
       avatar: "avatar1.png",
       firstName: "admin",
       lastName: "admin",
       email: "admin@admin.com",
       localRole: "Admin"
    },
    {
       id: 6,
       avatar: "avatar1.png",
       firstName: "admin",
       lastName: "admin",
       email: "admin@admin.com",
       localRole: "Admin"
    },
    {
       id: 7,
       avatar: "avatar1.png",
       firstName: "admin",
       lastName: "admin",
       email: "admin@admin.com",
       localRole: "Admin"
    }
    ],
    roles : [{
       id: 0,
       globalRole: "ADMIN",
       localRole: "Admin"
    },
    {
       id: 1,
       globalRole: "DEVELOPER",
       localRole: "User"
    },
    {
        id: 2,
       globalRole: "HR",
       localRole: "User"
    },
    {
        id: 3,
       globalRole: "CEO",
       localRole: "Admin"
    },
    {
        id: 4,
       globalRole: "Tech Lead",
       localRole: "Admin"
    }
    ],
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

          if (array[i].id === id) {
              if (localRole != array[i].localRole)
                  array[i].localRole = localRole;

              break;

          }
    }

    return array;

}

export default function mappingReducer(state = initialState, action = {}) {

    switch (action.type) {

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
