import React, { Component } from 'react';

import './accept-objective.scss';

import AcceptObjectiveItem from './accept-objective-item';

import StatPanel from '../../../containers/statistic-panel.jsx';
import CentralWindow from "../../../containers/central-window.jsx";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from "../../../actions/acceptObjective.js";



class AcceptObjective extends Component {
	render() {

		return (
			<div id="accept-objective-wrapper">
			   
			    <input type="text" placeholder="Search"/>

			    <p id="main-title"><span>Admin Accept Objective</span></p>

			    <div className="objective-list">
				    <AcceptObjectiveItem/>
				    <AcceptObjectiveItem/>
				    <AcceptObjectiveItem/>
				    <AcceptObjectiveItem/>
				    <AcceptObjectiveItem/>
				    <AcceptObjectiveItem/>
				    <AcceptObjectiveItem/>
				    <AcceptObjectiveItem/>
				    <AcceptObjectiveItem/>
				    <AcceptObjectiveItem/>
				    <AcceptObjectiveItem/>
				    <AcceptObjectiveItem/>
				    <AcceptObjectiveItem/>
				    <AcceptObjectiveItem/>
				    <AcceptObjectiveItem/>
				    <AcceptObjectiveItem/>
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
		acceptObj: state.acceptObj
	};
}


const AcceptObjectiveConnected = connect(mapStateToProps, mapDispatchToProps)(AcceptObjective);
export default AcceptObjectiveConnected