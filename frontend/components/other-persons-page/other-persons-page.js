import React, { Component } from 'react'
import ListOfUsers from '../list-of-users/list-of-users.js';
import PersonInfo from './persons-info.js';
import UserOjectives from './user-objectives.js';
import CentralWindow from "../../containers/central-window.jsx";
import StatPanel from "../../containers/statistic-panel.jsx";
import ChatTimeline from "../objectiveView/chatTimeline/chatTimeline.js";

import users from '../mockData/users.js';
import objectives from '../mockData/objectivesMock.js';

class OtherPersonsPage extends Component {
	constructor() {
		super();
		this.state = {
			searchValue: '',
			id: '',
	}
		this.search = this.search.bind(this);
		this.takeUser = this.takeUser.bind(this);
	}
	takeUser(id) {
		console.log(id)
		this.setState({
			id: id
		})
	}

	search(value) {
		this.setState({
			searchValue: value
		})
	}

	render() {
		return (
			<div>
				<CentralWindow>
					<PersonInfo data={this.props.users} 
								id={this.state.id} />
					<UserOjectives data={this.props.objectives}/>
					<ListOfUsers takeUser={this.takeUser} 
								search={this.search}
								searchValue={this.state.searchValue} />
				</CentralWindow>
				<StatPanel></StatPanel>
			</div>
		)
	}
}
OtherPersonsPage.defaultProps = {
	users: users,
	objectives: objectives
}
export default OtherPersonsPage