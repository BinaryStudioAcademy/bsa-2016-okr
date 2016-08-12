import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../actions/otherPersonActions.js";

import ListOfUsers from '../list-of-users/list-of-users.jsx';
import PersonInfo from './persons-info.js';
import UserOjectives from './user-objectives.js';
import CentralWindow from "../../containers/central-window.jsx";
import StatPanel from "../../containers/statistic-panel.jsx";

class OtherPersonsPage extends Component {
	constructor(props) {
		super(props);
	}


	render() {
		const {userItem} = this.props.stateFromReducer.users;

		return (
			<div>
				<CentralWindow>
					<PersonInfo data={userItem} />
					<UserOjectives data={userItem}/>
				</CentralWindow>
				<StatPanel></StatPanel>
			</div>
		)
	}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
	return {
		stateFromReducer: state
	};
}

const OtherPersonsPageConnected = connect(mapStateToProps, mapDispatchToProps)(OtherPersonsPage);
export default OtherPersonsPageConnected