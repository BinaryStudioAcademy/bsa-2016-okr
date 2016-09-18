import React, { Component } from 'react';

import './accept-objective.scss';

import AcceptObjectiveItem from './accept-objective-item';

import StatPanel from '../../../containers/statistic-panel.jsx';
import CentralWindow from "../../../containers/central-window.jsx";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/acceptObjectiveActions';



class AcceptObjective extends Component {
	render() {

		const { visibleItems } = this.props.acceptObj;

		return (
			<div id="accept-objective-wrapper">
			   
			    <input type="text" id="acc-obj-filter" placeholder="Search" onKeyUp={this.filter.bind(this)}/>

			    <p id="main-title"><span>Admin Accept Objective</span></p>

			    <div className="objective-list">
			           {visibleItems.map(function(item) {
                            return  <AcceptObjectiveItem key={item.id} item={item}/>;
                       })}
			    </div>

			</div>
			)
	}

	filter() {
	    let value = document.querySelector("#acc-obj-filter").value;
	    this.props.setFilter(value);
	}

	componentWillMount() {
	   this.props.clearObjApproveITems();
	   this.props.getNotAprovedObjectivesRequest();
	   this.props.getNotAprovedKeysRequest();
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