import React from 'react';
import ObjectiveData from './ObjectiveData.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../../actions/okrManagingActions.js";

class ObjectiveList extends React.Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.props.cancelEdit();
    this.props.getObjectivesList();
  }

  render(){
    var objectives = [];
    objectives = this.props.objectivesList.visibleObjectives.map((objective, index) => {
      return <ObjectiveData objective = { objective } 
                            index = { index } 
                            key = { objective._id }
                            categories = { this.props.categories }
                            objectivesList = { this.props.objectivesList }
                            editObjectiveTemplate = { this.props.editObjectiveTemplate }
                            cancelEdit = { this.props.cancelEdit }
                            activeObjective = { this.props.activeObjective }
                            deleteObjective = { this.props.deleteObjective }
              />
      })
    return (
        <div id='templates'>
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
    objectivesList: state.okrManaging,
    categories: state.categories
  };
}

const ObjectiveListConnected = connect(mapStateToProps, mapDispatchToProps)(ObjectiveList);
export default ObjectiveListConnected