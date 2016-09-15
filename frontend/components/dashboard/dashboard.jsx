import React from 'react';
import DashboardStats from './dashboardStats.jsx';
import './dashboard.scss';
import session from '../../../backend/config/session.js'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from "../../actions/userDashboardActions";

class Dashboard extends React.Component {
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