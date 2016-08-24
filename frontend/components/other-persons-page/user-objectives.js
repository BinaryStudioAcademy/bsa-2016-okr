import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../actions/otherPersonActions.js";

import Quarter from './persons-quarter.js';
import ObjectivesList from '../common/objective/objective-list.jsx';
import ObjectiveItem from './user-objective-item.jsx';

import './user-objectives.scss';

class Objectives extends Component {
	constructor(props) {
		super(props);
	}
	
	changeTab(num) {
		this.props.changeTab(num)
	}
	changeYear(year){
		this.props.changeYear(year)
	}

	render() {
		
		const { user, currentYear, currentTab} = this.props.user;
		const categories = this.props.categories;

		let quarter = {};
		let objectives = [];

		if(user.quarters != undefined) {
			quarter = user.quarters.find((quarter) => {
				return (quarter.year == currentYear) && (quarter.index == currentTab)
			});

			objectives = quarter.userObjectives;
		}
		
		return (
			<div>
				<Quarter changeTab={ this.changeTab.bind(this) } changeYear={ this.changeYear.bind(this) } 
				currentYear={ currentYear } currentTab={ currentTab } />
				<div id='objectives'>
					<ObjectivesList objectives={ objectives } categories={ categories.list } my={ false } 
					ObjectiveItem={ ObjectiveItem }/>
				</div> 
			</div> 
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state, ownProps) {
	return {
		user: state.userPage,
		categories: state.categories
	};
}

const ObjectivesConnected = connect(mapStateToProps, mapDispatchToProps)(Objectives);
export default ObjectivesConnected