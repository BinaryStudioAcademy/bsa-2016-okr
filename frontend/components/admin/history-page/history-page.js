import React from 'react'
import { DateField } from 'react-date-picker'
import 'react-date-picker/index.css'
import StatPanel from '../../../containers/statistic-panel.jsx';
import Dashboard from "../../dashboard/dashboard.jsx";
import CentralWindow from "../../../containers/central-window.jsx";
// import HistoryItem from './history-item'
import HistoryItemList from './history-item-list';
// import HistoryQurterBar from './history-quarter-bar'
import HistorySearch from './history-search';
import HistoryFilter from './history-filter';
import './history-page.scss'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../actions/historyActions";

class HistoryPage extends React.Component {

	render() {
		return(
			<div>
			<CentralWindow>
				<div className="history-page">
					<div id="top-panel">
						{/*historyItems: {console.log(this.props.historyItems)}*/}
						<div className="history-page-header">
							<div className="history-page-header-row">
								<div className="history-page-title">
									History
								</div>
                <div className="date-picker"><DateField dateFormat="YYYY-MM-DD"/></div>
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
					<HistoryItemList/>
				</div>
				</CentralWindow>
				<StatPanel>
					<Dashboard/>
				</StatPanel>
			</div>
		)
	}
}

export default HistoryPage
