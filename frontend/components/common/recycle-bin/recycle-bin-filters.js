import React, {Component} from 'react'

import { DateField } from 'react-date-picker'
import 'react-date-picker/index.css'

import FilterCategoryItem from './recycle-bin-category-item'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../actions/recycleBinActions.js";
import {NOT_SORTED, SORTED_ASC, SORTED_DESC} from "../../../../backend/config/constants";

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

			<div className={"recycle-bin-filter-bar "+ this.showFiltersContainer()}>
				<div className="filter-box clearfix">

				        <FilterCategoryItem isVisible={this.props.visibleFilterCategories[0].isVisible} id={"cbObjectives"} onClickCallback={this.setObjectiveType.bind(this)} name="Objectives"/>
				        <FilterCategoryItem isVisible={this.props.visibleFilterCategories[1].isVisible} id={"cbKey"} onClickCallback={this.setKeyType.bind(this)} name="Key results"/>
				        <FilterCategoryItem isVisible={this.props.visibleFilterCategories[2].isVisible} id={"cbCategory"} onClickCallback={this.setCategoryType.bind(this)} name="Categories"/>

					</div>
				<table className="recycle-bin-filter-table">
					<tbody>
						<tr>
						    <td className="cell-right-align">
							    <input type="text" id="type-category-filter" placeholder="Enter type or category" onChange={this.typeOrCategoryFilter.bind(this)}/>
						    </td>
							<td className="cell-right-align">Date: </td>
							<td className="no-wrap">
								<DateField
									className="date-field"
									placeholder="From"
									dateFormat="D MMMM YYYY"
									onChange={this.onChangeFrom}
									footer={false}
									updateOnDateClick={true}
									collapseOnDateClick={true}
									theme={false}
									ref="dateFrom"/>
								<DateField
									className="date-field"
									placeholder="To"
									dateFormat="D MMMM YYYY"
									onChange={this.onChangeTo}
									footer={false}
									updateOnDateClick={true}
									collapseOnDateClick={true}
									theme={false}
									ref="dateTo"/>
							</td>
							<td>
								<select ref="userName" onChange={this.changeUserName.bind(this)}>
								   <option id="reset-option" value="" disabled className="not-display">By User Name</option>
								   <option value="">No one</option>
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

		)
	}


	reset() {

		document.querySelector("#cbObjectives").checked = true;
		document.querySelector("#cbKey").checked = true;
		document.querySelector("#cbCategory").checked = true;

		document.querySelector("#reset-option").selected = true;

		document.querySelector("#type-category-filter").value = "";

		this.refs.dateFrom.onFieldChange('');
		this.refs.dateTo.onFieldChange('');

		this.props.updateAll("", "", "", true, true, SORTED_DESC, true, "", false);

	}

	componentDidMount() {
		document.querySelector("#reset-option").selected = true;
	}

	changeUserName() {
		this.props.setUserName(this.refs.userName.value);
	}

	typeOrCategoryFilter() {

		let typeOrCategoryFilter = document.querySelector("#type-category-filter");

		if (typeOrCategoryFilter)
			this.props.typeOrCategoryFilter(typeOrCategoryFilter.value);
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
