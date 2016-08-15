import React from 'react';
import {Link} from 'react-router';
import DashboardStats from './dashboardStats.jsx';
import Tab from './tab.jsx';
import TabControl from './tabControl.jsx';
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
                        <DashboardStats count="256" counterName="Users have active Objectives"
                            caption="Top 5 Users by performance" columns={["Name", "Completed"]}
                            rows={[["Peter", "78%"], ["Elma", "50%"], ["Ronaldo", "45%"], ["Grigory", "39%"], ["Ricardo", "28%"]]}/>
                    </Tab>
                    <Tab label="Objectives">
                        <DashboardStats count="340" counterName="Objectives in progress"
                            caption="Top 5 Objectives by number of likes" columns={["Title", "Likes"]}
                            rows={[["To learn Angular", "67"], ["Read the book", "63"], ["To do task", "51"], ["To start running in the morning", "48"], ["To prepare the cake", "41"]]}/>
                    </Tab>
                    <Tab label="Templates">
                        <DashboardStats count="78" counterName="Templates have been forked"
                            caption="Top 5 Templates by number of forks" columns={["Title", "Forks"]}
                            rows={[["Read the book", "43"], ["Learn React", "36"], ["Get fit", "32"], ["Lern salsa", "29"], ["Get a new job", "21"]]}/>
                    </Tab>
                </TabControl>
            </div>)
    }
}




