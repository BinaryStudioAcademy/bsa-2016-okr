import React, { Component } from 'react';
import ObjectiveItem from './user-objective-item.js';
import Quarter from './persons-quarter.js';
import ObjectivesList from './user-objectives-list.jsx';
import './user-objectives.scss'

class Objectives extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentTab : 1,

		}
	}
	changeTab(tab) {
		this.setState({
			currentTab: tab
		})
	}
	render() {	
		var ObjectiveItems = [];
	if (this.state.currentTab == 1) {
            let array =  this.props.data.objectives.filter((item) => {
               if(item.startDate <= this.props.first)
                  return true;
            })
            ObjectiveItems = array.map((item, index) => {
               console.log('item' + item);
               
                  return <ObjectiveItem index={index} key={item.id} category= {item.category}item={item} />
         }) 
      }
      else if (this.state.currentTab == 2) {
            let array =  this.props.data.objectives.filter((item) => {
               if (item.startDate <= this.props.second && item.startDate > this.props.first)
                  return true;
            })
            ObjectiveItems = array.map((item, index) => {
               console.log('item' + item);
               
                  return <ObjectiveItem index={index} key={item.id} category= {item.category}item={item} />
         }) 
      }
      else if (this.state.currentTab == 3) {
            let array =  this.props.data.objectives.filter((item) => {
               if (item.startDate <= this.props.third && item.startDate > this.props.second)
                  return true;
            })
            ObjectiveItems = array.map((item, index) => {
               console.log('item' + item);
               
                  return <ObjectiveItem index={index} key={item.id} category= {item.category}item={item} />
         }) 
      }
      else if (this.state.currentTab == 4) {
            let array =  this.props.data.objectives.filter((item) => {
                  if (item.startDate > this.props.third)
                     return true;
            })
            ObjectiveItems = array.map((item, index) => {             
               console.log('item' + item);
               
                  return <ObjectiveItem index={index} key={item.id} item={item} />
         }) 
      }
		return (
			<div>
			 	<Quarter changeTab={this.changeTab.bind(this)} currentTab={this.state.currentTab}/>
				<div id='objectives'>
	         		<ObjectivesList objectives={ObjectiveItems} />
			    </div> 
		    </div>       
		)
	}
}
Objectives.defaultProps = {
	first: '2016-03-31T10:42:12.643Z',
	second: '2016-06-30T10:42:12.643Z',
	third: '2016-09-30T10:42:12.643Z'
}
export default Objectives