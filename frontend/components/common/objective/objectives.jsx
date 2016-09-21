import React, { Component } from 'react';
import cookie from 'react-cookie';
import sweetalert from 'sweetalert';

import { getUniqueValuesFromArray } from '../../../../backend/utils/HelpService';

import { isMentorActionAllowed } from '../../../../backend/utils/ValidateService';

import { isEmpty, isCorrectId } from '../../../../backend/utils/ValidateService';
const CONST = require('../../../../backend/config/constants.js');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as keyResultActions from "../../../actions/keyResultActions";
import * as myStateActions from "../../../actions/myStateActions";
import * as objectiveActions from "../../../actions/objectiveActions";
import * as otherPersonActions from "../../../actions/otherPersonActions";
import * as userDashboardActions from "../../../actions/userDashboardActions";

import Quarterbar from '../quarterbar/quarters.jsx';
import ObjectiveItem from './objective.jsx';
import ObjectivesList from './objective-list.jsx';

import '../styles/sweetalert.css';
import './objectives.scss';

const session = cookie.load('user-id');

const notifications = require("../../../actions/notifications.js");

class Objectives extends Component {
	constructor(props) {
		super(props);

		this.changeTab = this.changeTab.bind(this);
		this.changeYear = this.changeYear.bind(this);
		this.handleAddingNewQuarter = this.handleAddingNewQuarter.bind(this);
		this.createObjective = this.createObjective.bind(this);
		this.changeKeyResultScore = this.changeKeyResultScore.bind(this);
		this.getObjectiveAutocompleteData = this.getObjectiveAutocompleteData.bind(this);
		this.handleArchive = this.handleArchive.bind(this);
		this.handleArchivingQuarter = this.handleArchivingQuarter.bind(this);
		this.getDuplicateObjectiveByTitle = this.getDuplicateObjectiveByTitle.bind(this);
		this.getYears = this.getYears.bind(this);
	}

	componentWillMount() {
		this.props.myStateActions.getMe();
	}

	changeTab(num) {
		this.props.myStateActions.setChangeTab(num);
	}

	handleArchive (changeTo, objectiveId) {
		let arch = changeTo ? 'archive' : 'unarchive';
		sweetalert({
			title: `Do you really want to ${arch} this objective?`,
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#4caf50",
			confirmButtonText: "OK",
			closeOnConfirm: true
		}, () => {
			this.props.myStateActions.changeArchiveStatus(changeTo, objectiveId);
		});
	}

	changeYear(year) {
		const { user } = this.props.user;
		const userId = this.props.userId || session;
		this.props.myStateActions.setChangeYear(year);
		if ((user._id != undefined) && (userId != undefined) && (user._id == userId)) {
			this.props.userDashboardActions.getStats(userDashboardActions.OTHER_PERSON_PAGE);
		}	else {
			this.props.userDashboardActions.getStats();
		}
	}

	handleAddingNewQuarter(newQuarter) {
		sweetalert({
			title: "Create new quarter?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#4caf50",
			confirmButtonText: "Yes, create",
			closeOnConfirm: true
		}, () => {
			this.props.myStateActions.createQuarter(newQuarter);
		});
	}

	componentWillUnmount() {
		this.props.myStateActions.reset();
	}

	handleArchivingQuarter(index) {
		var quarterId;
		var flag;
		const { user } = this.props.user;
		if ((user._id != undefined) && (userId != undefined) && (user._id == userId))
			{
			this.props.user.user.quarters.forEach( (quarter) => {
				if (quarter.index == index && quarter.year == this.props.user.selectedYear)
				{
					quarterId = quarter._id;
					flag = !quarter.isArchived;
				}
			})
			this.props.otherPersonActions.archiveUserQuarter(quarterId, flag);
		}	else {
			this.props.myState.me.quarters.forEach( (quarter) => {
				if (quarter.index == index && quarter.year == this.props.myState.selectedYear)
				{
					quarterId = quarter._id;
					flag = !quarter.isArchived;
				}
			})
			this.props.myStateActions.archiveMyQuarter(quarterId, flag);
		}
		//console.log(this.props.myState);
	}

	changeKeyResultScore(objectiveId, mentorId) {
		let apiCall = this.props.myStateActions.changeKeyResultScore;

		return (keyResultId) => {
			return (score) => {
				if (!isCorrectId(objectiveId)
					|| !isCorrectId(keyResultId)) {
					return;
				}

				let body = {
					keyResultId: keyResultId,
					score: score
				};
				if (mentorId != undefined)
					apiCall(objectiveId, body, notifications.notificationApprenticeUpdateKey, mentorId);
				else
					apiCall(objectiveId, body);
			};
		};
	}

