import React, { Component } from 'react';
import ObjectiveItem from './objective.jsx';
import Quarter from './quarter.jsx';
//import objectives from '../mockData/objectivesMock.js';
import ObjectivesList from './objective-list.jsx';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../actions/myObjectivesActions";

class Objectives extends Component {
   constructor(props) {
      super(props);
/*
      this.state = {
         //currentTab : 1,
         data: props.objectives
      }
      */
      this.changeTab = this.changeTab.bind(this);
   }

   changeTab(num) {
     this.props.setChangeTab(num);
     /*
      this.setState({
         currentTab: num
      })
      */
   }

   render() {
     const data = this.props.stateFromReducer.myObjectives;
     console.log(this.props.stateFromReducer.myObjectives.myObjectives);
      var ObjectiveItems = [];
      if (data.currentTab == 1) {
            let array = data.myObjectives.filter((item) => {
               if(item.startDate <= this.props.first)
                  return true;
            })
            ObjectiveItems = array.map((item, index) => {
               console.log('item' + item);

                  return <ObjectiveItem index={index} key={item.id} category= {item.category}item={item} />
         })
      }
      else if (data.currentTab == 2) {
            let array = data.myObjectives.filter((item) => {
               if (item.startDate <= this.props.second && item.startDate > this.props.first)
                  return true;
            })
            ObjectiveItems = array.map((item, index) => {
               console.log('item' + item);

                  return <ObjectiveItem index={index} key={item.id} category= {item.category}item={item} />
         })
      }
      else if (data.currentTab == 3) {
            let array = data.myObjectives.filter((item) => {
               if (item.startDate <= this.props.third && item.startDate > this.props.second)
                  return true;
            })
            ObjectiveItems = array.map((item, index) => {
               console.log('item' + item);

                  return <ObjectiveItem index={index} key={item.id} category= {item.category}item={item} />
         })
      }
      else if (data.currentTab == 4) {
            let array = data.myObjectives.filter((item) => {
                  if (item.startDate > this.props.third)
                     return true;
            })
            ObjectiveItems = array.map((item, index) => {
               console.log('item' + item);

                  return <ObjectiveItem index={index} key={item.id} item={item} />
         })
      }

      return (
         <div id="home-page-wrapper">
            <Quarter changeTab={this.changeTab.bind(this)} currentTab={data.currentTab}/>
            <div id='objectives'>
                  <ObjectivesList objectives={ObjectiveItems} />
             </div>
          </div>
      )
   }

   componentWillMount() {
     console.log(this.props);
     //console.log(getMyObjectives);
      this.props.getMyObjectives();
   }

}

Objectives.defaultProps = {
   first: '2016-03-31T10:42:12.643Z',
   second: '2016-06-30T10:42:12.643Z',
   third: '2016-09-30T10:42:12.643Z',
   //objectives: objectives
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
