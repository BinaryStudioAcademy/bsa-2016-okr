import data from '../mockData/objectivesMock.js';
import React, { Component } from 'react';
import ObjectiveItem from './user-objective-item.js';
import Quarter from './persons-quarter.js';
import './user-objectives.scss'

class Objectives extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentTab : 1
		}
	}
	changeTab(num) {
		this.setState({
			currentTab: num
		})
	}
	render() {	
		if (this.state.currentTab == 1) {
		var ObjectiveItems = this.props.data.map((item, index) => {
				if (item.startDate < '2016-03-31T10:42:12.643Z')
				return <ObjectiveItem index={index} key={item.id} item={item} />
			})	
		}
		else if (this.state.currentTab == 2) {
			var ObjectiveItems = this.props.data.map((item, index) => {
				if (item.startDate < '2016-06-30T10:42:12.643Z' && item.startDate > '2016-03-31T10:42:12.643Z')
				return <ObjectiveItem index={index} key={item.id} item={item} />
			})	
		}
		else if (this.state.currentTab == 3) {
			var ObjectiveItems = this.props.data.map((item, index) => {
				if (item.startDate < '2016-09-30T10:42:12.643Z' && item.startDate > '2016-06-30T10:42:12.643Z')
				return <ObjectiveItem index={index} key={item.id} item={item} />
			})	
		}
		else if (this.state.currentTab == 4) {
			var ObjectiveItems = this.props.data.map((item, index) => {					
				if (item.startDate > '2016-09-30T10:42:12.643Z')
				return <ObjectiveItem index={index} key={item.id} item={item} />
			})	
		}
		
		return (
			<div>
			 	<Quarter changeTab={this.changeTab.bind(this)} currentTab={this.state.currentTab}/>
				<div id='objectives'>
	         		{ObjectiveItems}
			    </div> 
		    </div>       
		)
	}
}
Objectives.defaultProps = {
	data: data
}
export default Objectives