import React from 'react';
import UserRoleMappingItem from "./user-role-mapping-item.js";
import RoleMappingItem from "./role-mapping-item.js";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './role-mapping.scss';
import '../../../containers/central-window.scss';

import * as actions from "../../../actions/mappingActions";


class RoleMapping extends React.Component {

    constructor(props) {
        
        super(props);
    }

   render() {

      const { visibleUsers } = this.props.stateFromReducer.mapping;
      const { roles } = this.props.stateFromReducer.mapping;
      const { globalRoles} =  this.props.stateFromReducer.mapping;

      return (

      <div id="role-mapping-wrapper">

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

                    <div className="table">
                       <div className="table-head">
                             <h3 className="col-1">Avatar</h3>
                             <h3 className="col-2">Name</h3>
                             <h3 className="col-3">E-mail</h3>
                             <h3 className="col-4" onClick={this.sortingByGlobalRole.bind(this)}><i id="global-role" className="fa fa-sort-asc"></i>Global role</h3>
                             <h3 className="col-5">Local role</h3>
                       </div>

                      {visibleUsers.map(function(user) {
                          return  <UserRoleMappingItem key={user._id} user={user}/>;
                       })}

                  </div>
             </div>
      </div>


      )
   }

   callSetGlobalRoleFilter() {
    let value = document.querySelector("#global-role-filter").value;
    this.props.setGlobalRoleFilter(value);
   }

   sortingByGlobalRole() {
    
    let globalRole = document.querySelector(".table-head #global-role");

    if (globalRole != null) {

      if (globalRole.classList.contains("fa-sort-asc")) {

        globalRole.classList.remove("fa-sort-asc");
        globalRole.classList.add("fa-sort-desc");

      }
      else {
        globalRole.classList.remove("fa-sort-desc");
        globalRole.classList.add("fa-sort-asc");
      }
    } 

     this.props.sortingByGlobalRole(!this.props.stateFromReducer.mapping.sortByGlobalRole);
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
