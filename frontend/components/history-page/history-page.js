import React from 'react'
import StatPanel from '../../containers/statistic-panel.jsx';
import Dashboard from "../dashboard/dashboard.jsx";
import CentralWindow from "../../containers/central-window.jsx";
import HistoryItem from './history-item'
import HistoryItemList from './history-item-list'
import HistoryQurterBar from './history-quarter-bar'
import HistorySearch from './history-search'
import HistoryFilter from './history-filter'
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
		}
	}

	

	render() {

		return(
			<div>
			<CentralWindow>
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