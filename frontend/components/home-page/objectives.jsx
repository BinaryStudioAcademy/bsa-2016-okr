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
	}

	changeTab(num) {
		this.props.setChangeTab(num);
	}

	componentWillMount() {
		console.log(this.props);
		this.props.getMe();
	}

	render() {
		const data = this.props.stateFromReducer.myObjectives
		const { objectives, currentYear, currentTab } = data;
		console.log('Reducer state');
		console.log(this.props.stateFromReducer);
		var ObjectiveItems = [];

		let quarter = objectives.quarters.find((quarter) => {
			return (quarter.year === currentYear) && (quarter.index === currentTab)
		});

		ObjectiveItems = quarter.userObjectives.map((item, index) => {
				console.log('item' + item);

				return <ObjectiveItem index={ index } key={ item.id } category={ item.category } item={ item } />
			});

		return (
			<div id="home-page-wrapper">
				<Quarter changeTab={ this.changeTab.bind(this) } currentTab={ currentTab }/>
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
