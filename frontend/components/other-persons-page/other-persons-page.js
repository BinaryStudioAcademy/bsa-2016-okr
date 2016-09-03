import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../actions/otherPersonActions.js";

import PersonInfo from './persons-info.js';
import UserOjectives from '../common/objective/objectives.jsx';
import CentralWindow from "../../containers/central-window.jsx";
import StatPanel from "../../containers/statistic-panel.jsx";
import Dashboard from "../dashboard/dashboard.jsx";
import UserDashboard from "../userDashboard/userDashboard.jsx";

const session = require("../../../backend/config/session");

class OtherPersonsPage extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		var urlArray = this.props.routing.pathname.split('/');
		var id = urlArray[urlArray.length - 1];
		this.props.getUser(id);
	}

	render() {
		if (this.props.user.waiting) {
			return <div></div>
		} else {
			var urlArray = this.props.routing.pathname.split('/');
			var id = urlArray[urlArray.length - 1];
			var personInfo;

			if (id != session._id) {
				personInfo = (<PersonInfo />);
			}

			return (
				<div>
					<CentralWindow>
						{ personInfo }
						<UserOjectives route={this.props.routing.pathname}/>
					</CentralWindow>
					<StatPanel>
						<UserDashboard where="otherPersonPage"/>
						{/*<Dashboard></Dashboard>*/}
					</StatPanel>
				</div>
			)
		}
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state, ownProps) {
	return {
		user: state.userPage,
		routing: state.routing.locationBeforeTransitions,
		categories: state.categories
	};
}

const OtherPersonsPageConnected = connect(mapStateToProps, mapDispatchToProps)(OtherPersonsPage);
export default OtherPersonsPageConnected