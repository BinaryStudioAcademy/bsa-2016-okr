import React, { Component } from 'react';
import cookie from 'react-cookie';
import sweetalert from 'sweetalert';

import { isEmpty, isCorrectId, isMentorActionAllowed } from '../../../../backend/utils/ValidateService';
import { isStringsEqual } from '../../../../backend/utils/HelpService';
import { getYears, getObjectivesData } from '../../../../backend/utils/UIHelpService';
import CONST from '../../../../backend/config/constants.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as keyResultActions from "../../../actions/keyResultActions";
import * as myStateActions from "../../../actions/myStateActions";
import * as objectiveActions from "../../../actions/objectiveActions";
import * as otherPersonActions from "../../../actions/otherPersonActions";
import * as userDashboardActions from "../../../actions/userDashboardActions";

import Quarterbar from '../quarterbar/quarters.jsx';
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
		this.moveObjectiveToBacklog = this.moveObjectiveToBacklog.bind(this);
	}

	componentWillMount() {
		this.props.myStateActions.getMe();
	}

	componentWillUnmount() {
		this.props.myStateActions.reset();
	}

	changeTab(num) {
		const { user } = this.props.user;
		const userId = this.props.userId || session;
		const isItHomePage = !isStringsEqual(user._id, userId);

		if (isItHomePage) {
			this.props.myStateActions.setChangeTab(num);
		} else {
			this.props.otherPersonActions.setChangeTab(num);
		}
	}

	handleArchive(changeTo, objectiveId) {
		let arch = changeTo ? 'archive' : 'unarchive';
		sweetalert({
			title: `Do you really want to ${arch} this objective?`,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#4caf50',
			confirmButtonText: 'OK',
			closeOnConfirm: true
		}, () => {
			this.props.myStateActions.changeArchiveStatus(changeTo, objectiveId);
		});
	}

	changeYear(year) {
		const { user } = this.props.user;
		const userId = this.props.userId || session;
		const isItHomePage = !isStringsEqual(user._id, userId);

		if (isItHomePage) {
			this.props.myStateActions.setChangeYear(year);
			this.props.userDashboardActions.getStats();
		}	else {
			this.props.otherPersonActions.setChangeYear(year);
			this.props.userDashboardActions.getStats(CONST.page.OTHER_PERSON_PAGE);
		}
	}

	handleAddingNewQuarter(newQuarter) {
		sweetalert({
			title: 'Create new quarter?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#4caf50',
			confirmButtonText: 'Yes, create',
			closeOnConfirm: true
		}, () => {
			const { userId } = this.props;
			const { user } = this.props.user;
			const isItHomePage = !isStringsEqual(user._id, userId);

			if(isItHomePage) {
				this.props.myStateActions.createQuarter(newQuarter);
			} else {
				this.props.otherPersonActions.createQuarter(newQuarter);
			}
		});
	}

	handleArchivingQuarter(index) {
		let quarterId;
		let flag;
		const { user } = this.props.user;
		const { userId } = this.props;
		const isItHomePage = !isStringsEqual(user._id, userId);
		if (isItHomePage) {
			this.props.myState.me.quarters.forEach( (quarter) => {
				if (quarter.index == index && quarter.year == this.props.myState.selectedYear)
				{
					quarterId = quarter._id;
					flag = !quarter.isArchived;
				}
			});

			this.props.myStateActions.archiveMyQuarter(quarterId, flag);
		}	else {
			this.props.user.user.quarters.forEach( (quarter) => {
				if (quarter.index == index && quarter.year == this.props.user.selectedYear)
				{
					quarterId = quarter._id;
					flag = !quarter.isArchived;
				}
			});

			this.props.otherPersonActions.archiveUserQuarter(quarterId, flag);
		}
	}

	changeKeyResultScore(objectiveId, mentorId) {
		const { userId } = this.props;
		const { user } = this.props.user;
		const isItHomePage = !isStringsEqual(user._id, userId);
		let apiCall;

		if(isItHomePage) {
			apiCall = this.props.myStateActions.changeKeyResultScore;
		} else {
			apiCall = this.props.otherPersonActions.changeKeyResultScore;
		}

		return (keyResultId) => {
			return (score) => {
				if (!isCorrectId(objectiveId)
				|| !isCorrectId(keyResultId)) {
					return;
				}

				let body = {
					keyResultId: keyResultId,
					score: score,
					userId: userId || session
				};

				if (mentorId != undefined) {
					apiCall(objectiveId, body, notifications.notificationApprenticeUpdateKey, mentorId);
				} else {
					apiCall(objectiveId, body);
				}
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
						title: 'Do you want to restore deleted objective?',
						text: 'Objective with such title exists, but deleted by someone',
						type: 'warning',
						showCancelButton: true,
						confirmButtonColor: '#4caf50',
						confirmButtonText: 'Yes, restore'
					}, () => {
						this.props.myStateActions.softDeleteMyObjectiveByIdApi(duplicateItem._id, false);
					});
				} else {
					sweetalert({
						title: 'Error!',
						text: 'Objective with such title already exists',
						type: 'error',
					});
				}
			}
		};
	}

	getObjectiveAutocompleteData(categoryId, quarterId) {
		return (title) => {
			this.props.objectiveActions.getAutocompleteObjectives(categoryId, quarterId, title);
		};
	}

	moveObjectiveToBacklog(id) {
		sweetalert({
			title: "Return this objective to backlog?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#4caf50",
			confirmButtonText: "OK",
			closeOnConfirm: true
		}, () => {
			const userId = this.props.userId || session;
			if (this.props.mentorId != undefined) {
				this.props.myStateActions.moveObjectiveToBacklog(id, userId, notifications.notificationApprenticeDeletedObjective);
			}	else {
				this.props.myStateActions.moveObjectiveToBacklog(id, userId);
			}
		});
	}

	render() {
		const { categories, userId } = this.props;
		const { user } = this.props.user;
		const { me } = this.props.myState;
		let selectedYear = '';
		let selectedTab = '';
		let userInfo = {};
		let years = [];
		let displayedCategories = [];
		let archived;

		if (!isEmpty(categories.list)) {
			displayedCategories = categories.list.filter((category) => {
				return !category.isDeleted;
			}).sort((a, b) => {
				return a.title.localeCompare(b.title)
			});
		}

		// Edit key result on HomePage or UserPage
		let editKeyResult = {};

		// If you need to know is it user HomePage "/" or UserPage "/user/:id" - use this variable
		const isItHomePage = !isStringsEqual(user._id, userId);
		let isAdmin = this.props.myState.me.localRole === CONST.user.localRole.ADMIN ? true : false;

		if (isItHomePage) {
			/*console.log('me');*/
			selectedYear = this.props.myState.selectedYear;
			selectedTab = this.props.myState.selectedTab;
			userInfo = getObjectivesData(me, selectedYear, selectedTab);
			years = getYears(me.quarters);

			// Edit key result on HomePage
			editKeyResult = {
				id: this.props.myState.editKeyResultId,
				isEditing: this.props.myState.editKeyResultIsEditing,
				enableEdit: this.props.myStateActions.editKeyResultEnableEditOnHomePage,
				disableEdit: this.props.myStateActions.editKeyResultDisabledEditOnHomePage,
				editTitleAndDifficulty: this.props.myStateActions.editKeyResultEditTitleAndDifficulty,
			};
		} else {
			selectedYear = this.props.user.selectedYear;
			selectedTab = this.props.user.selectedTab;

			userInfo = getObjectivesData(user, selectedYear, selectedTab);
			years = getYears(user.quarters);

			// Edit key result on UserPage
			editKeyResult = {
				id: this.props.user.editKeyResultId,
				isEditing: this.props.user.editKeyResultIsEditing,
				enableEdit: this.props.otherPersonActions.editKeyResultEnableEditOnUserPage,
				disableEdit: this.props.otherPersonActions.editKeyResultDisabledEditOnUserPage,
				editTitleAndDifficulty: this.props.otherPersonActions.editKeyResultEditTitleAndDifficulty,
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
		const isEmptyQuarters = isEmpty(userInfo.quarters);

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
				<div id='objectives' className={ isEmptyQuarters ? 'hidden' : ''} >
					<ObjectivesList
						mentorId={userInfo.mentorId}
						categories={ displayedCategories }
						isAdmin={ isAdmin }
						isArchived = { archived }
						quarter={ userInfo.currentQuarter }
						objectives={ userInfo.objectives }
						moveObjectiveToBacklog={ this.moveObjectiveToBacklog }
						selectedYear= { selectedYear }
						selectedTab={ selectedTab }
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
		);
	}
}

Objectives.defaultProps = { today: new Date() };

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