	getDuplicateObjectiveByTitle(title, data) {
		let objectiveIndex = data.findIndex((objective) => {
			return (objective.templateId.title.toUpperCase() === title.toUpperCase());
		});

		return (objectiveIndex === -1) ? null : data[objectiveIndex];
	}

	createObjective(categoryId, objectives) {
		return (title, objectiveId) => {
			let duplicateItem = this.getDuplicateObjectiveByTitle(title, objectives);

			if(isEmpty(duplicateItem)) {
				let quarters;
				let userId;
				let selectedYear;
				let selectedTab;
				if (this.props.userId == undefined) {
					userId = session;
					quarters = this.props.myState.me.quarters;
					selectedYear = this.props.myState.selectedYear;
					selectedTab = this.props.myState.selectedTab;
				} else {
					userId = this.props.userId;
					quarters = this.props.user.user.quarters;
					selectedYear = this.props.user.selectedYear;
					selectedTab = this.props.user.selectedTab;
				}

				let quarter = quarters.find((quarter) => {
					return (quarter.index == selectedTab) && (quarter.year == selectedYear);
				});

				let body = {
					title: title,
					objectiveId: objectiveId,
					categoryId: categoryId,
					quarterId: quarter._id,
					userId: userId,
				};
				if (this.props.userId == undefined) {
					if (this.props.mentorId != undefined)
						this.props.myStateActions.addNewObjective(body, notifications.notificationApprenticeAddedObjective, this.props.mentorId);
					else
						this.props.myStateActions.addNewObjective(body);
				} else {
					this.props.otherPersonActions.addNewObjective(body);
				}
			} else {
				if (duplicateItem.isDeleted) {
					sweetalert({
						title: 'Do you want to restore deleted key result?',
						text: 'Key result with such title for that objective exists, but deleted by someone',
						type: 'warning',
						showCancelButton: true,
						confirmButtonColor: '#4caf50',
						confirmButtonText: 'Yes, restore'
					}, () => {
						this.props.myStateActions.softDeleteMyObjectiveByIdApi(duplicateItem._id, false);
						//this.props.softDeleteObjectiveKeyResultByIdApi(userObjectiveId,
						//		duplicateItem._id, false);
					});
				} else {
					sweetalert({
						title: 'Error!',
						text: 'Key result with such title for that objective already exists',
						type: 'error',
					});
				}
			}
		};
	}

	getObjectiveAutocompleteData(categoryId) {
		let selectedYear = this.props.myState.selectedYear;
		let selectedTab = this.props.myState.selectedTab;

		return (title) => {
			this.props.objectiveActions.getAutocompleteObjectives(categoryId, selectedYear, selectedTab, title);
		};
	}

	getYears(quarters) {
		quarters = !isEmpty(quarters) ? quarters : [];

		let years = quarters.map((quarter) => {
			return quarter.year;
		});

		years.push(CONST.currentYear);
		years.push(CONST.currentYear + 1);
		years = getUniqueValuesFromArray(years);
		years.sort((a, b) => { return b - a });

		return years;
	}

