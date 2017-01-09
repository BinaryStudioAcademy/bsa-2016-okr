import React, { Component } from 'react';

import './accept-objective.scss';

import AcceptObjectiveItem from './accept-objective-item';

import StatPanel from '../../../containers/statistic-panel.jsx';
import CentralWindow from "../../../containers/central-window.jsx";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/acceptObjectiveActions';

class AcceptObjective extends Component {
	constructor() {
	super();
	this.splitToPages = this.splitToPages.bind(this);
	this.showNextPage = this.showNextPage.bind(this);
	this.showPreviousPage = this.showPreviousPage.bind(this);
	this.state = {currentPage: 0};
}

	render() {
		var currentPage = this.state.currentPage;
		var allVisibleItems = this.props.acceptObj.visibleItems;
		var paginated = [];

		if (allVisibleItems != undefined) {
			paginated = this.splitToPages(allVisibleItems);
	  }

		var visibleItems = [];
		if(paginated != undefined && paginated[currentPage] != undefined) {
			visibleItems = paginated[currentPage];
		}

		var nextPage = null;
		var previousPage = null;
		var pageInfo = null;

		if (paginated.length > 1) {
			pageInfo = <div className="pagination">Page {currentPage+1} of {paginated.length}</div>
		}

		if (currentPage+1 < paginated.length) {
			nextPage = <span className="arrow" onClick={this.showNextPage}>→</span>
		}

		if (currentPage != 0) {
			previousPage = <span className="arrow" onClick={this.showPreviousPage}>←</span>
		}

		return (
			<div id="accept-objective-wrapper">
			    <input type="text" id="acc-obj-filter" placeholder="Search" onKeyUp={this.filter.bind(this)}/>
			    <p id="main-title">{previousPage}<span>Admin Accept Objective</span>{nextPage}</p>
					{pageInfo}
			    <div className="objective-list">
			           {visibleItems.map(function(item) {
                            return  <AcceptObjectiveItem key={item.id} item={item}/>;
                       })}
			    </div>
			</div>
			)
	}

	splitToPages(items) {
		var i,j,temparray,chunk = 10;
		var result = [];
		for (i=0,j=items.length; i<j; i+=chunk) {
		    temparray = items.slice(i,i+chunk);
				result.push(temparray);
		}
		return result;
	}

	showPreviousPage() {
		this.setState({currentPagey: this.state.currentPage--});
	}

	showNextPage() {
		this.setState({currentPagey: this.state.currentPage++});
	}

	filter() {
	    let value = document.querySelector("#acc-obj-filter").value;
	    this.props.setFilter(value);
	}

	componentWillMount() {
		// this.props.clearObjApproveITems();
		// this.props.getNotAprovedObjectivesRequest();
		// this.props.getNotAprovedKeysRequest();
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
	return {
		acceptObj: state.acceptObj
	};
}


const AcceptObjectiveConnected = connect(mapStateToProps, mapDispatchToProps)(AcceptObjective);
export default AcceptObjectiveConnected
