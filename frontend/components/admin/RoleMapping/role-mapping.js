import React from 'react';
import UserRoleMappingItem from "./user-role-mapping-item.js";
import RoleMappingItem from "./role-mapping-item.js";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './role-mapping.scss';
import '../../../containers/central-window.scss';

import * as actions from "../../../actions/mappingActions";


class RoleMapping extends React.Component {

   render() {

      const { visibleUsers } = this.props.stateFromReducer.mapping;
      const { roles } = this.props.stateFromReducer.mapping;

      return (

      <div id="role-mapping-wrapper">

            <aside id="inter-panel">

                 <p><span>Global roles</span></p>

                 <div id="roles-table">
                      <div className="table-head">
                            <h3 className="first-column">Global role</h3>
                            <h3 className="second-column">Local role</h3>
                      </div>

                       {roles.map(function(role) {
                            return  <RoleMappingItem key={role.id} role={role}/>;
                       })}

                  </div>
             </aside>

          <div id="central-window">
           
                 <div id="user-role-mapping-header-wrapper">
                   <input type="text" placeholder="Search it" id="role-mapping-search" ref="filterInput"/><button id="search-button" onClick={this.filter.bind(this)}><i className="fa fa-search fa-2x" aria-hidden="true"></i></button>
                 </div>

                    <p><span>Personal roles</span></p>

                    <div className="table">
                       <div className="table-head">
                             <h3 className="first-column">Avatar</h3>
                             <h3 className="second-column">First name</h3>
                             <h3 className="third-column">Last name</h3>
                             <h3 className="fourth-column">E-mail</h3>
                             <h3 className="fifth-column">Local role</h3>
                       </div>

                      {visibleUsers.map(function(user) {
                          return  <UserRoleMappingItem key={user.id} user={user}/>;
                       })}

                  </div>
             </div>
      </div>


      )
   }

   filter(event) {

      event.preventDefault();

      const filterInput = this.refs.filterInput;
      const filter = filterInput.value;

      //console.log(this.props);

      this.props.filterUsersRoles(filter);
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
