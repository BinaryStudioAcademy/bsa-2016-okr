import React from 'react';
import DashboardStats from './dashboardStats.jsx';
import './dashboard.scss';

export default class Dashboard extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="dashboard">
                <DashboardStats urlProgress="/api/stats/progress"
                    urlUsers="/api/stats/users"
                    urlBottom="/api/stats/users?sort=desc&&limit=1"/>
            </div>
        )
    }
}


