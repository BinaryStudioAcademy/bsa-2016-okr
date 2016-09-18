import React, { Component } from 'react';
import DashboardStats from './dashboardStats.jsx';
import './dashboard.scss';

import cookie from 'react-cookie';

const session = cookie.load('user-id');

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from "../../actions/userDashboardActions";

class Dashboard extends Component {
    constructor() {
        super();
    }

    render() {
        var id = null;
        
        return (
            <div className="dashboard">
                <DashboardStats urlProgress="/api/stats/progress"
                    userId={id}
                    where={this.props.where}/>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return {
        userDashboard: state.userDashboard,
        myState: state.myState,
        userPage: state.userPage
    };
}

const DashboardConnected = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default DashboardConnected;