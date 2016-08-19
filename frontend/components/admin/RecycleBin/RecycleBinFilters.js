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
		this.props.setFilterDateFrom(dateString);
	}

	onChangeTo(dateString, { dateMoment, timestamp }) {
		this.props.setFilterDateTo(dateString);
	}

	render() {

		const { usersNames } = this.props.recycleBin;

		return(
			<div>
			
			<div className={"recycle-bin-filter-bar "+ this.showFiltersContainer()}>
				<div className="filter-box clearfix">
						<div>
							<input type="checkbox" id="cbObjectives" defaultChecked={true} onClick={this.setObjectiveType.bind(this)}></input>
							<label htmlFor="cbObjectives">Objectives</label>
						</div>
						<div>
							<input type="checkbox" id="cbKey" onClick={this.setKeyType.bind(this)}></input>
							<label htmlFor="cbKey">Key</label>
						</div>
						<div>
							<input type="checkbox" id="cbCategory" onClick={this.setCategoryType.bind(this)}></input>
							<label htmlFor="cbCategory">Category</label>
						</div>
						<div>
							<input type="checkbox" id="cbSorting" onClick={this.setSortingByDate.bind(this)}></input>
							<label htmlFor="cbSorting">Sorting by Date</label>
						</div>

					</div>
				<table className="recycle-bin-filter-table">
					<tbody>
						<tr>
						    <td className="cell-right-align">
							    <input type="text" id="type-category-filter" placeholder="Enter type or category" ref="inputFilter" onChange={this.typeOrCategoryFilter.bind(this)}/>
						    </td>
							<td className="cell-right-align">Date: </td>
							<td>
								<DateField className="date-field" id="date-from" ref="dateFrom" placeholder="From" dateFormat="YYYY-MM-DD" onChange={this.onChangeFrom} footer={false} updateOnDateClick={true} collapseOnDateClick={true}/>
								<DateField className="date-field" id="date-to" placeholder="To" dateFormat="YYYY-MM-DD" onChange={this.onChangeTo} footer={false} updateOnDateClick={true} collapseOnDateClick={true}/>
							</td>
							<td>User Name: </td>
							<td>
								<select ref="userName" onChange={this.changeUserName.bind(this)}>
								   <option value="" id="reset-option">No one</option>
								   {usersNames.map(function(name) {
			                            return <option key={name.id} value={name.name}>{name.name}</option>
			                       })}
								</select>
							</td>
							<td className="cell-right-align" colSpan="2">
								<button className="btn btn-filter" onClick={this.reset.bind(this)}>Reset</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			</div>
			
		)
	}


	reset() {

		document.querySelector("#cbObjectives").checked = true;
		document.querySelector("#cbCategory").checked = false;
		document.querySelector("#cbKey").checked = false;
		document.querySelector("#cbSorting").checked = false;

		document.querySelector("#reset-option").selected = true;

		document.querySelector("#type-category-filter").value = "";

		/*
		document.querySelector("#date-from input").value = "";
		document.querySelector("#date-to input").value = "";
		document.querySelector("#date-from .react-date-field__clear-icon").click();
		document.querySelector("#date-to .react-date-field__clear-icon").click();
		*/

		this.props.updateAll("", "", "", true, false, false, false, "");

	}

	changeUserName() {
		this.props.setUserName(this.refs.userName.value);
	}

	typeOrCategoryFilter() {
		this.props.typeOrCategoryFilter(this.refs.inputFilter.value);
	}

    setCategoryType() {
		this.props.setCategoryType(document.querySelector("#cbCategory").checked);
	}

	setKeyType() {
		this.props.setKeyType(document.querySelector("#cbKey").checked);
	}

    setObjectiveType() {
		this.props.setObjectiveType(document.querySelector("#cbObjectives").checked);
	}

	setSortingByDate() {
		this.props.setSortingByDate(document.querySelector("#cbSorting").checked);
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
