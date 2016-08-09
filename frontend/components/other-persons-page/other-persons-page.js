import React, { Component } from 'react'
import ListOfUsers from '../list-of-users/list-of-users.js';
import PersonInfo from './persons-info.js';
import UserOjectives from './user-objectives.js';
import CentralWindow from "../../containers/central-window.jsx";
import StatPanel from "../../containers/statistic-panel.jsx";
import ChatTimeline from "../objectiveView/chatTimeline/chatTimeline.js";

class OtherPersonsPage extends Component {
	constructor() {
		super();
		this.state = {
			searchValue: '',
			id: '',
			data: [
				{
					id: 0,
					name: 'Kelly Bloom',
					photo: 0
				},
				{
					id: 1,
					name: 'Josh Peterson',
					photo: 0
				},
				{
					id: 2,
					name: 'Sahan Roman',
					photo: 0
				},
				{
					id: 3,
					name: 'Taras Barladun',
					photo: 0
				},
				{
					id: 4,
					name: 'Roman Vintish',
					photo: 0
				}
			]
		}
		this.search = this.search.bind(this);
		this.takeUser = this.takeUser.bind(this);
	}
	takeUser(id) {
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
					<PersonInfo data={this.state.data} id={this.state.id} />
					<UserOjectives />
					<ListOfUsers takeUser={this.takeUser} search={this.search}
								searchValue={this.state.searchValue} data={this.state.data} />
				</CentralWindow>
				<StatPanel><ChatTimeline /></StatPanel>
			</div>
		)
	}
}

export default OtherPersonsPage