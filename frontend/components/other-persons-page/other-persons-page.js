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
		console.log('other-persons-page.js mounted');
		console.log('Mounted props: ', this.props);
		console.log('Getting user info...');
		let id = this.props.routeParams.id;
		this.props.getUser(id);
	}

	render() {
		console.log('other-persons-page.js RENDER');
		console.log('this.props.user', this.props.user);
		console.log('Props', this.props);

		console.log('other-persons-page.js USER_ID:', this.props.routeParams.id);

		if (this.props.user.waiting) {
			return <div></div>
		} else {
			var id = this.props.routeParams.id;
			var personInfo;

			if (id != session) {
				personInfo = (<PersonInfo userId={ this.props.routeParams.id } />);
			}

			return (
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
	};
}

const OtherPersonsPageConnected = connect(mapStateToProps, mapDispatchToProps)(OtherPersonsPage);
export default OtherPersonsPageConnected