import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../../actions/okrManagingActions.js";

class KeyResult extends Component {
	constructor(props) {
		super(props);

	this.deleteObjective = this.deleteObjective.bind(this);
  	}
	deleteObjective(){
		var result = confirm('Do you really want to delete key result?');
		if (result){
			let i = this.props.item._id;
	    	this.props.deleteKeyResult(i, true)
	   	}
	}
	render() {
			return (
				<li className="key-result-item">
					<div className='name'>{this.props.item.title}</div>
					<div className='difficulty'>{this.props.item.difficulty}</div>
					<div className='edit-key-result'>
						<i className="fi flaticon-edit" aria-hidden="true" onClick={this.editObjective}></i>
						<i className="fi flaticon-garbage-2" aria-hidden="true" onClick={this.deleteObjective}></i>
					</div>
				</li>
			)
	}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
  return {
    objectivesList: state.okrManaging
  };
}

const KeyResultConnected = connect(mapStateToProps, mapDispatchToProps)(KeyResult);
export default KeyResultConnected
