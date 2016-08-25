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
			categories: this.props.categories,
			keyResults:[]
		}
	}


	componentDidMount() {
		/*axios.get('api/stats/kresults').then((response) => { this.setState({ keyResults: response.data }); });*/
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
						<ChartStats title = "Chart by categories" data={[['Category', 'Count']].concat(this.state.categories)}/>
					</Tab>
					<Tab label="Key results">
						<ChartStats title = "Chart by difficulty" data = {[['Difficulty', 'Count']].concat(this.state.keyResults)} />
					</Tab>
				</TabControl>
			</div>
		)
	}
}

export default Dashboard;




