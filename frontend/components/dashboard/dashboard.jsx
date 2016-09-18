import React from 'react';

import DashboardStats from './dashboardStats.jsx';
import './dashboard.scss';

const Dashboard = (props) => {
	let { userId, where } = props;

	return (
		<div className="dashboard">
			<DashboardStats
				userId={ userId }
				where={ where }
			/>
		</div>
	);
}

export default Dashboard;