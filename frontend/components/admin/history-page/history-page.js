import React from 'react'
import StatPanel from '../../../containers/statistic-panel.jsx';
import Dashboard from "../../dashboard/dashboard.jsx";
import CentralWindow from "../../../containers/central-window.jsx";
// import HistoryItem from './history-item'
import HistoryItemList from './history-item-list';
// import HistoryQurterBar from './history-quarter-bar'
import HistorySearch from './history-search';
import HistoryFilter from './history-filter';
import HistorySort from './history-sort';
import './history-page.scss'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../actions/historyActions";

class HistoryPage extends React.Component {
	constructor(props) {
		super(props);
		this.filterButtonState = this.filterButtonState.bind(this);
		this.handleFilterButton = this.handleFilterButton.bind(this);
	}

	filterButtonState(show) {
		if (show) {
			return 'active-button'
		} else {
			return ''
		}
	}

	handleFilterButton() {
		let show = this.props.history.showHistoryFilters;
		this.props.showFilters(!show);
	}

	render() {
		return(
			<div className="history-page-window">
			<div className="main-content">
				<div className="history-page">
					<div id="top-panel">
						{/*historyItems: {console.log(this.props.historyItems)}*/}
						<div className="history-page-header">
							<div className="history-page-header-row">

								<div className="history-page-title">
									<p><span>History</span></p>
								</div>
								<div className="history-filter-container">
									<button className={"btn btn-blue btn-filter " + this.filterButtonState(this.props.history.showHistoryFilters)} onClick={this.handleFilterButton}><i className="fa fa-filter"/> Filter <i className="fa fa-caret-down"/></button>
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
				</div>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
	return {
		history: state.history
	};
}

const HistoryPageConnected = connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
export default HistoryPageConnected

