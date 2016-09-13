import React from 'react';
import DashboardStats from './dashboardStats.jsx';
import './dashboard.scss';
import session from '../../../backend/config/session.js'

export default class Dashboard extends React.Component {
    constructor() {
        super();
    }

    render() {
        var id = null;
        if (this.props.where == undefined){
            id = session._id;
        }
        else{
            id = this.props.userId;
        }
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


