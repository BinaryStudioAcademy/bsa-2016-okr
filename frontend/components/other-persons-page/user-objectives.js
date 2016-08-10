import data from '../mockData/recycleBin.js';
import React, { Component } from 'react';
import ObjectiveItem from './user-objective-item.js';
import Quarter from './persons-quarter.js';
import './user-objectives.scss'

class Objectives extends Component {
	constructor(props) {
		super(props);
	}
	render() {	
	var ObjectiveItems = this.props.data.map((item, index) => {
		return <ObjectiveItem index={index} key={item.id} item={item} />
	})	
		return (
			<div>
			 	<Quarter />
				<div id='objectives'>
	         		{ObjectiveItems}
			    </div> 
		    </div>       
		)
	}
}
Objectives.defaultProps = {
	data: data.templates
}
export default Objectives