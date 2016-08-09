import React from 'react';
import {Link} from 'react-router';
import UserStats from './userStats.jsx';
import ObjectiveStats from './objectiveStats.jsx';
import TemplateStats from './templateStats.jsx';
import './dashboard.scss';

class Dashboard extends React.Component {
    constructor() {
        super();
    }
    render() {

        return (
            <div className="dashboard">
                <ul className="tabs">
                    <div className="active"><li><h2>Users</h2></li></div>
                    <div> <li><h2>Objectives</h2></li></div>
                    <div><li><h2>Templates</h2></li></div>
                </ul>
                <div className="main">
                    <p><b>256</b> Users have active Objectives<br/>in this quarter</p>
                    <table>
                        <caption>Top 5 users with the highest performance</caption>
                        <th>Name</th><th>objectives completed, %</th>
                        <tr><td>Peter</td><td>78%</td></tr>
                        <tr><td>Elma</td><td>50%</td></tr>
                        <tr><td>Ronaldo</td><td>45%</td></tr>
                        <tr><td>Grigory</td><td>39%</td></tr>
                        <tr><td>Ricardo</td><td>28%</td></tr>
                    </table>
                </div>
            </div>)
    }
}

export default Dashboard;



