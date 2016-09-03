import React, { Component } from 'react';
import KeyResults from './key-results-list.jsx';
import Progress from './progress-bar.jsx';
import ObjectiveDescription from './objective-description.jsx';
import './objective.scss';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../actions/myStateActions.js";

const session = require('../../../../backend/config/session');

class ObjectiveItem extends Component {
	constructor(props) {
		super(props);

		this.handleDelObj = this.handleDelObj.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleCancelEdit = this.handleCancelEdit.bind(this);
	}

	handleDelObj(e) {
		var confirmed = confirm("Do you really want to delete this objective?");

		if (confirmed) {
			this.props.softDeleteMyObjectiveByIdApi(this.props.item._id);
		}
	}

	handleEdit() {
		this.refs.description.refs.description.classList.add('hidden');
		this.refs.deleteObjective.classList.add('hidden');
		this.refs.edit.classList.add('hidden');
		this.refs.deleteObjective.classList.add('hidden');
		this.refs.descriptionEdit.classList.remove('hidden');
		this.refs.cancelEdit.classList.remove('hidden');
		this.refs.saveEdit.classList.remove('hidden');
	}

	handleCancelEdit(){
		this.refs.descriptionEdit.classList.add('hidden');
		this.refs.description.refs.description.classList.remove('hidden');
		this.refs.edit.classList.remove('hidden');
		this.refs.deleteObjective.classList.remove('hidden');
		this.refs.cancelEdit.classList.add('hidden');
		this.refs.saveEdit.classList.add('hidden');
	}

	render() {
		const myId = this.props.myId;
		let editButton;
		let saveButton;
		let deleteButton;
		let cancelButton;

		let objective = this.props.item;
		let changeKeyResultScore = this.props.changeKeyResultScoreOne(objective._id);

		if( myId == session._id){
			editButton = (<i ref="edit"
			                className="fi flaticon-edit objective-edit"
			                onClick={ this.handleEdit }>
									 </i>);
			saveButton = (<i ref="saveEdit"
			                className="fi flaticon-success save hidden"
			                aria-hidden="true"
			                title="Save">
										</i>);
			cancelButton = (<i ref="cancelEdit"
			                   className="fi flaticon-multiply cancel delete-button-objective hidden"
			                   title='Cancel'
			                   aria-hidden="true"
			                   onClick={ this.handleCancelEdit }>
										</i>);
			deleteButton = (<button ref="deleteObjective"
			                       type="button"
			                       className="btn btn-red-hover delete-button-objective"
			                       onClick={ this.handleDelObj }>
															<i className="fi flaticon-garbage-2" aria-hidden="true"></i>
											</button>);
		}

		return (
			<div>
			<div className='home-objective'>
				<Progress data={ objective.keyResults } />

				<div className='name'>{ objective.templateId.title }</div>
				<ObjectiveDescription
						ref="description"
						description={ objective.templateId.description }
				/>
				<textarea
						ref="descriptionEdit"
						name='description'
						className='description-textarea hidden'
						defaultValue={objective.templateId.description}/>
				{ editButton }
				{ saveButton }
				{ deleteButton }
				{ cancelButton }
			</div>
			<div className='otherUserKR'>
				<KeyResults
						myId = { this.props.myId }
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