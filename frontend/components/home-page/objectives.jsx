import React, { Component } from 'react';
import Quarterbar from '../common/quarterbar/quarters.jsx';
import ObjectiveItem from './objective.jsx';
import ObjectivesList from '../common/objective/objective-list.jsx';

import { isEmpty, isCorrectId } from '../../../backend/utils/ValidateService';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as myStateActions from "../../actions/myStateActions";
import * as objectiveActions from "../../actions/objectiveActions";

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
		const { me, selectedYear, selectedTab, currentYear, currentQuarter } = this.props.myState;

		const categories = this.props.categories;

		if (me.quarters != undefined) {
			var current_quarter = me.quarters.find((quarter) => {
				return (quarter.year == selectedYear) && (quarter.index == selectedTab)
			});

			var quarters = me.quarters.filter(quarter => {
				return quarter.year == selectedYear;
			});

			var objectives = current_quarter.userObjectives;
		}

		return (
			<div id="home-page-wrapper">
				<Quarterbar
						changeTab={ this.changeTab }
						changeYear={this.changeYear}
				      currentYear={ currentYear }
						selectedYear= {selectedYear }
						selectedTab={ selectedTab }
				      addNewQuarter={ this.handleAddingNewQuarter }
						quarters={ quarters }
						me={ true } />
				<div id='objectives'>
					<ObjectivesList
						objectives={ objectives }
						categories={ categories.list }
						my={ true }
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
		categories: state.categories
	};
}

const ObjectivesConnected = connect(mapStateToProps, mapDispatchToProps)(Objectives);

export default ObjectivesConnected;
