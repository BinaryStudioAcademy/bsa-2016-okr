import React, { Component } from 'react';
import Quarterbar from '../quarterbar/quarters.jsx';
import ObjectiveItem from './objective.jsx';
import ObjectivesList from './objective-list.jsx';

import { isEmpty, isCorrectId } from '../../../../backend/utils/ValidateService';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as myStateActions from "../../../actions/myStateActions";
import * as objectiveActions from "../../../actions/objectiveActions";

import './objectives.scss';

const CONST = require('../../../../backend/config/constants.js');
const session = require('../../../../backend/config/session');

class Objectives extends Component {
	constructor(props) {
		super(props);

		this.changeTab = this.changeTab.bind(this);
		this.changeYear = this.changeYear.bind(this);
		this.handleAddingNewQuarter = this.handleAddingNewQuarter.bind(this);
		this.createObjective = this.createObjective.bind(this);
		this.changeKeyResultScore = this.changeKeyResultScore.bind(this);
		this.getObjectiveAutocompleteData = this.getObjectiveAutocompleteData.bind(this);
	}

	changeTab(num) {
		this.props.myStateActions.setChangeTab(num);
	}

	changeYear(year) {
		this.props.myStateActions.setChangeYear(year);
	}

	handleAddingNewQuarter(newQuarter) {
		let confirmed = confirm("Do you really want to create new quarter?");

		if (confirmed) {
			//API call
			this.props.myStateActions.createQuarter(newQuarter);
			this.props.myStateActions.getMe();
			this.changeTab(newQuarter.index);
		}
	}

	changeKeyResultScore(objectiveId) {
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

				apiCall(objectiveId, body);
			};
		};
	}

	createObjective(categoryId) {
		return (title, objectiveId) => {
			let quarters = this.props.myState.me.quarters;
			let selectedYear = this.props.myState.selectedYear;
			let selectedTab = this.props.myState.selectedTab;

			let quarter = quarters.find((quarter) => {
				return (quarter.index == selectedTab) && (quarter.year == selectedYear);
			});

			let body = {
				title: title,
				objectiveId: objectiveId,
				categoryId: categoryId,
				quarterId: quarter._id,
			};

			this.props.myStateActions.addNewObjective(body);
		};
	}

	getObjectiveAutocompleteData(categoryId) {
		let selectedYear = this.props.myState.selectedYear;
		let selectedTab = this.props.myState.selectedTab;

		return (title) => {
			this.props.objectiveActions.getAutocompleteObjectives(categoryId, selectedYear, selectedTab, title);
		};
	}

	render() {
		const userId = this.props.userId;
		const categories = this.props.categories;
		const { me } = this.props.myState;
		const { user } = this.props.user;
		let selectedYear = '';
		let selectedTab = '';
		let userInfo = {};
		let ismyself = true;
		let archived;

		if ((user._id != undefined) && (userId != undefined) && (user._id == userId)) {
			/*console.log('user');*/
			ismyself = false;
			selectedYear = this.props.user.selectedYear;
			selectedTab = this.props.user.selectedTab;
			userInfo = getObjectivesData(user, selectedYear, selectedTab);
		} else {
			/*console.log('me');*/
			ismyself = true;
			selectedYear = this.props.myState.selectedYear;
			selectedTab = this.props.myState.selectedTab;
			userInfo = getObjectivesData(me, selectedYear, selectedTab);
		}

		if (( CONST.currentYear < selectedYear ||
				( CONST.currentQuarter <= selectedTab && CONST.currentYear == selectedYear )) &&
				( ismyself || session._id == userInfo.mentorId || userId == session._id )) {
			archived = false;
		} else {
			archived = true;
		}

		return (
			<div id="home-page-wrapper">
				<Quarterbar
						changeTab={ this.changeTab }
						changeYear={this.changeYear}
						selectedYear= { selectedYear }
						selectedTab={ selectedTab }
				    addNewQuarter={ this.handleAddingNewQuarter }
						quarters={ userInfo.quarters }
						me={ ismyself } 
						mentorId = { userInfo.mentorId } />
				<div id='objectives'>
					<ObjectivesList
						categories={ categories.list }
						archived = { archived }
						objectives={ userInfo.objectives }
						ObjectiveItem={ ObjectiveItem }
						softDeleteMyObjectiveByIdApi={ this.props.myStateActions.softDeleteMyObjectiveByIdApi }
						changeKeyResultScore={ this.changeKeyResultScore }
						createObjective={ this.createObjective }
						getObjectiveAutocompleteData={ this.getObjectiveAutocompleteData }
						softDeleteObjectiveKeyResultByIdApi={ this.props.myStateActions.softDeleteObjectiveKeyResultByIdApi }
					/>
				</div>
			</div>
		)
	}
}

Objectives.defaultProps = {today: new Date()};

function mapDispatchToProps(dispatch) {
	return {
		myStateActions: bindActionCreators(myStateActions, dispatch),
		objectiveActions: bindActionCreators(objectiveActions, dispatch),
	}
}

function mapStateToProps(state) {
	return {
		myState: state.myState,
		categories: state.categories,
		user: state.userPage,
	};
}

function getObjectivesData(userObject, selectedYear, selectedTab) {
	let quarters = [];
	let objectives = [];
	let id = userObject._id;
	let mentor;
	if(userObject.mentor != undefined || userObject.mentor != null)
		mentor = userObject.mentor._id;

	if (userObject.quarters != undefined) {
		var current_quarter = userObject.quarters.find((quarter) => {
			return (quarter.year == selectedYear) && (quarter.index == selectedTab)
		});

		if(current_quarter != undefined) {
			objectives = current_quarter.userObjectives;
		} else {
			objectives = []
		}

		quarters = userObject.quarters.filter(quarter => {
			return quarter.year == selectedYear;
		});
	}

	return {
		quarters: quarters,
	  objectives: objectives,
	  id: id,
	  mentorId: mentor
	};
}

const ObjectivesConnected = connect(mapStateToProps, mapDispatchToProps)(Objectives);

export default ObjectivesConnected;
