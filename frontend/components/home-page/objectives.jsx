import React, { Component } from 'react';
import Quarter from './quarter.jsx';
import ObjectiveItem from './objective.jsx';
import ObjectivesList from '../common/objective/objective-list.jsx';

import { isEmpty, isCorrectId } from '../../../backend/utils/ValidateService';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../actions/myStateActions";

class Objectives extends Component {
	constructor(props) {
		super(props);

		this.changeTab = this.changeTab.bind(this);
		this.changeYear = this.changeYear.bind(this);
		this.handleAddingNewQuarter = this.handleAddingNewQuarter.bind(this);
		this.changeKeyResultScore = this.changeKeyResultScore.bind(this);
	}

	changeTab(num) {
		this.props.setChangeTab(num);
	}

	changeYear(year) {
		this.props.setChangeYear(year);
	}

	handleAddingNewQuarter(newQuarter){
		let confirmation = confirm("Do you really want to create new quarter?");

		if(confirmation) {
			this.props.createQuarter(newQuarter);
		}
	}

	changeKeyResultScore(objectiveId) {
		let apiCall = this.props.changeKeyResultScore;
		
		return (keyResultId) => {
			return (score) => {
				if(!isCorrectId(objectiveId) 
				|| !isCorrectId(keyResultId)) {
					return;
				}

				let body = {
					keyResultId: keyResultId,
					score: score
				};

				console.log('Ready to API call');
		
				apiCall(objectiveId, body);
			};
		};
	}

	render() {
		const myState = this.props.myState;
		const { me, currentYear, currentTab, existedQuarters } = myState;

		const categories = this.props.categories;
		console.log('categories', categories.list);

		var objectiveItems = [];
		var quarter = {};
		var objectives = [];

		if (me.quarters != undefined) {
			quarter = me.quarters.find((quarter) => {
				return (quarter.year == currentYear) && (quarter.index == currentTab)
			});

			objectives = quarter.userObjectives;
		}

		return (
			<div id="home-page-wrapper">
				<Quarter changeTab={ this.changeTab } changeYear={this.changeYear}
				currentTab={ currentTab } existedQuarters={ existedQuarters } addNewQuarter={ this.handleAddingNewQuarter } />
				<div id='objectives'>
					<ObjectivesList objectives={ objectives } categories={ categories.list }
					my={ true } ObjectiveItem={ ObjectiveItem } softDeleteMyObjectiveByIdApi={ this.props.softDeleteMyObjectiveByIdApi }
					changeKeyResultScore={ this.changeKeyResultScore }/>
				</div>
			</div>
		)
	}
}

Objectives.defaultProps = { today: new Date() };

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
	return {
		myState: state.myState,
		categories: state.categories
	};
}

const ObjectivesConnected = connect(mapStateToProps, mapDispatchToProps)(Objectives);

export default ObjectivesConnected;
