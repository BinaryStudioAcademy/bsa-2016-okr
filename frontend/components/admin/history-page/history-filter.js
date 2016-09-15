import React, {Component} from 'react'

import { DateField } from 'react-date-picker'
import 'react-date-picker/index.css'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../actions/historyActions";

import '../../common/styles/commonStyles.scss'
import './history-filter.scss'

class HistoryFilter extends Component {

	constructor(props) {
		super(props);
		this.onChangeFrom = this.onChangeFrom.bind(this);
		this.onChangeTo = this.onChangeTo.bind(this);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeType = this.onChangeType.bind(this);
		this.setFilters = this.setFilters.bind(this);
		this.onReset = this.onReset.bind(this);
		this.restoreDefaultIcons = this.restoreDefaultIcons.bind(this);
		this.unmarkAll = this.unmarkAll.bind(this);
	}

	setFilters() {
		console.log(`type: ${type}\n name: ${name}\n date: ${date}\n`)
		this.props.getFilteredItems();
	}

	onReset(){
		this.props.resetFilters();
		this.props.getFilteredItems();
		this.refs.dateFrom.onFieldChange('');
		this.refs.dateTo.onFieldChange('');
		this.restoreDefaultIcons();
		this.unmarkAll();
	}

	 unmarkAll(){
      let list = document.getElementsByClassName('user');
      Array.prototype.forEach.call(list, (item) => {
        if(item.className.indexOf('bold') !== -1)
           item.className = item.className.substr(0, item.className.indexOf('bold')-1);
      });
      list = document.getElementsByClassName('action');
      Array.prototype.forEach.call(list, (item) => {
        if(item.className.indexOf('bold') !== -1)
           item.className = item.className.substr(0, item.className.indexOf('bold')-1);
      });
      list = document.getElementsByClassName('target');
      Array.prototype.forEach.call(list, (item) => {
        if(item.className.indexOf('bold') !== -1)
           item.className = item.className.substr(0, item.className.indexOf('bold')-1);
      });
      list = document.getElementsByClassName('date');
      Array.prototype.forEach.call(list, (item) => {
        if(item.className.indexOf('bold') !== -1)
           item.className = item.className.substr(0, item.className.indexOf('bold')-1);
      });
    }

	 restoreDefaultIcons ()  {
      document.getElementById('user').className = "fa fa-sort";
      document.getElementById('action').className = "fa fa-sort";
      document.getElementById('target').className = "fa fa-sort";
      document.getElementById('date').className = "fa fa-sort";
    }

	onChangeFrom(dateString, { dateMoment, timestamp }) {
		this.props.setFilterDateFrom(dateString);
		this.props.getFilteredItems();
	}

	onChangeTo(dateString, { dateMoment, timestamp }) {
		this.props.setFilterDateTo(dateString);
		this.props.getFilteredItems();
	}

	onChangeName(event) {
		var value = event.target.value;
		this.props.setNameFilter(value);
		this.props.getFilteredItems();
	}

	onChangeType(event) {
		var value = event.target.value;
		this.props.setTypeFilter(value);
		this.props.getFilteredItems();
	}

	render() {

		return(
			<div className={"history-filter-bar"}>
				<table className="history-filter-table">
					<tbody>
						<tr>
							<td><input className="history-filter-bar-input" type="text" placeholder="Username" onChange={this.onChangeName}/></td>
							<td>
								<select value="" onChange={this.onChangeType}>
									<option value="">Action</option>
									<option value="add">Create</option>
									<option value="update">Update</option>
									<option value="delete">Delete</option>
								</select>
							</td>
							<td className="cell-right-align">Date: </td>
							<td>
								<DateField
									className="date-field"
									placeholder="From"
									dateFormat="YYYY-MM-DD"
									onChange={this.onChangeFrom}
									footer={false}
									updateOnDateClick={true}
									collapseOnDateClick={true}
									theme={false}
									ref="dateFrom"/>
								<DateField
									className="date-field"
									placeholder="To"
									dateFormat="YYYY-MM-DD"
									onChange={this.onChangeTo}
									footer={false}
									updateOnDateClick={true}
									collapseOnDateClick={true}
									theme={false}
									ref="dateTo"/>
							</td>
							<td className="cell-right-align" colSpan="3">
								<button onClick={this.onReset} className="btn btn-filter">Reset</button>
							</td>
						</tr>
					</tbody>
				</table>
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

const HistoryFilterConnected = connect(mapStateToProps, mapDispatchToProps)(HistoryFilter);
export default HistoryFilterConnected
