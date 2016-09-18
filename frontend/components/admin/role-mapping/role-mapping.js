import React from 'react';
import UserRoleMappingItem from "./user-role-mapping-item.js";
import RoleMappingItem from "./role-mapping-item.js";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './role-mapping.scss';
import '../../../containers/central-window.scss';

import * as actions from "../../../actions/mappingActions";

import {NOT_SORTED, SORTED_ASC, SORTED_DESC} from "../../../../backend/config/constants";

const session = require("../../../../backend/config/session.js");


class RoleMapping extends React.Component {

   render() {

      const { visibleUsers } = this.props.stateFromReducer.mapping;
      const { roles } = this.props.stateFromReducer.mapping;
      const { globalRoles} =  this.props.stateFromReducer.mapping;

      return (

      <div id="role-mapping-wrapper">

          <div id="central-window">
           
                 <div id="user-role-mapping-header-wrapper">
                   <input type="text" placeholder="Search it" id="role-mapping-search" ref="filterInput" onKeyUp={this.filter.bind(this)}/>
 
                  <select onChange={this.callSetGlobalRoleFilter.bind(this)} id="global-role-filter">
                       <option value=""  className="not-display">By Global Role</option>
                       <option value="">No one</option>
                        {globalRoles.map(function(glRole) {
                            return  <option key={glRole.id} value={glRole.globalRole}>{glRole.globalRole + " (" + glRole.count+")"}</option>
                         })}
                    </select>
                 </div>

                    <p><span>Personal roles</span></p>

                    <table className="table">
                       <thead>
                         <tr>
                            <th className="col-1">Avatar</th>
                            <th className="cursor-pointer" onClick={this.setSortingByName.bind(this)} tabIndex='0'><i id="name-field" className="fa fa-sort-asc"></i>Name</th>
                            <th>E-mail</th>
                            <th className="cursor-pointer" onClick={this.setSortingByGlobalRole.bind(this)} tabIndex='0'><i id="global-role-field" className="fa fa-sort"></i>Global role</th>
                            <th>Local role</th>
                         </tr>
                       </thead>
                       <tbody>
                        {visibleUsers.map(function(user) {
                            return  <UserRoleMappingItem currentUser={session._id} key={user._id} user={user}/>;
                         })}
                      </tbody>

                  </table>
             </div>
              <aside id="inter-panel">
                 <p id="global-roles-p"><span>Global roles</span></p>
                 <div id="roles-table">
                      <div className="table-head">
                            <h3 className="col-1">Global role</h3>
                            <h3 className="col-2">Local role</h3>
                      </div>
                       {roles.map(function(role) {
                            return  <RoleMappingItem key={role._id} role={role}/>;
                       })}

                  </div>
             </aside>

      </div>


      )
   }

   callSetGlobalRoleFilter() {
      let value = document.querySelector("#global-role-filter").value;
      this.props.setGlobalRoleFilter(value);
   }

  setSortingByGlobalRole() {
      
      let globalRoleField = document.querySelector(".table #global-role-field");
      globalRoleField.parentElement.blur();
      this.props.setSortingByName(NOT_SORTED);

      if (globalRoleField != null) {

        if (globalRoleField.classList.contains("fa-sort-asc")) {

          globalRoleField.classList.remove("fa-sort-asc");
          globalRoleField.classList.add("fa-sort-desc");

          this.props.setSortingByGlobalRole(SORTED_DESC);

        }
        else if (globalRoleField.classList.contains("fa-sort-desc")){
          globalRoleField.classList.remove("fa-sort-desc");
          globalRoleField.classList.add("fa-sort-asc");
          this.props.setSortingByGlobalRole(SORTED_ASC);
        }
        else {
          globalRoleField.classList.remove("fa-sort");
          globalRoleField.classList.add("fa-sort-asc");
          this.props.setSortingByGlobalRole(SORTED_ASC);
        }
      } 

      let nameField = document.querySelector(".table #name-field");

      if (nameField != null) {

        nameField.classList.remove("fa-sort-asc");
        nameField.classList.remove("fa-sort-desc");
        nameField.classList.add("fa-sort");
      }
  }

  setSortingByName() {
      
      let nameField = document.querySelector(".table #name-field");
      nameField.parentElement.blur();
      this.props.setSortingByGlobalRole(NOT_SORTED);

      if (nameField != null) {

        if (nameField.classList.contains("fa-sort-asc")) {

          nameField.classList.remove("fa-sort-asc");
          nameField.classList.add("fa-sort-desc");

          this.props.setSortingByName(SORTED_DESC);

        }
        else if (nameField.classList.contains("fa-sort-desc")){
          nameField.classList.remove("fa-sort-desc");
          nameField.classList.add("fa-sort-asc");
          this.props.setSortingByName(SORTED_ASC);
        }
        else {
          nameField.classList.remove("fa-sort");
          nameField.classList.add("fa-sort-asc");
          this.props.setSortingByName(SORTED_ASC);
        }
      } 

      let globalRoleField = document.querySelector(".table #global-role-field");

      if (globalRoleField != null) {
        globalRoleField.classList.remove("fa-sort-asc");
        globalRoleField.classList.remove("fa-sort-desc");
        globalRoleField.classList.add("fa-sort");
      }
  }


   filter() {

      const filterInput = this.refs.filterInput;
      const filter = filterInput.value;

      this.props.filterUsersRoles(filter);
   }

  componentWillMount() {
     this.props.getUsers();
     this.props.getGlobalRoles();
  }

  componentWillUnmount() {
    this.props.clear();
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
const RolesMapping = connect(mapStateToProps, mapDispatchToProps)(RoleMapping);
export default RolesMapping
