import React from 'react';

import './role-mapping.scss';

class RoleMappingItem extends React.Component {

   render() {

   	       if (this.props.role.globalRole === "ADMIN") {

		   		return (
		   			<div className="table-row">
			   			<h4 className="first-column">{this.props.role.globalRole}</h4>
			   			<h4 className="second-column">Admin</h4>
			   		 </div>
		   		);
		   	}
		   	  return (
	            <div className="table-row">
	                   <h4 className="first-column">{this.props.role.globalRole}</h4>
	                   <select className="second-column">
			             <option>Admin</option>
			             <option>User</option>
			           </select>
	            </div>
            );
   }

}

export default RoleMappingItem;