import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as myStateActions from "../../actions/myStateActions";
import * as otherPersonActions from "../../actions/otherPersonActions.js";
import { isEmpty, isCorrectId } from '../../../backend/utils/ValidateService';

import Quarterbar from '../common/quarterbar/quarters.jsx';
import ObjectivesList from '../common/objective/objective-list.jsx';
import ObjectiveItem from './user-objective-item.jsx';

import './user-objectives.scss';

class Objectives extends Component {
	constructor(props) {
		super(props);

		this.changeKeyResultScore = this.changeKeyResultScore.bind(this);
	}
	
	changeTab(num) {
		this.props.otherPersonActions.changeTab(num)
	}

	changeYear(year) {
		this.props.otherPersonActions.changeYear(year)
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

	render() {
		const { user, selectedYear, selectedTab } = this.props.user;
		const categories = this.props.categories;

		let current_quarter = {};
		let objectives = [];

		if(user.quarters != undefined) {
			current_quarter = user.quarters.find((quarter) => {
				return (quarter.year == selectedYear) && (quarter.index == selectedTab)
			});
			var quarters = user.quarters.filter(quarter => {
				return quarter.year == selectedYear;
			});

			if(current_quarter != undefined)
				objectives = current_quarter.userObjectives;
			else objectives = []
		}
		
		return (
			<div>
				<Quarterbar changeTab={ this.changeTab.bind(this) } changeYear={ this.changeYear.bind(this) }
				selectedYear={ selectedYear }
				selectedTab={ selectedTab }
				quarters={quarters}/>
				<div id='user-objectives'>
					<ObjectivesList objectives={ objectives } categories={ categories.list } my={ false } 
					ObjectiveItem={ ObjectiveItem } changeKeyResultScore={ this.changeKeyResultScore }/>
				</div> 
			</div> 
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		myStateActions: bindActionCreators(myStateActions, dispatch),
		otherPersonActions: bindActionCreators(otherPersonActions, dispatch),
	}
}

function mapStateToProps(state, ownProps) {
	return {
		user: state.userPage,
		categories: state.categories
	};
}

const ObjectivesConnected = connect(mapStateToProps, mapDispatchToProps)(Objectives);
export default ObjectivesConnected