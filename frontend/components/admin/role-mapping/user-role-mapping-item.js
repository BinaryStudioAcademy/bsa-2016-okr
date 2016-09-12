import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../actions/mappingActions";

const CONST = require("../../../../backend/config/constants");

import './role-mapping.scss';

class UserRoleMappingItem extends React.Component {

   render() {

		    if (this.props.user.globalRole === CONST.user.globalRole.ADMIN) {
			   	 return (
		            <div className="table-row">
		                   <div className="col-1">
		                      <img/>
		                   </div>
		                   <h4 className="col-2">{this.props.user.name}</h4>
		                   <h4 className="col-3">{this.props.user.email}</h4>
		                   <h4 className="col-4">{this.props.user.globalRole}</h4>
		                   <h4 className="col-5">Admin</h4>
		            </div>
	            );
		   	}

   	        return (
	            <div className="table-row">
	                   <div className="col-1">
	                      <img/>
	                   </div>
	                   <h4 className="col-2">{this.props.user.name}</h4>
	                   <h4 className="col-3">{this.props.user.email}</h4>
	                    <h4 className="col-4">{this.props.user.globalRole}</h4>
	                   <select className="col-5" id={"user-roles" + this.props.user._id} ref="userLocalRole"
	                   onChange={this.changeLocalRole.bind(this)} ref="userLocalRole" defaultValue="">
		                 <option value = {CONST.user.localRole.DEFAULT}>Default</option>
		                 <option value = {CONST.user.localRole.MENTOR}>Mentor</option>
	                     <option value = {CONST.user.localRole.ADMIN}>Admin</option>
	                     <option value = {CONST.user.localRole.USER}>User</option>
	                   </select>
	            </div>
            );
   }

   changeLocalRole() {


	    let reqBody = {};
	    reqBody.localRole = this.refs.userLocalRole.value;
	    reqBody.createAt = this.props.user.createAt;
	    reqBody.updatedAt = this.props.user.updatedAt;
	    reqBody.mentor = this.props.user.mentor;

	  	this.props.updateUserRole(this.props.user._id, reqBody);
   }

   componentDidMount()  {

   	if (this.props.stateFromReducer.mapping.filter != "" && this.refs.userLocalRole.value === "") {
   		this.refs.userLocalRole.value = this.props.stateFromReducer.mapping.filter;
   	}

   	 let defaultOption = document.querySelector("select#user-roles" + this.props.user._id + " option[value=" + CONST.user.localRole.DEFAULT + "]");
	 let userOption = document.querySelector("select#user-roles" + this.props.user._id + " option[value=" + CONST.user.localRole.USER + "]");
	 let adminOption = document.querySelector("select#user-roles" + this.props.user._id + " option[value=" + CONST.user.localRole.ADMIN + "]");
	 let mentorOption = document.querySelector("select#user-roles" + this.props.user._id + " option[value=" + CONST.user.localRole.MENTOR + "]");

	 switch(this.props.user.localRole) {
	 	case CONST.user.localRole.ADMIN:
			if (adminOption != undefined)
		   	 	adminOption.selected = true;
	 	break;
	 	case CONST.user.localRole.MENTOR:
   	 	 if (mentorOption != undefined)
	   	 	  mentorOption.selected = true;
	 	break;
	 	case CONST.user.localRole.USER:
   	 	if (userOption != undefined)
	   	 	userOption.selected = true;
	 	break;
	 	default:
	 	  if (defaultOption != undefined)
	   	 	defaultOption.selected = true;
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