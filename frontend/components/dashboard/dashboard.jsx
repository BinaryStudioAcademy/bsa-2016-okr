import React from 'react';
import {Link} from 'react-router';
import DashboardStats from './dashboardStats.jsx';
import Tab from './tab.jsx';
import TabControl from './tabControl.jsx';
import ChartStats from './chartStats.jsx';
import axios from 'axios';
import './dashboard.scss';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            keyResults:[]
        }
    }

       
componentDidMount() {
        axios.get('api/stats/categories').then((response) => { this.setState({ categories: response.data }); });
        axios.get('api/stats/kresults').then((response) => { this.setState({ keyResults: response.data }); });
    };

    toArray(obj) {
        var rez = [];
        for (var i in obj) {
            rez.push(obj[i]);
        }
        return rez;
    };

    render() {
        return (
            <div className="dashboard">
                <TabControl selected={0}>
                    <Tab label="Users">
                        <DashboardStats urlProgress="api/stats/progress"
                            urlUsers="api/stats/users"/>
                    </Tab>
                    <Tab label="Categories">
                        <ChartStats title = "Chart by categories" data={[['Category', 'Count']].concat(this.state.categories.map(this.toArray))}/>
                    </Tab>
                    <Tab label="Key results">
                        <ChartStats title = "Chart by difficulty" data = {[['Difficulty', 'Count']].concat(this.state.keyResults.map(this.toArray))} />
                    </Tab>
                </TabControl>
            </div>)
    }
}




