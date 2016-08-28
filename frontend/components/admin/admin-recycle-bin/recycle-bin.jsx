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

class RecycleBin extends Component {

	constructor(props) {
		super(props);
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


	renderItem(index, key) {

		let item = this.props.recycleBin.visibleItems[index];

   		return (
	   			<RecBinItem item={item} key={item.id} />
   		);
  	}


	renderItems(items, ref) {
  		return ( <tbody ref={ref}>{items}</tbody>)
  	}


	render() {

		return (
			<div id="rec-bin-wrapper">
					<div className="recycle-bin-header">

						<div className="recycle-bin-header-row">
							<p><span>Admin Recycle bin</span></p>
						</div>

						<div className="recycle-bin-header-row" className="width-85perc">
							<button className={"btn btn-blue btn-filter " + this.filterButtonState(this.props.recycleBin.showRecycleBinFilters)} 
									onClick={this.handleFilterButton}>
							<i className="fa fa-filter"/> Filter <i className="fa fa-caret-down"/></button>
						</div>

						<div className="recycle-bin-header-row">
								<div className="recucle-bin-filter-bar-container">
									<RecycleBinFilter/>
								</div>
						</div>
					</div>
					
					<div>
						<table className='table filter-table'>
							<thead>
								<tr>
									<th className="width-20perc">Title</th>
									<th className="width-30perc">Description</th>
									<th>Type</th>
									<th>Category</th>
									<th>Deleted By</th>
									<th className="cursor-pointer" className="width-15perc" onClick={this.setSortingByDate.bind(this)}><i className="fa fa-sort" ></i><span className="margin-left-3px">Date</span></th>
									<th className="actions" className="width-5perc">Actions</th>
								</tr>
							</thead>
								<ReactList
									itemRenderer={::this.renderItem}
									itemsRenderer={::this.renderItems}
									length={this.props.recycleBin.visibleItems.length}
									type='simple'
									pageSize={100}
								/>
						</table>
					</div>
			</div>
		);
	}


    componentWillMount() {

       this.props.clearRecycleBin();
        //this.props.getUserDeletedObjectivesRequest();
        //this.props.getUserObjectivesRequest();
       this.props.getObjectiveTemplatesRequest();
       this.props.getKeyResultsTemplatesRequest();
       this.props.getDeletedCategoriesRequest();
       // console.log(this.props);
      //this.props.getUserObjectivesRequest();
    }

	setSortingByDate() {
		this.props.setSortingByDate(!this.props.recycleBin.sortByDate);
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