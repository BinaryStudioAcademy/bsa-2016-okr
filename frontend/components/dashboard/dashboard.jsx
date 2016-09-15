import React from 'react';
import DashboardStats from './dashboardStats.jsx';
import './dashboard.scss';

import cookie from 'react-cookie';

const session = cookie.load('user-id');

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from "../../actions/userDashboardActions";

class Dashboard extends React.Component {
    constructor() {
        super();
    }

    render() {
        var id = null;
        var year = this.props.myState.selectedYear;
        if (this.props.where == undefined){
            id = session;
        }
        else{
            id = this.props.userId;
        }
        if(this.props.where == "otherPersonPage")
            year = this.props.userPage.selectedYear;
        var urlUsers = "/api/stats/users?limit=5&&id=" + id;
        return (
            <div className="dashboard">
                <DashboardStats urlProgress="/api/stats/progress"
                    urlUsers= {urlUsers}
                    urlBottom="/api/stats/users?sort=desc&&limit=1"
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