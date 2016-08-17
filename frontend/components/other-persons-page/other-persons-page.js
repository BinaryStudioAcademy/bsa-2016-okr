import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../actions/otherPersonActions.js";

import ListOfUsers from '../list-of-users/list-of-users.jsx';
import PersonInfo from './persons-info.js';
import UserOjectives from './user-objectives.js';
import CentralWindow from "../../containers/central-window.jsx";
import StatPanel from "../../containers/statistic-panel.jsx";
import Dashboard from "../dashboard/dashboard.jsx";

class OtherPersonsPage extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount(){
		this.props.sendRequest(this.props.id);
	}
	render() {
		const {user, id} = this.props.stateFromReducer.users;
		console.log(user, id)
		var userItem = user.filter(function(user, index) {
			if (user.userId == id)
				return true;
		})
		return (
			<div>
				<CentralWindow>
					<PersonInfo data={userItem[0]} />
					<UserOjectives data={userItem[0]}/>
				</CentralWindow>
				<StatPanel>
					<Dashboard></Dashboard>
				</StatPanel>
			</div>
		)
	}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state, ownProps) {
	return {
		id: ownProps.params.userId,
		stateFromReducer: state
	};
}

const OtherPersonsPageConnected = connect(mapStateToProps, mapDispatchToProps)(OtherPersonsPage);
export default OtherPersonsPageConnected
