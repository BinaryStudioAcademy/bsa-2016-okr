import React, {Component} from 'react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../actions/historyActions";

import '../../common/styles/commonStyles.scss'
import './history-search.scss'

class HistorySearch extends Component {

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
		let show = this.props.stateFromReducer.history.showHistoryFilters;
		this.props.showFilters(!show);
	}

	render() {

		return(
			<div className="history-search-bar">
				<button className={"btn btn-blue btn-filter " + this.filterButtonState(this.props.stateFromReducer.history.showHistoryFilters)} onClick={this.handleFilterButton}><i className="fa fa-filter"/> Filter <i className="fa fa-caret-down"/></button>
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

const HistorySearchConnected = connect(mapStateToProps, mapDispatchToProps)(HistorySearch);
export default HistorySearchConnected