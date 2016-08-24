import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../actions/otherPersonActions.js";

import ObjectiveItem from './user-objective-item.js';
import Quarter from './persons-quarter.js';
import ObjectivesList from './user-objectives-list.jsx';
import './user-objectives.scss'

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
    	var ObjectiveItems = [];

		let quarter = user.quarters.find((quarter) => {
			return (quarter.year == currentYear) && (quarter.index == currentTab)
		});

		ObjectiveItems = quarter.userObjectives.map((item, index) => {
				return <ObjectiveItem key={item._id} item={item} />
			});
		
		return (
			<div>
			 	<Quarter changeTab={this.changeTab.bind(this)} changeYear={this.changeYear.bind(this)} 
			 				currentYear={currentYear} currentTab={currentTab}/>
				<div id='objectives'>
     		    	<ObjectivesList objectives={ObjectiveItems} />
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
		user: state.userPage
	};
}

const ObjectivesConnected = connect(mapStateToProps, mapDispatchToProps)(Objectives);
export default ObjectivesConnected