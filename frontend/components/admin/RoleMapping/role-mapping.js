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

      return (

      <div id="role-mapping-wrapper">

            <aside id="inter-panel">

                 <p><span>Global roles</span></p>

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
                 </div>

                    <p><span>Personal roles</span></p>

                    <div className="table">
                       <div className="table-head">
                             <h3 className="col-1">Avatar</h3>
                             <h3 className="col-2">First name</h3>
                             <h3 className="col-3">Last name</h3>
                             <h3 className="col-4">E-mail</h3>
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

   filter() {

      const filterInput = this.refs.filterInput;
      const filter = filterInput.value;

      this.props.filterUsersRoles(filter);
   }

  componentWillMount() {
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
