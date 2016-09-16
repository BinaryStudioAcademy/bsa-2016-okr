import React from 'react';

import UserObjectives from './../common/objective/objectives.jsx';
import CentralWindow from '../../containers/central-window.jsx';
import StatPanel from "../../containers/statistic-panel.jsx";
import UserDashboard from "../userDashboard/userDashboard.jsx"

import './home-page.scss';

const Home = (props) => {
	return (
		<div>
			<CentralWindow>
				<UserObjectives />
			</CentralWindow>
			<StatPanel>
				<UserDashboard where="homePage"/>
			</StatPanel>
		</div>
	);
}

export default Home;
