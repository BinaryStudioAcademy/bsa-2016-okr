import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { isEmpty } from '../../../backend/utils/ValidateService';

import * as actions from "../../actions/otherPersonActions.js";

import PersonInfo from './persons-info.js';
import UserOjectives from '../common/objective/objectives.jsx';
import CentralWindow from "../../containers/central-window.jsx";
import StatPanel from "../../containers/statistic-panel.jsx";
import Dashboard from "../dashboard/dashboard.jsx";
import UserDashboard from "../userDashboard/userDashboard.jsx";

import cookie from 'react-cookie';
const session = cookie.load('user-id');

import './error.scss';

class OtherPersonsPage extends Component {
	constructor(props) {
		super(props);
	}

	// componentWillUpdate(nextProps, nextState) {
	// 	console.log('Getting user info for component update...');
	// 	console.log('Next props', nextProps);
	// 	let id = nextProps.routeParams.id;
	// 	nextProps.getUser(id);
	// }

	// shouldComponentUpdate(nextProps, nextState) {
	// 	console.log('route current ID: ', this.props.routeParams.id);
	// 	console.log('route next ID: ', nextProps.routeParams.id);
	// 	console.log('user is empty: ', isEmpty(this.props.user.user));
	// 	console.log('nextProps user is empty: ', isEmpty(nextProps.user.user));

	// 	let userLoaded = this.props.user.waiting && !nextProps.user.waiting;

	// 	return userLoaded;
	// }

	componentWillMount() {
		let id = this.props.routeParams.id;
		this.props.getUser(id);
	}

	render() {
		let otherPersonContent = (<div></div>);
		
		if (!this.props.user.waiting) {
			var id = this.props.routeParams.id;
			var personInfo;

			if (id != session) {
				personInfo = (<PersonInfo userId={ this.props.routeParams.id } />);
			}

			if(this.props.user.error) {
				otherPersonContent = (
					<div className="nothing-found">
						<h3> {this.props.user.error}Whoops, nothing found </h3>
					</div>
				);
			}	else {
				otherPersonContent = (
					<div>
						<CentralWindow>
							{ personInfo }
							<UserOjectives userId={ this.props.routeParams.id } />
						</CentralWindow>
						<StatPanel>
							<UserDashboard where="otherPersonPage"/>
							{/*<Dashboard></Dashboard>*/}
						</StatPanel>
					</div>
				);
			}
		}

		return ({ otherPersonContent });
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state, ownProps) {
	return {
		user: state.userPage,
	};
}

const OtherPersonsPageConnected = connect(mapStateToProps, mapDispatchToProps)(OtherPersonsPage);
export default OtherPersonsPageConnected
