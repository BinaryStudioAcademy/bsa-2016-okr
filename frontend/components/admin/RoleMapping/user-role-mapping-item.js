import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../actions/mappingActions";


import './role-mapping.scss';

class UserRoleMappingItem extends React.Component {

   render() {

   	        return (
	            <div className="table-row">
	                   <div className="col-1">
	                      <img/>
	                   </div>
	                   <h4 className="col-2">{this.props.user.firstName}</h4>
	                   <h4 className="col-3">{this.props.user.lastName}</h4>
	                   <h4 className="col-4">{this.props.user.email}</h4>
	                   <select className="col-5" id={"user-roles" + this.props.user.id} onChange={this.changeLocalRole.bind(this)} ref="userLocalRole" defaultValue="">
		                 <option value="Default">Default</option>
		                 <option value="Mentor">Mentor</option>
	                     <option value="Admin">Admin</option>
	                     <option value="User">User</option>
	                   </select>
	            </div>
            );
   }

   changeLocalRole() {
	   	this.props.updateUserLocRole(this.props.user.id, this.refs.userLocalRole.value);
   }

   componentDidMount()  {

   	if (this.props.stateFromReducer.mapping.filter != "" && this.refs.userLocalRole.value === "") {
   		this.refs.userLocalRole.value = this.props.stateFromReducer.mapping.filter;
   	}

   	 let defaultOption = document.querySelector("select#user-roles" + this.props.user.id + " option[value=Default]");
	 let adminOption = document.querySelector("select#user-roles" + this.props.user.id + " option[value=Admin]");
	 let userOption = document.querySelector("select#user-roles" + this.props.user.id + " option[value=User]");
	 let mentorOption = document.querySelector("select#user-roles" + this.props.user.id + " option[value=Mentor]");

	 switch(this.props.user.localRole) {
	 	case "Admin":
			if (adminOption != undefined)
		   	 	adminOption.selected = true;
	 	break;
	 	case "Default":
   	 	if (defaultOption != undefined)
	   	 	defaultOption.selected = true;
	 	break;
	 	case "Mentor":
   	 	 if (mentorOption != undefined)
	   	 	  mentorOption.selected = true;
	 	break;
	 	case "User":
   	 	if (userOption != undefined)
	   	 	userOption.selected = true;
	 	break;
	 }
  
   }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return {
        stateFromReducer: state
    };
}

const UsersRoleMappingItem = connect(mapStateToProps, mapDispatchToProps)(UserRoleMappingItem);
export default UsersRoleMappingItem;