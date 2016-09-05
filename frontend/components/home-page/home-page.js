import React from 'react';
import './home-page.scss';
import '../common/styles/scrollbar.scss';
import ListOfUsers from '../list-of-users/list-of-users.jsx';
import UserObjectives from './../common/objective/objectives.jsx';
import CentralWindow from '../../containers/central-window.jsx';
import StatPanel from "../../containers/statistic-panel.jsx";
import Dashboard from "../dashboard/dashboard.jsx";
import UserDashboard from "../userDashboard/userDashboard.jsx"


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class Home extends React.Component {
	constructor() {
		super();
	}


	render() {
		return (
			<div>
				<CentralWindow>
				<UserObjectives />
				</CentralWindow>
				<StatPanel>
					<UserDashboard where="homePage"/>
				</StatPanel>
			</div>
			)
	}
}

export default Home;
