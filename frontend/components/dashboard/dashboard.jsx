import React from 'react';
import {Link} from 'react-router';
import DashboardStats from './dashboardStats.jsx';
import Tab from './tab.jsx';
import TabControl from './tabControl.jsx';
import ChartStats from './chartStats.jsx';
import './dashboard.scss';

export default class Dashboard extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="dashboard">
                <TabControl selected={0}>
                    <Tab label="Users">
                        <DashboardStats count="64% " counterName="Medium progress by all users"
                            caption="Top 5 Users by performance" columns={["Name", "Completed"]}
                            rows={[["Peter", "78%"], ["Elma", "50%"], ["Ronaldo", "45%"], ["Grigory", "39%"], ["Ricardo", "28%"]]}/>
                    </Tab>
                    <Tab label="Categories">
                        <ChartStats data = {[['Category', 'Count'], ['Knowledge', 145], ['Expertise', 87], ["Projects", 123]]} title = "Chart by categories"/>
                    </Tab>
                    <Tab label="Key results">
                        <ChartStats data = {[['Difficulty', 'Count'], ['Beginner', 145], ['Intermediate', 87], ["Advanced", 123]]} title = "Chart by difficulty"/>
                    </Tab>
                </TabControl>
            </div>)
    }
}




