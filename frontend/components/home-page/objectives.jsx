import React, { Component } from 'react';
import Quarter from './quarter.jsx';
import ObjectiveItem from './objective.jsx';
import ObjectivesList from '../common/objective/objective-list.jsx';

import { isEmpty } from '../../../backend/utils/ValidateService';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../actions/myStateActions";

class Objectives extends Component {
	constructor(props) {
		super(props);

		this.changeTab = this.changeTab.bind(this);
		this.changeYear = this.changeYear.bind(this);
		this.handleAddingNewQuarter = this.handleAddingNewQuarter.bind(this);
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

	componentWillMount() {
		this.props.getMe();
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
					my={ true } ObjectiveItem={ ObjectiveItem } softDeleteMyObjectiveByIdApi={ this.props.softDeleteMyObjectiveByIdApi }/>
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
