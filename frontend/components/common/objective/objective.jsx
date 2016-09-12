import React, { Component } from 'react';
import KeyResults from './key-results-list.jsx';
import Progress from './progress-bar.jsx';
import ObjectiveDescription from './objective-description.jsx';
import './objective.scss';
import sweetalert from 'sweetalert';
import '../styles/sweetalert.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../actions/myStateActions.js";

const notifications = require("../../../actions/notifications.js");

class ObjectiveItem extends Component {
	constructor(props) {
		super(props);

		this.handleDelObj = this.handleDelObj.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleCancelEdit = this.handleCancelEdit.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}

	handleDelObj(e) {
		let handler = function() {
			if (this.props.mentorId != undefined)
				this.props.softDeleteMyObjectiveByIdApi(this.props.item._id, notifications.notificationApprenticeDeletedObjective,
				this.props.mentorId);
			else
				this.props.softDeleteMyObjectiveByIdApi(this.props.item._id);
		}.bind(this);

		sweetalert({
			title: "Do you really want to delete this objective?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#4caf50",
			confirmButtonText: "OK",
			closeOnConfirm: true
		}, function(){handler();});
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

	handleSave() {
		//handleCancelEdit();
		// bad habbit copypaste code :/
		let changedDescription = this.refs.descriptionEdit.value;


		if (this.props.mentorId != undefined)
			this.props.updateUserObjectiveApi(this.props.item._id, changedDescription,
			notifications.notificationApprenticeUpdateObjective, this.props.mentorId);
		else
			this.props.updateUserObjectiveApi(this.props.item._id, changedDescription);
		//updateUserObjectiveApi

		this.refs.descriptionEdit.classList.add('hidden');
		this.refs.description.refs.description.classList.remove('hidden');
		this.refs.edit.classList.remove('hidden');
		this.refs.deleteObjective.classList.remove('hidden');
		this.refs.cancelEdit.classList.add('hidden');
		this.refs.saveEdit.classList.add('hidden');
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
		let editButton;
		let saveButton;
		let deleteButton;
		let cancelButton;
		let archiveButton;
		let isArchived = this.props.isArchived;
		let isAdmin = this.props.isAdmin;
		let notApproved;

		let objective = this.props.item;
		let changeKeyResultScore = this.props.changeKeyResultScoreOne(objective._id);
		let changeArchive = this.props.changeArchive;
		let isItHomePage = this.props.isItHomePage;

		if(isAdmin) {
			/*if(!isArchived)
			archiveButton = (<button className="btn btn-blue-hover objective-archive"
										title="archive"
										onClick={() => {changeArchive(true, objective._id)}}>
										<i className="fi flaticon-archive-2"></i>
										</button>)
		else 
			archiveButton = (<button className="btn btn-blue-hover objective-archive"
										title="unarchive"
										onClick={() => {changeArchive(false, objective._id)}}>
										<i className="fi flaticon-bookmark-1"></i>
										</button>) */
		}

		if(!isArchived){
			editButton 	= 	(<button ref="edit"
											title="Edit"
										 	className="btn btn-blue-hover objective-edit"
										 	onClick={ this.handleEdit }>
												<i className="fi flaticon-edit"></i>
											</button>);
			saveButton 	= 	(<button ref="saveEdit"
											className="btn btn-green save hidden"
											onClick={ this.handleSave }
											aria-hidden="true"
											title="Save">
												<i className="fi-1 flaticon-1-check"></i>
											</button>);
			cancelButton = (<button ref="cancelEdit"
											className="btn btn-red cancel cancel-button-objective hidden"
											title='Cancel'
											aria-hidden="true"
											onClick={ this.handleCancelEdit }>
												<i className="fi flaticon-multiply"></i>
											</button>);
			deleteButton = (<button ref="deleteObjective"
											title="Delete"
			                       	type="button"
			                       	className="btn btn-red-hover delete-button-objective"
			                       	onClick={ this.handleDelObj }>
															<i className="fi flaticon-garbage-2"></i>
											</button>);

			if (!objective.templateId.isApproved) {
        notApproved = <span className='fi flaticon-push-pin notApproved' title='not approved'></span>
      }
		}
	//	console.log("objective >>> ", objective);
		return (
			<div>
			<div className='home-objective'>
				<Progress data={ objective.keyResults } />
				{ notApproved }
				<div className='name'>{ objective.title ? objective.title : objective.templateId.title }</div>
				<ObjectiveDescription
						ref="description"
						description={ objective.description ? objective.description : objective.templateId.description }
				/>
				<textarea
						ref="descriptionEdit"
						name='description'
						className='description-textarea hidden'
						defaultValue={ objective.description ? objective.description : objective.templateId.description }/>
				{ editButton }
				{ saveButton }
				{ deleteButton }
				{ cancelButton }
{/*				{ archiveButton }*/}
			</div>
			<div className='otherUserKR'>
				<KeyResults
						isArchived = { isArchived }
						myId = { this.props.myId }
						mentorId = { this.props.mentorId }
						data={ objective.keyResults }
						objectiveId={ objective._id }
						changeScore={ changeKeyResultScore }
						softDeleteObjectiveKeyResultByIdApi={ this.props.softDeleteObjectiveKeyResultByIdApi }
						isItHomePage = { isItHomePage }
						setActiveKeyResultOnHomePage = { this.props.setActiveKeyResultOnHomePage }
						editing = { this.props.editing }
						activeKeyResult = { this.props.activeKeyResult }
						editingKeyResult = { this.props.editingKeyResult }
						cancelEdit = { this.props.cancelEdit }
				/>
			</div>
			</div>
		)
	}
}
export default ObjectiveItem;