	render() {
		const userId = this.props.userId;
		const displayedCategories = this.props.categories.list.filter((category) => {
			return !category.isDeleted;
		});
		const { me } = this.props.myState;
		const { user } = this.props.user;
		let selectedYear = '';
		let selectedTab = '';
		let userInfo = {};
		let years = [];

		// Edit key result on HomePage or UserPage
		let editKeyResult = {};

		// If you need to know is it user HomePage "/" or UserPage "/user/:id" - use this variable
		let isItHomePage;
		let archived;
		let isAdmin = this.props.myState.me.localRole === 'admin' ? true : false;

		if ((user._id != undefined) && (userId != undefined) && (user._id == userId)) {
			/*console.log('user');*/
			isItHomePage = false;
			selectedYear = this.props.user.selectedYear;
			selectedTab = this.props.user.selectedTab;
			userInfo = getObjectivesData(user, selectedYear, selectedTab);
			years = this.getYears(user.quarters);

			// Edit key result on UserPage
			editKeyResult = {
				id: this.props.user.editKeyResultId,
				isEditing: this.props.user.editKeyResultIsEditing,
				enableEdit: this.props.otherPersonActions.editKeyResultEnableEditOnUserPage,
				disableEdit: this.props.otherPersonActions.editKeyResultDisabledEditOnUserPage,
				editTitleAndDifficulty: this.props.otherPersonActions.editKeyResultEditTitleAndDifficulty,
			};
		} else {
			/*console.log('me');*/
			isItHomePage = true;
			selectedYear = this.props.myState.selectedYear;
			selectedTab = this.props.myState.selectedTab;
			userInfo = getObjectivesData(me, selectedYear, selectedTab);
			years = this.getYears(me.quarters);

			// console.log('¯\\_(ツ)_/¯: selectedTab', selectedTab);
			// console.log('¯\\_(ツ)_/¯: selectedYear', selectedYear);

			// Edit key result on HomePage
			editKeyResult = {
				id: this.props.myState.editKeyResultId,
				isEditing: this.props.myState.editKeyResultIsEditing,
				enableEdit: this.props.myStateActions.editKeyResultEnableEditOnHomePage,
				disableEdit: this.props.myStateActions.editKeyResultDisabledEditOnHomePage,
				editTitleAndDifficulty: this.props.myStateActions.editKeyResultEditTitleAndDifficulty,
			};
		}

		if (( CONST.currentYear < selectedYear ||
				( CONST.currentQuarter <= selectedTab && CONST.currentYear == selectedYear )) &&
				( isItHomePage || session == userInfo.mentorId || userId == session )) {
			archived = false;
		} else {
			archived = true;
		}
		const editMode = isMentorActionAllowed(userInfo, me);

		return (
			<div id="home-page-wrapper">
				<Quarterbar
						changeTab={ this.changeTab }
						changeYear={ this.changeYear }
						selectedYear={ selectedYear }
						selectedTab={ selectedTab }
						addNewQuarter={ this.handleAddingNewQuarter }
						archiveQuarter={ this.handleArchivingQuarter }
						years={ years }
						quarters={ userInfo.quarters }
						isAdmin={ isAdmin }
						editMode={ editMode }
						userId={ userInfo._id } />
				<div id='objectives'>
					<ObjectivesList
						mentorId={userInfo.mentorId}
						categories={ displayedCategories }
						isAdmin={ isAdmin }
						archived = { archived }
						objectives={ userInfo.objectives }
						selectedYear= { selectedYear }
						selectedTab={ selectedTab }
						ObjectiveItem={ ObjectiveItem }
						changeArchive={ this.handleArchive }
						updateUserObjectiveApi= { this.props.myStateActions.updateUserObjectiveApi }
						softDeleteMyObjectiveByIdApi={ this.props.myStateActions.softDeleteMyObjectiveByIdApi }
						changeKeyResultScore={ this.changeKeyResultScore }
						createObjective={ this.createObjective }
						getObjectiveAutocompleteData={ this.getObjectiveAutocompleteData }
						softDeleteObjectiveKeyResultByIdApi={ this.props.myStateActions.softDeleteObjectiveKeyResultByIdApi }
						isItHomePage={ isItHomePage }
						editKeyResult = { editKeyResult }
						addNewKeyResults = { this.props.keyResultActions.addNewKeyResults }
						getAutocompleteKeyResults = { this.props.keyResultActions.getAutocompleteKeyResults }
						setAutocompleteKeyResultsSelectedItem = { this.props.keyResultActions.setAutocompleteKeyResultsSelectedItem }
					/>
				</div>
			</div>
		)
	}
}

Objectives.defaultProps = { today: new Date() };

function getObjectivesData(userObject, selectedYear, selectedTab) {
	let quarters = [];
	let objectives = [];
	let { _id, localRole } = userObject;
	let mentorId;

	if(userObject.mentor != undefined || userObject.mentor != null) {
		mentorId = userObject.mentor._id;
	}

	if (userObject.quarters != undefined) {
		let currentQuarter = userObject.quarters.find((quarter) => {
			return (quarter.year == selectedYear) && (quarter.index == selectedTab)
		});

		if(currentQuarter != undefined) {
			objectives = currentQuarter.userObjectives;
		} else {
			objectives = [];
		}

		quarters = userObject.quarters.filter(quarter => {
			return quarter.year == selectedYear;
		});
	}

	return {
		quarters,
	  objectives,
		_id,
	  mentorId,
		mentor: mentorId,
		localRole,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		keyResultActions: bindActionCreators(keyResultActions, dispatch),
		myStateActions: bindActionCreators(myStateActions, dispatch),
		objectiveActions: bindActionCreators(objectiveActions, dispatch),
		otherPersonActions : bindActionCreators(otherPersonActions, dispatch),
		userDashboardActions: bindActionCreators(userDashboardActions, dispatch)
	}
}

function mapStateToProps(state) {
	return {
		myState: state.myState,
		categories: state.categories,
		user: state.userPage,
	};
}

const ObjectivesConnected = connect(mapStateToProps, mapDispatchToProps)(Objectives);

export default ObjectivesConnected;
