import React, { Component } from 'react';
import KeyResults from './key-results.jsx';
import Progress from './progress-bar.jsx';
import ObjectiveDescription from './objective-description.jsx';
import './objective.scss';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../actions/myStateActions.js";
const session = require('../../../backend/config/session');

class ObjectiveItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			item: props.item
		}

		this.changeScore = this.changeScore.bind(this);
		this.handleDelObj = this.handleDelObj.bind(this);
	}

	changeScore() {
		this.setState({
			item: this.state.item
		})
	}

	handleDelObj(e) {
		
		var confirmation = confirm("Do you really want to delete this objective?");
		
		if (confirmation == true) {
			var body = {
				"isDeleted": "true",
				"deletedBy": session._id,
				"deletedDate": new Date()
			};


			this.props.softDeleteMyObjectiveByIdApi(this.state.item._id, body);
		}
	}

	render() {
		return (
			<div className='home-objective'>
				<Progress data={ this.state.item.keyResults } />
				<div className='name'>{ this.state.item.templateId.title }</div>
				<ObjectiveDescription description={ this.state.item.templateId.description } />
				<div>
					<button type="button" className="btn btn-red-hover delete-button-objective"
					        onClick={ this.handleDelObj }>
						<i className="fi flaticon-garbage-2" aria-hidden="true"></i>
					</button>
				</div>
				<KeyResults 
					data={ this.state.item.keyResults } 
					objectiveId={ this.state.item._id }
					changeScore={ this.changeScore } 
				/>
			</div>
		)
	}
}

export default ObjectiveItem;
