import React, {Component} from 'react'

import { DateField } from 'react-date-picker'
import 'react-date-picker/index.css'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../actions/recycleBinActions.js";

class RecycleBinFilter extends Component {

	constructor(props) {
		super(props);

		this.showFiltersContainer = this.showFiltersContainer.bind(this);
		this.onChangeFrom = this.onChangeFrom.bind(this);
		this.onChangeTo = this.onChangeTo.bind(this);
		this.filterButtonState = this.filterButtonState.bind(this);
		this.handleFilterButton = this.handleFilterButton.bind(this);
	}
	
	handleFilterButton() {
		let show = this.props.recycleBin.showRecycleBinFilters;
		this.props.showFilters(!show);
	}
	filterButtonState(show) {
		if (show) {
			return 'active-button'
		} else {
			return ''
		}
	}
	showFiltersContainer() {
		if (this.props.recycleBin.showRecycleBinFilters) {
			return "show-container"
		} else {
			return "hide-container"
		}
		return "hide-container";
	}

	onChangeFrom(dateString, { dateMoment, timestamp }) {
		  console.log(dateString);
			this.props.setFilterDateFrom(dateString);
	}

	onChangeTo(dateString, { dateMoment, timestamp }) {
			console.log(dateString);
			this.props.setFilterDateTo(dateString);
	}

	render() {

		return(
			<div> <button className={"btn btn-blue btn-filter " + this.filterButtonState(this.props.recycleBin.showRecycleBinFilters)} 
							onClick={this.handleFilterButton}>
			<i className="fa fa-filter"/> Filter <i className="fa fa-caret-down"/></button>
			<div className={"recycle-bin-filter-bar "+ this.showFiltersContainer()}>
				<table className="recycle-bin-filter-table">
					<tbody>
						<tr>
							<td className="cell-right-align">Date: </td>
							<td>
								<DateField className="date-field" placeholder="From" dateFormat="YYYY-MM-DD" onChange={this.onChangeFrom} footer={false} updateOnDateClick={true} collapseOnDateClick={true}/>
								<DateField className="date-field" placeholder="To" dateFormat="YYYY-MM-DD" onChange={this.onChangeTo} footer={false} updateOnDateClick={true} collapseOnDateClick={true}/>
							</td>
							<td className="cell-right-align" colSpan="2">
								<button className="btn btn-filter">Reset</button>
							</td>
						</tr>
					</tbody>
				</table>
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
		recycleBin: state.recycleBin
	};
}

const RecycleBinFilterConnected = connect(mapStateToProps, mapDispatchToProps)(RecycleBinFilter);
export default RecycleBinFilterConnected
