import React from 'react'
import ListOfUsers from '../list-of-users/list-of-users.js';
import StatPanel from '../../containers/statistic-panel.jsx';
import Dashboard from "../dashboard/dashboard.jsx";
import CentralWindow from "../../containers/central-window.jsx";
import HistoryItem from './history-item'
import HistoryItemList from './history-item-list'
import HistoryQurterBar from './history-quarter-bar'
import HistorySearch from './history-search'
import HistoryFilter from './history-filter'
import HistorySort from './history-sort'
import './history-page.scss'
import historyMock from '../mockData/historyPageMock'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import * as actions from "../../actions/actions";

class HistoryPage extends React.Component {

	constructor() {
		super();
		this.state = {
			items: historyMock,
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

		return(
			<div>
			<CentralWindow>
				<ListOfUsers takeUser={this.takeUser} search={this.search}
									 searchValue={this.state.searchValue} data={this.state.data} />
				<div className="history-page">
					<div id="top-panel">
						<div className="history-page-header">
							<div className="history-page-header-row">
								<div className="history-page-title">
									History
								</div>
								<div className="history-search-bar-container">
									<HistorySearch/>
								</div>
							</div>
							<div className="history-page-header-row">
								<div className="history-filter-bar-container">
									<HistoryFilter/>
								</div>
								<div className="history-sort-bar-container">
									<HistorySort/>
								</div>
							</div>
						</div>
					</div>
					<HistoryItemList historyItems={this.state.items}/>
				</div>
				</CentralWindow>
				<StatPanel>
					<Dashboard></Dashboard>
				</StatPanel>
			</div>
		)
	}
}

export default HistoryPage