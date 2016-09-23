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

	handleDelObj() {
		sweetalert({
			title: "Do you really want to delete this objective?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#4caf50",
			confirmButtonText: "OK",
			closeOnConfirm: true
		}, () => {
			if (this.props.mentorId != undefined) {
				this.props.softDeleteMyObjectiveByIdApi(this.props.item._id, true, notifications.notificationApprenticeDeletedObjective,
						this.props.mentorId);
			}	else {
				this.props.softDeleteMyObjectiveByIdApi(this.props.item._id, true);
			}
		});
	}

	handleEdit() {
		this.refs.description.refs.description.classList.add('hidden');
		this.refs.deleteObjective.classList.add('hidden');
		this.refs.edit.classList.add('hidden');
		this.refs.deleteObjective.classList.add('hidden');
		this.refs.objectiveTitle.classList.add('hidden');

		this.refs.objectiveTitleEdit.classList.remove('hidden');
		this.refs.descriptionEdit.classList.remove('hidden');
		this.refs.cancelEdit.classList.remove('hidden');
		this.refs.saveEdit.classList.remove('hidden');
	}

	handleSave() {
		//handleCancelEdit();
		// bad habbit copypaste code :/
		let changedDescription = this.refs.descriptionEdit.value;
		let changedTitle = this.refs.objectiveTitleEdit.value;
		let isItHomePage = this.props.isItHomePage;

		if (this.props.mentorId != undefined) {
			this.props.updateUserObjectiveApi(this.props.item._id, changedDescription, changedTitle,
			notifications.notificationApprenticeUpdateObjective, this.props.mentorId);
		} else {
			this.props.updateUserObjectiveApi(this.props.item._id, changedDescription, changedTitle);
		}

		this.refs.descriptionEdit.classList.add('hidden');
		this.refs.description.refs.description.classList.remove('hidden');
		this.refs.edit.classList.remove('hidden');
		this.refs.deleteObjective.classList.remove('hidden');
		this.refs.objectiveTitle.classList.remove('hidden');

		this.refs.objectiveTitleEdit.classList.add('hidden');
		this.refs.cancelEdit.classList.add('hidden');
		this.refs.saveEdit.classList.add('hidden');
	}

	handleCancelEdit(){
		this.refs.descriptionEdit.classList.add('hidden');
		this.refs.description.refs.description.classList.remove('hidden');
		this.refs.edit.classList.remove('hidden');
		this.refs.deleteObjective.classList.remove('hidden');
		this.refs.objectiveTitle.classList.remove('hidden');

		this.refs.objectiveTitleEdit.classList.add('hidden');
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
		let approved;

		let objective = this.props.item;
		let changeKeyResultScore = this.props.changeKeyResultScoreOne(objective._id);
		let changeArchive = this.props.changeArchive;
		let isItHomePage = this.props.isItHomePage;

		if(isAdmin) {
			if(!this.props.isArchivedObjective)
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
										</button>)
		}

		if(!isArchived){
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
				editButton = (<button ref="edit"
											title="Edit"
											className="btn btn-blue-hover objective-edit"
											onClick={ this.handleEdit }>
											<i className="fi flaticon-edit"></i>
											</button>);
			}

			if (objective.templateId.isApproved) {
        approved = <span className='fi flaticon-push-pin approved' title='approved'></span>
      }
		}

		return (
			<div>
			<div className='home-objective'>
				<Progress data={ objective.keyResults } />
				<div
						ref="objectiveTitle"
						className='name'>{ approved } { objective.title ? objective.title : objective.templateId.title }
				</div>
				<input
						ref="objectiveTitleEdit"
						type="text"
						className='name-input hidden'
						defaultValue={ objective.title ? objective.title : objective.templateId.title }
				/>

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
						selectedYear= { this.props.selectedYear }
						selectedTab={ this.props.selectedTab }
						softDeleteObjectiveKeyResultByIdApi={ this.props.softDeleteObjectiveKeyResultByIdApi }
						isItHomePage = { isItHomePage }
						editKeyResult = { this.props.editKeyResult }
						addNewKeyResults = { this.props.addNewKeyResults }
						getAutocompleteKeyResults = { this.props.getAutocompleteKeyResults }
						setAutocompleteKeyResultsSelectedItem = { this.props.setAutocompleteKeyResultsSelectedItem }
				/>
			</div>
			</div>
		)
	}
}
export default ObjectiveItem;
