import React, { Component } from 'react';
import KeyResults from './key-results.jsx';
import Progress from './progress-bar.jsx';
import ObjectiveDescription from './objective-description.jsx';
import './objective.scss';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../actions/myStateActions.js";

class ObjectiveItem extends Component {
	constructor(props) {
		super(props);

		this.handleDelObj = this.handleDelObj.bind(this);
	}

	handleDelObj(e) {
		var confirmed = confirm("Do you really want to delete this objective?");
		
		if (confirmed) {
			this.props.softDeleteMyObjectiveByIdApi(this.props.item._id);
		}
	}

	render() {
		let objective = this.props.item;
		let changeKeyResultScore = this.props.changeKeyResultScore(objective._id);

		return (
			<div>
			<div className='home-objective'>
				<Progress data={ objective.keyResults } />
				<div className='name'>{ objective.templateId.title }</div>
				<ObjectiveDescription description={ objective.templateId.description } />
					<button type="button" className="btn btn-red-hover delete-button-objective"
					        onClick={ this.handleDelObj }>
						<i className="fi flaticon-garbage-2" aria-hidden="true"></i>
					</button>
			</div>
			<div className='otherUserKR'>
				<KeyResults 
						data={ objective.keyResults } 
						objectiveId={ objective._id }
						changeScore={ changeKeyResultScore }
						softDeleteObjectiveKeyResultByIdApi={ this.props.softDeleteObjectiveKeyResultByIdApi }
				/>
			</div>
			</div>
		)
	}
}

export default ObjectiveItem;
