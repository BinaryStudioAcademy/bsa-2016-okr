import React, { Component } from 'react';
import RecBinItem from './recycle-bin-item';

import StatPanel from '../../../containers/statistic-panel.jsx';
import CentralWindow from "../../../containers/central-window.jsx";
import RecycleBinFilter from './recycle-bin-filters';
import '../../common/styles/table.scss';
import './recycle-bin.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from "../../../actions/recycleBinActions.js";

import ReactList from 'react-list';

import {NOT_SORTED, SORTED_ASC, SORTED_DESC} from "../../../../backend/config/constants";

class RecycleBin extends Component {

	constructor(props) {
		super(props);
		this.filterButtonState = this.filterButtonState.bind(this);
		this.handleFilterButton = this.handleFilterButton.bind(this);
	}

	handleFilterButton() {
		let button = document.querySelector("button.btn-filter");
      button.blur();
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

	renderItem(index, key) {

		let item = this.props.recycleBin.visibleItems[index];

   		return (
	   			<RecBinItem item={item} key={item.id} restoreItem={this.props.restoreItem}/>
   		);
  	}

	renderItems(items, ref) {
  		return ( <tbody className="no-hover" ref={ref}>{items}</tbody>)
  	}

	render() {

		let showFilters = this.props.recycleBin.showRecycleBinFilters;

		if (this.props.recycleBin.recycleBinItems.length === 0) {

			return (
				<div id="rec-bin-wrapper">
					<div className="recycle-bin-header">

						<div className="recycle-bin-header-row">
							<p><span>{this.props.title}</span></p>
						</div>
					</div>

					<h1 className="placeholder">Recycle bin is empty!</h1>
				</div>
			);
		}

		return (
			<div id="rec-bin-wrapper">
					<div className="recycle-bin-header">

						<div className="recycle-bin-header-row">
							<p><span>{this.props.title}</span></p>
						</div>

						<div className="recycle-bin-header-row width-85perc">
							<button className={"btn btn-blue btn-filter " + this.filterButtonState(showFilters)} 
								onClick={ this.handleFilterButton }
							>
								<i className="fi flaticon-funnel"/> Filter <i className={ `fi-1 flaticon-1-arrow-${ showFilters ? 'up' : 'down' }` }/>
							</button>
						</div>

						<div className="recycle-bin-header-row" >
								<div className="recucle-bin-filter-bar-container">
									<RecycleBinFilter visibleFilterCategories = {this.props.visibleFilterCategories}/>
								</div>
						</div>
					</div>
					
					<div>
						<table className='table filter-table'>
							<thead>
								<tr>
									<th className="width-20perc cursor-pointer" onClick={this.setSortingByTitle.bind(this)}><i id="title-field" className="fa fa-sort"></i><span className="margin-left-3px">Title</span></th>
									<th className="width-30perc">Description</th>
									<th>Type</th>
									<th>Category</th>
									<th>Deleted By</th>
									<th className="cursor-pointer" className="width-15perc" onClick={this.setSortingByDate.bind(this)}><i id="date-field" className="fa fa-sort-asc"></i><span className="margin-left-3px">Date</span></th>
									<th className="actions" className="width-5perc">Actions</th>
								</tr>
							</thead>
								<ReactList
									itemRenderer={this.renderItem.bind(this)}
									itemsRenderer={this.renderItems.bind(this)}
									length={this.props.recycleBin.visibleItems.length}
									type='simple'
									pageSize={5}
								/>
						</table>
					</div>
			</div>
		);
	}

    componentWillMount() {
       this.props.clearRecycleBin();
       this.props.getData();
    }

    componentWillUnmount() {
    	this.props.clearRecycleBin();
    }


	setSortingByTitle() {
		
		let titleField = document.querySelector(".filter-table #title-field");

		this.props.setSortingByDate(NOT_SORTED);

		if (titleField != null) {

			if (titleField.classList.contains("fa-sort-asc")) {

				titleField.classList.remove("fa-sort-asc");
				titleField.classList.add("fa-sort-desc");

				this.props.setSortingByTitle(SORTED_DESC);

			}
			else if (titleField.classList.contains("fa-sort-desc")){
				titleField.classList.remove("fa-sort-desc");
				titleField.classList.add("fa-sort-asc");
				this.props.setSortingByTitle(SORTED_ASC);
			}
			else {
				titleField.classList.remove("fa-sort");
				titleField.classList.add("fa-sort-asc");
				this.props.setSortingByTitle(SORTED_ASC);
			}
		} 

		let dateField = document.querySelector(".filter-table #date-field");

		if (dateField != null) {
			dateField.classList.remove("fa-sort-asc");
			dateField.classList.remove("fa-sort-desc");
			dateField.classList.add("fa-sort");
		}
	}

	setSortingByDate() {
		
		let dateField = document.querySelector(".filter-table #date-field");

		this.props.setSortingByTitle(NOT_SORTED);

		if (dateField != null) {

			if (dateField.classList.contains("fa-sort-asc")) {

				dateField.classList.remove("fa-sort-asc");
				dateField.classList.add("fa-sort-desc");

				this.props.setSortingByDate(SORTED_DESC);

			}
			else if (dateField.classList.contains("fa-sort-desc")){
				dateField.classList.remove("fa-sort-desc");
				dateField.classList.add("fa-sort-asc");
				this.props.setSortingByDate(SORTED_ASC);
			}
			else {
				dateField.classList.remove("fa-sort");
				dateField.classList.add("fa-sort-asc");
				this.props.setSortingByDate(SORTED_ASC);
			}
		} 

		let titleField = document.querySelector(".filter-table #title-field");

		if (titleField != null) {
			titleField.classList.remove("fa-sort-asc");
			titleField.classList.remove("fa-sort-desc");
			titleField.classList.add("fa-sort");
		}
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


const RecycleBinConnected = connect(mapStateToProps, mapDispatchToProps)(RecycleBin);
export default RecycleBinConnected