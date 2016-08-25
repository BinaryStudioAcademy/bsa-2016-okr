import React from 'react';
import ObjectiveData from './ObjectiveData.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../../actions/okrManagingActions.js";

class ObjectiveList extends React.Component{
  constructor(props){
    super(props);

    this.activeObjective = this.activeObjective.bind(this)
  }

  activeObjective(index){
    this.props.activeObjective(index)
  }

  componentWillMount(){
    this.props.getObjectivesList()
  }

  render(){
    var objectives = [];
    objectives = this.props.objectivesList.map((objective, index) => {
      return <ObjectiveData activeObjective={this.activeObjective} objective={objective}
                            index={index} key={objective._id}/>
      })
    return (
        <div id='tamplates'>
          {objectives}
        </div>  
    )
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
  return {
    objectivesList: state.okrManaging.visibleObjectives
  };
}

const ObjectiveListConnected = connect(mapStateToProps, mapDispatchToProps)(ObjectiveList);
export default ObjectiveListConnected