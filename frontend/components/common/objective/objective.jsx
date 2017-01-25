import React, { Component } from 'react';
import KeyResults from './key-results-list.jsx';
import Progress from './progress-bar.jsx';
import ObjectiveDescription from './objective-description.jsx';
import './objective.scss';
import sweetalert from 'sweetalert';
import '../styles/sweetalert.css';

import { bindActionCreators } from 'redux';

import { isEmpty, isValidQuarter } from '../../../../backend/utils/ValidateService';
import { getQuartersIndexesFromCurrent } from '../../../../backend/utils/UIHelpService';

const notifications = require("../../../actions/notifications.js");

class ObjectiveItem extends Component {
	constructor(props) {
		super(props);

		this.handleDelObj = this.handleDelObj.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleCancelEdit = this.handleCancelEdit.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleAddToQuarter = this.handleAddToQuarter.bind(this);
		this.handleMoveToBacklog = this.handleMoveToBacklog.bind(this);
        this.showQuarterSelect = this.showQuarterSelect.bind(this);
        this.handleQuarterChange = this.handleQuarterChange.bind(this);

        this.quarterIndexes = getQuartersIndexesFromCurrent();
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

	handleAddToQuarter(e) {
	    this.showQuarterSelect(true);
	}

    showQuarterSelect(show) {
		this.refs.quartersSelect.value = -1;

        if (show) {
            this.refs.quartersSelect.classList.remove('hidden');
            this.refs.addToQuarter.classList.add('hidden');
            return;
        }

        this.refs.quartersSelect.classList.add('hidden');
        this.refs.addToQuarter.classList.remove('hidden');
    }

	handleMoveToBacklog(e) {
		this.props.moveObjectiveToBacklog(this.props.item._id);
	}

    handleQuarterChange() {
        sweetalert({
            title: "Add this objective to selected quarter?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4caf50",
            confirmButtonText: "OK",
            closeOnConfirm: true
        }, (isConfirm) => {

            if (!isConfirm) {
				this.showQuarterSelect(false);
				return;
            }

            let quarterInd = this.refs['quartersSelect'].value;

            if (!isValidQuarter(quarterInd)) {
                return;
            }

            if (this.props.mentorId != undefined) {
                this.props.addToQuarter(this.props.item._id, quarterInd, notifications.notificationApprenticeDeletedObjective,
                    this.props.mentorId);
            } else {
                this.props.addToQuarter(this.props.item._id, quarterInd);
            }

			this.showQuarterSelect(false);
		});
    }

	render() {
		let editButton;
		let saveButton;
		let deleteButton;
		let cancelButton;
		let archiveButton;
		let backlogBtn;
		let isArchived = this.props.isArchived;
		let isAdmin = this.props.isAdmin;
		let approved;

		let objective = this.props.item;
		let changeKeyResultScore = this.props.changeKeyResultScoreOne(objective._id);
		let changeArchive = this.props.changeArchive;
		let isItHomePage = this.props.isItHomePage;
		let isBacklog = this.props.isBacklog;

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

		let quartersComponent =
			<select onChange={ this.handleQuarterChange } className="select-quarter hidden" ref="quartersSelect">
                <option value='-1'>Select quarter</option>
				{ this.quarterIndexes.map((quarterIndex, i) => {
					return <option value={ quarterIndex } key={ i }>quarter - { quarterIndex }</option>
				}) }
			</select>;

		backlogBtn = (<button ref="backlogBtn"
							  title="Move to backlog"
							  className="btn btn-blue-hover backlog-btn"
							  onClick={ this.handleMoveToBacklog }>
			<i className="fi flaticon-archive"></i>
		</button>);

		return (
			<div>
			<div className='home-objective'>
				{ isBacklog ?
					<div>
						{ quartersComponent }
						<button className="btn btn-blue-hover add-quarter-btn"
								title="Add to current quarter"
								ref="addToQuarter"
								onClick={ this.handleAddToQuarter }>
							<i className="fi flaticon-add-1"></i>
						</button>
					</div>
					: <Progress data={ objective.keyResults } /> }
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
				<div className="backlog-btn-container">
					{ this.props.showBacklogBtn && !isBacklog ? backlogBtn : '' }
				</div>
			</div>
			<div className='otherUserKR'>
				<KeyResults
						isArchived = { isArchived }
						canEditArchived={ this.props.canEditArchived }
						myId = { this.props.myId }
						mentorId = { this.props.mentorId }
						userId={ this.props.userId }
						data={ objective.keyResults }
						isBacklog={ isBacklog }
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
