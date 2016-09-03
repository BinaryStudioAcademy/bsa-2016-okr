import React, { Component } from 'react';
import KeyResults from '../common/objective/key-results-list.jsx';
import Progress from '../common/objective/progress-bar.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions/myStateActions.js'



class ObjectiveItem extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		let changeKeyResultScore = this.props.changeKeyResultScoreOne(this.props.item._id);
		let route = this.props.routing.locationBeforeTransitions.pathname;

		return (
			<div>
			<div className='objective'>
				<Progress data={this.props.item.keyResults}/>
					<div className='name'>{this.props.item.templateId.title}</div>
					<button className="btn btn-blue-hover clone" title="Clone">Clone to my objectives</button>
					<div className='description'>{this.props.item.templateId.description}</div>
			</div>
			<div className='otherUserKR'><KeyResults data={this.props.item.keyResults} changeScore={ changeKeyResultScore } route={route}/></div>
			</div>
			)
	}
}


function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state, ownProps) {
	return {
		routing: state.routing
	};
}

const ObjectiveItemConnected = connect(mapStateToProps, mapDispatchToProps)(ObjectiveItem);
export default ObjectiveItemConnected
