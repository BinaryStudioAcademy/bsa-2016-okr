import data from '../mockData/recycleBin.js';
import React, { Component } from 'react';
import ObjectiveItem from './user-objective-item.js';
import './user-objectives.scss'

class Objectives extends Component {
	constructor(props) {
		super(props);
	}
	render() {
			var ObjectiveItems = this.props.data.map((item, index) => {
				if (item.startDate < 1475329910417)
					return <ObjectiveItem index={index} key={item.id} item={item} />
			})
		const li = document.getElementsByClassName('quater');
		console.log(li[0].classList.contains('active'))
			if (li[0].classList.contains('active')) {
			var ObjectiveItems = this.props.data.map((item, index) => {
				if (item.startDate < 1459432310417)
					return <ObjectiveItem index={index} key={item.id} item={item} />
			})
		}
			else if (li[1].classList.contains('active')) {
			var ObjectiveItems = this.props.data.map((item, index) => {
				if (item.startDate < 1467294710417)
					return <ObjectiveItem index={index} key={item.id} item={item} />
			})
		}
			else if (li[2].classList.contains('active')) {
			var ObjectiveItems = this.props.data.map((item, index) => {
				if (item.startDate < 1475329910417)
					return <ObjectiveItem index={index} key={item.id} item={item} />
			})
		}
			else if (li[3].classList.contains('active')) {
			var ObjectiveItems = this.props.data.map((item, index) => {
				if (item.startDate < 1483192310417)
					return <ObjectiveItem index={index} key={item.id} item={item} />
			})
		}
		
		return (
			<div id='objectives'>
         		{ObjectiveItems}
		    </div>        
		)
	}
}
Objectives.defaultProps = {
	data: data
}
export default Objectives