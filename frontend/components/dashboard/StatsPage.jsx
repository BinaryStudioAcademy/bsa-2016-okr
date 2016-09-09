import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/statsActions';

import { isEmpty } from '../../../backend/utils/ValidateService';

import ChartStats from './chartStats.jsx';

import './StatsPage.scss';

class StatsPage extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.getCategoriesStats();
		this.props.getKeyResultStats();
	}

	render() {
		let categories = this.props.categories;
		let categoriesChartData = [['Category', 'AVG Score']].concat(categories.map(toArray));
		let CategoriesChartEl = isEmpty(categories) ? (<div></div>) : (<ChartStats title="Objective average score by categories" color="#99BCE0" data={ categoriesChartData } />);
		
		let keyResults = this.props.keyResults;
		let keyResultsChartData = [['Difficulty', 'AVG Score']].concat(keyResults.map(toArray));
		let KeyResultChartEl = isEmpty(keyResults) ? (<div></div>) : (<ChartStats title="Objective average score by key result difficulty" color="#C5CAFC" data = { keyResultsChartData } />);
		
		// console.log('Categories', categories);
		// console.log('Categories to array', toArray(categories));	
		
		return (
			<div className="main-content">
				<div className="stats-title">
					<p><span>Useful statistics</span></p>
				</div>
				{ CategoriesChartEl }
				{ KeyResultChartEl }
			</div>
		)
	}
}

// TODO: Need review. 
// Necessarity is under ???
// Used in forming data for `react-google-charts`
function toArray(obj) {
	var rez = [];
	for (var i in obj) {
		rez.push(obj[i]);
	}
	return rez;
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
   return {
      categories: state.stats.categories,
      keyResults: state.stats.keyResults,
   };
}

const StatsPageConnected = connect(mapStateToProps, mapDispatchToProps)(StatsPage);
export default StatsPageConnected;