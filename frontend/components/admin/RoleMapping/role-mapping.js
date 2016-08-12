import React from 'react';
import UserRoleMappingItem from "./user-role-mapping-item.js";
import RoleMappingItem from "./role-mapping-item.js";

import './role-mapping.scss';

const users = [{
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
   firstName: "admin",
   lastName: "admin",
   email: "admin@admin.com",
   localRole: "Admin"
},
{
   id: 2,
   avatar: "avatar1.png",
   firstName: "admin",
   lastName: "admin",
   email: "admin@admin.com",
   localRole: "Admin"
},
{
   id: 3,
   avatar: "avatar1.png",
   firstName: "admin",
   lastName: "admin",
   email: "admin@admin.com",
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
];

const roles = [{
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
]

class RoleMapping extends React.Component {

   constructor() {
      super();

      this.state = {
         users,
         roles
       };
   }

   render() {
      return (
         <div id="role-mapping-wrapper">

               <div id="user-role-mapping-header-wrapper">
                 <input type="text" placeholder="Search it" id="role-mapping-search"/><button id="search-button"></button>
               </div>

               <div id="user-role-mapping-content-wrapper">

                  <div id="roles-table">
                        <div className="table-head">
                              <h3 className="first-column">Global role</h3>
                              <h3 className="second-column">Local role</h3>
                        </div>

                         {this.state.roles.map(function(role) {
                              return  <RoleMappingItem key={role.id} role={role}/>;
                         })}

                     </div>
                  </div>

                  <div className="table">
                     <div className="table-head">
                           <h3 className="first-column">Avatar</h3>
                           <h3 className="second-column">First name</h3>
                           <h3 className="third-column">Last name</h3>
                           <h3 className="fourth-column">E-mail</h3>
                           <h3 className="fifth-column">Local role</h3>
                     </div>

                        {this.state.users.map(function(user) {
                            return  <UserRoleMappingItem key={user.id} user={user}/>;
                         })}
                    
                  </div>
         </div>
      )
   }
}

export default RoleMapping;