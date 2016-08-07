import React, { Component } from 'react'
import ListOfUsers from './list-of-users.js';
import PersonInfo from './persons-info.js';
import Header from "../../containers/header.jsx";
import NavMenu from ".././nav-menu.jsx";
import Search from '.././search-bar.jsx';
import CentralPage from "../../containers/central-page.jsx";
import StatPanel from "../../containers/statistic-panel.jsx";

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
				<Header />
				<NavMenu />
				<CentralPage>
					<PersonInfo data={this.state.data} id={this.state.id} />
					<ListOfUsers takeUser={this.takeUser} search={this.search}
					 searchValue={this.state.searchValue} data={this.state.data} />
				</CentralPage>
            	<StatPanel></StatPanel>
			</div>
		)
	}
}

export default OtherPersonsPage