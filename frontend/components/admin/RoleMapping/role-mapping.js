import React from 'react';
import RoleMappingItem from "./role-mapping-item.js";

import './role-mapping.scss';

const users = [{
   id: 0,
   avatar: "avatar1.png",
   firstName: "admin",
   lastName: "admin",
   email: "admin@admin.com",
},
{
   id:1,
   avatar: "avatar1.png",
   firstName: "admin",
   lastName: "admin",
   email: "admin@admin.com",
},
{
   id: 2,
   avatar: "avatar1.png",
   firstName: "admin",
   lastName: "admin",
   email: "admin@admin.com",
},
{
   id:3,
   avatar: "avatar1.png",
   firstName: "admin",
   lastName: "admin",
   email: "admin@admin.com",
},
{
   id: 4,
   avatar: "avatar1.png",
   firstName: "admin",
   lastName: "admin",
   email: "admin@admin.com",
},
{
   id: 5,
   avatar: "avatar1.png",
   firstName: "admin",
   lastName: "admin",
   email: "admin@admin.com",
},
{
   id: 6,
   avatar: "avatar1.png",
   firstName: "admin",
   lastName: "admin",
   email: "admin@admin.com",
},
{
   id: 7,
   avatar: "avatar1.png",
   firstName: "admin",
   lastName: "admin",
   email: "admin@admin.com",
}
];

class RoleMapping extends React.Component {

   constructor() {
      super();

      this.state = {
         users
       };
   }

   render() {
      return (
         <div id="role-mapping-wrapper">
               <div id="role-mapping-header-wrapper">
                 <input type="text" placeholder="Search it" id="role-mapping-search"/><button id="search-button"></button>
               </div>
               <br/>
               <div id="role-mapping-content-wrapper">
                  <div className="table">
                     <div className="table-head">
                           <h3 className="first-column">Avatar</h3>
                           <h3 className="second-column">First name</h3>
                           <h3 className="third-column">Last name</h3>
                           <h3 className="fourth-column">E-mail</h3>
                           <h3 className="fifth-column">Global role</h3>
                           <h3 className="sixth-column">Local role</h3>
                     </div>

                        {this.state.users.map(function(user) {
                            return  <RoleMappingItem key={user.id} user={user}/>;
                         })}
                    
                  </div>
               </div>
         </div>
      )
   }
}

export default RoleMapping;