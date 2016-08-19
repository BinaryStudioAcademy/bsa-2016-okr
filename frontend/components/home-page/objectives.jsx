import React, { Component } from 'react';
import ObjectiveItem from './objective.jsx';
import Quarter from './quarter.jsx';
import ObjectivesList from './objective-list.jsx';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../actions/myObjectivesActions";

class Objectives extends Component {
	constructor(props) {
		super(props);
		this.changeTab = this.changeTab.bind(this);
		this.changeYear = this.changeYear.bind(this);
	}

	changeTab(num) {
		this.props.setChangeTab(num);
	}
	changeYear(year){
		this.props.changeYear(year);
	}
	componentWillMount() {
		console.log(this.props);
		this.props.getMe();
	}

	render() {
		const data = this.props.stateFromReducer.myState;
		const { me, currentYear, currentTab } = data;

		var ObjectiveItems = [];

		let quarter = me.quarters.find((quarter) => {
			console.log(quarter.year, quarter.index)
			return (quarter.year == currentYear) && (quarter.index === currentTab)
		});

		ObjectiveItems = quarter.userObjectives.map((item, index) => {
				console.log('item' + item);

				return <ObjectiveItem index={ index } key={ item.id } category={ item.category } item={ item } />
			});

		return (
			<div id="home-page-wrapper">
				<Quarter changeTab={ this.changeTab.bind(this) } changeYear={this.changeYear} currentTab={ currentTab }/>
				<div id='objectives'>
					<ObjectivesList objectives={ ObjectiveItems } />
				</div>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
	return {
		stateFromReducer: state
	};
}

const ObjectivesConnected = connect(mapStateToProps, mapDispatchToProps)(Objectives);

export default ObjectivesConnected
