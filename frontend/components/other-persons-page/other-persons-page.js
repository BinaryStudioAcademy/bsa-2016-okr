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
		var urlArray = this.props.routing.pathname.split('/');
		var id = urlArray[urlArray.length - 1]
		this.props.sendRequest(id);
	}
	render() {
		console.log( this.props.users.waiting)
		if (this.props.users.waiting){
			return <div></div>
		}
		else {
		
		var id = this.props.users.id;
		const {user} = this.props.users;

		var userItem = user.find(function(user, index) {
			if (user.userId == id)
				return true;
		})
		return (
			<div>
				<CentralWindow>
					<PersonInfo data={userItem} />
					<UserOjectives data={userItem}/>
				</CentralWindow>
				<StatPanel>
					<Dashboard></Dashboard>
				</StatPanel>
			</div>
		)
	}
}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
	return {
		users: state.users,
		routing: state.routing.locationBeforeTransitions
	};
}

const OtherPersonsPageConnected = connect(mapStateToProps, mapDispatchToProps)(OtherPersonsPage);
export default OtherPersonsPageConnected
