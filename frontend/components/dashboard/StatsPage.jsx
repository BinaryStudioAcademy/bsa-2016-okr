import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/statsActions';

import { isEmpty } from '../../../backend/utils/ValidateService';

import ChartStats from './chartStats.jsx';
import StatFilter from './statFilter.jsx';

import './StatsPage.scss';

class StatsPage extends Component {

	constructor(props) {
		super(props);

		this.handleFilterClick = this.handleFilterClick.bind(this);
		this.toggleFilters = this.toggleFilters.bind(this);
	}

	componentWillMount() {
		this.props.getCategoriesStats();
		this.props.getKeyResultStats();
	}

	componentWillUnmount() {
		this.props.showFilters(false);
	}

	handleFilterClick(event) {
		this.refs.filterBtn.blur();
		this.toggleFilters();
	}

	toggleFilters() {
		let show = this.props.showStatsFilters;
		this.props.showFilters(!show);
	}

	render() {
		let categories = this.props.categories;
		let categoriesChartData = [['Category', 'AVG Score']].concat(categories.map(toArray));
		let CategoriesChartEl = isEmpty(categories) ? (<div></div>) : (<ChartStats title="Objective average score by categories" color="#99BCE0" data={ categoriesChartData } />);
		
		let keyResults = this.props.keyResults;
		let keyResultsChartData = [['Difficulty', 'AVG Score']].concat(keyResults.map(toArray));
		let KeyResultChartEl = isEmpty(keyResults) ? (<div></div>) : (<ChartStats title="Objective average score by key result difficulty" color="#C5CAFC" data = { keyResultsChartData } />);
		let showFilters = this.props.showStatsFilters;

		return (
			<div className="main-content">
				<div className="stats-title">
					<p><span>Useful statistics</span></p>
				</div>
				<div className="stat-filter">
					<button ref="filterBtn" className="btn btn-blue" onClick={this.handleFilterClick}>
						<i className="fi flaticon-funnel"/>
						&nbsp;Filter&nbsp;&nbsp;
						<i className={ `fi-1 flaticon-1-arrow-${ showFilters ? 'up' : 'down' } upIcon` }/>
					</button>
					<div className={`stat-filter-container ${ showFilters ? 'opened' : '' }`}>
						<div className="stat-filter-bar-container">
							<StatFilter />
						</div>
					</div>
				</div>
				{ CategoriesChartEl }
				{ KeyResultChartEl }
			</div>
		)
	}
}

function toArray(obj) {
	var rez = [];
	for (var i in obj) {
		if (i === 'score' && !obj[i]) {
			obj[i] = 0;
		}
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
		showStatsFilters: state.stats.showStatsFilters,
   };
}

const StatsPageConnected = connect(mapStateToProps, mapDispatchToProps)(StatsPage);
export default StatsPageConnected;