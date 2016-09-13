import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import sweetalert from 'sweetalert';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../../../actions/okrManagingActions.js';

import { isEmpty } from '../../../../../backend/utils/ValidateService';

import ObjectiveData from './ObjectiveData.jsx';

class ObjectiveList extends Component {
  constructor(props) {
    super(props);
    
    this.focusEditInput = this.focusEditInput.bind(this);
  }

  componentWillMount() {
    this.props.cancelEdit();
    this.props.getObjectivesList();
  }

  focusEditInput(id) {
    let inputEl = this.refs[`objectiveTemplate-${ id }`].refs.objectiveTitle;
    ReactDOM.findDOMNode(inputEl).focus();
  }

  render() {
    const { visibleObjectives } = this.props.objectivesList;
    let displayedObjectives = [];
    displayedObjectives = visibleObjectives.filter((objective) => {
      return !objective.isDeleted;
    }).map((objective, index) => {
      return <ObjectiveData objective = { objective } 
                            index = { index } 
                            key = { objective._id }
                            categories = { this.props.categories }
                            objectivesList = { this.props.objectivesList }
                            saveEditObjective = { this.props.saveEditObjective }
                            cancelEdit = { this.props.cancelEdit }
                            activeObjective = { this.props.activeObjective }
                            deleteObjective = { this.props.deleteObjective }
                            ref={ `objectiveTemplate-${ objective._id }` }
              />
    });

    return (
      <div id='templates'>
        { displayedObjectives }
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