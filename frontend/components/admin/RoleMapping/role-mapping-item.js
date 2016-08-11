import React from 'react';

import './role-mapping.scss';

class RoleMappingItem extends React.Component {

   render() {
   	        return (
	            <div className="table-row">
	                   <div className="first-column">
	                      <img/>
	                   </div>
	                   <h4 className="second-column">{this.props.user.firstName}</h4>
	                   <h4 className="third-column">{this.props.user.lastName}</h4>
	                   <h4 className="fourth-column">{this.props.user.email}</h4>
	                   <select className="fifth-column">
	                     <option>Admin</option>
	                     <option>User</option>
	                   </select>
	                   <select className="sixth-column">
	                     <option>Admin</option>
	                     <option>User</option>
	                   </select>
	            </div>
            );
   }

}

export default RoleMappingItem;