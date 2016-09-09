import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../actions/acceptObjective.js";
const notifications = require("../../../actions/notifications.js");


class AcceptObjectiveItem extends Component {
	
	render() {

		  return (
		  	<div className="accept-objective-item">
		  		<button className="red-hover" onClick={this.decline.bind(this)}>Decline</button>
			  	<button className="green-hover" onClick={this.accept.bind(this)}>Accept</button>	
			  	
			    <div className="objective-general-info">
				    <span className="type">{this.props.item.type}</span>
				    <span className="margin-right-23px category">{this.props.item.category}</span>
			    </div>
		        <div className="objective-text-info">			    
				    <h3>{this.props.item.title}</h3>
				    <div className="text-block">
					    <p>{this.props.item.description}</p>
						</div>
			    </div>
			    <div className="row">
			        <div className="left-column">
				        <img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg"/>
			        </div>
			        <h2>{this.props.item.userName}</h2>			   
			    </div>
		    
		    </div>
		   )
	}

	decline(id) {

		if (this.props.item.type === "objective") {
			
			let body = {};		
			body.isDeclined = true;

			this.props.updateObjectiveTemplateRequest(this.props.item.id, body, this.props.item.id, 
				notifications.NotificationObjTemplateDeclined, this.props.item.userId);
		}

		if (this.props.item.type === "key result") {
			
			let body = {};			
			body.isDeclined = true;

			this.props.updateKeyTemplateRequest(this.props.item.id, body, this.props.item.id);
		}
		
	}

	accept(id) {

		if (this.props.item.type === "objective") {
			
			let body = {};		
			body.isApproved = true;

			this.props.updateObjectiveTemplateRequest(this.props.item.id, body, this.props.item.id,
				notifications.NotificationObjTemplateAccepted, this.props.item.userId);
		}

		if (this.props.item.type === "key result") {
			
			let body = {};			
			body.isApproved = true;

			this.props.updateKeyTemplateRequest(this.props.item.id, body, this.props.item.id,
				notifications.NotificationKeyTemplateAccepted, this.props.item.userId);
		}

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