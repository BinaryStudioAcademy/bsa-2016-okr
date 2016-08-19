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

		this.state={
			currentYear: 2016,
			currentTab: 1
		}
		
	}
	
	changeTab(num) {
		this.setState({
			currentTab: num
		})
	}
	changeYear(year){
		this.setState({
			currentYear: year
		})
	}

	render() {	
      	const { user } = this.props.user;
    	var ObjectiveItems = [];
    	console.log(user.quarters)

		let quarter = user.quarters.find((quarter) => {
			return (quarter.year == this.state.currentYear) && (quarter.index == this.state.currentTab)
		});

		ObjectiveItems = quarter.userObjectives.map((item, index) => {
				console.log('item' + item);

				return <ObjectiveItem key={item._id} item={item} />
			});
		
		return (
			<div>
			 	<Quarter changeTab={this.changeTab.bind(this)} changeYear={this.changeYear.bind(this)} 
			 				currentYear={this.state.currentYear} currentTab={this.state.currentTab}/>
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