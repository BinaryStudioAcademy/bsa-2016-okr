import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from "../../../actions/acceptObjective.js";

class AcceptObjectiveItem extends Component {
	
	render() {

		  return (
		  	<div className="accept-objective-item">
			    <div className="row">
			        <div className="left-column">
				        <img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg"/>
			        </div>
			        <h2>Charles Mills</h2>
			        <button className="red-hover">Decline</button>
			        <button className="green-hover">Accept</button>				   
			    </div>
			    <div className="row">
			        <div className="left-column">
					    <span>objective</span>
				    </div>
				    <h3>Objective title</h3>
				    <span className="margin-right-23px category">projects</span>
			    </div>
			    <div className="row">
				    <div className="text-block">
					    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi .</p>
					</div>
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

const AcceptObjectiveItemConnected = connect(mapStateToProps, mapDispatchToProps)(AcceptObjectiveItem);
export default AcceptObjectiveItemConnected