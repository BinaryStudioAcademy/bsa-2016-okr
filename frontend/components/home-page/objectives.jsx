import React, { Component } from 'react';
import ObjectiveItem from './objective.jsx';
import Quarter from './quarter.jsx';
import objectives from '../mockData/objectivesMock.js';
import ObjectivesList from './objective-list.jsx';

class Objectives extends Component {
   constructor(props) {
      super(props);
      this.state = {
         currentTab : 1,
         data: props.objectives
      }
   }
   changeTab(num) {
      this.setState({
         currentTab: num
      })
   }
   render() {  
      if (this.state.currentTab == 1) {
      var ObjectiveItems = this.state.data.map((item, index) => {
            return <ObjectiveItem index={index} key={item.id} item={item} />
         }) 
      }
      else if (this.state.currentTab == 2) {
         var ObjectiveItems = this.state.data.map((item, index) => {
            if (item.startDate < this.props.second && item.startDate > this.props.first)
            return <ObjectiveItem index={index} key={item.id} item={item} />
         }) 
      }
      else if (this.state.currentTab == 3) {
         var ObjectiveItems = this.state.data.map((item, index) => {
            if (item.startDate < this.props.third && item.startDate > this.props.second)
            return <ObjectiveItem index={index} key={item.id} item={item} />
         }) 
      }
      else if (this.state.currentTab == 4) {
         var ObjectiveItems = this.state.data.map((item, index) => {             
            if (item.startDate > this.props.third)
            return <ObjectiveItem index={index} key={item.id} item={item} />
         }) 
      }
      
      return (
         <div id="home-page-wrapper">
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
   third: '2016-09-30T10:42:12.643Z',
   objectives: objectives
}
export default Objectives
