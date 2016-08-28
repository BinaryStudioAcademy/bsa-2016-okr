import React from 'react';
import './home-page/home-page.scss';
import './common/styles/scrollbar.scss';
import ListOfUsers from './list-of-users/list-of-users.jsx';
import Quarter from './home-page/quarter.jsx';
import UserObjectives from './home-page/objectives.jsx';
import CentralWindow from '../containers/central-window.jsx';
import StatPanel from "../containers/statistic-panel.jsx";
import Dashboard from "./dashboard/dashboard.jsx";
import UserDashboard from "./userDashboard/userDashboard.jsx"


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import * as actions from "../actions/categoriesActions";

class Home extends React.Component {
	constructor() {
		super();
	}

	componentWillMount() {
		// this.props.getAllCategories();
	}

	render() {
		// <Dashboard />
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

// function mapDispatchToProps(dispatch) {
// 	return bindActionCreators(actions, dispatch);
// }

// function mapStateToProps(state) {
// 	return {
// 		stateFromReducer: state
// 	};
// }

// const HomeConnected = connect(mapStateToProps, mapDispatchToProps)(Home);

// export default HomeConnected;
export default Home;
