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

    this.saveChanges = this.saveChanges.bind(this);
    this.isNotDuplicate = this.isNotDuplicate.bind(this);
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

  isNotDuplicate(id, title, category) {
    let objectiveIndex = this.props.objectivesList.objectives.findIndex((objective) => {
      if(objective.title === title) {
        let categoryIndex = this.props.categories.list.findIndex((category) => {
          return category._id === objective.category;
        });

        if(this.props.categories[categoryIndex] === category) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });

    if(objectiveIndex === -1 || (!isEmpty(id) && this.props.objectivesList.objectives[objectiveIndex]._id === id)) {
      return true;
    } else {
      sweetalert({
        title: 'Error!',
        text: 'Objective with such title for that category already exists',
        type: 'error',
      }, () => {
        setTimeout(() => {
          this.focusEditInput(id);
        }, 0);
      });

      return false;
    }
  }

  saveChanges(id, data) {
    if(isEmpty(data.title) 
    || (!isEmpty(data.title) && this.isNotDuplicate(id, data.title, data.category))) {
      this.props.editObjectiveTemplate(id, data);
      sweetalert.close();
    }
  }

  render() {
    // console.log('objectivesList', this.props.objectivesList);
    var objectives = [];
    objectives = this.props.objectivesList.visibleObjectives.map((objective, index) => {
      return <ObjectiveData objective = { objective } 
                            index = { index } 
                            key = { objective._id }
                            categories = { this.props.categories }
                            objectivesList = { this.props.objectivesList }
                            saveChanges = { this.saveChanges }
                            cancelEdit = { this.props.cancelEdit }
                            activeObjective = { this.props.activeObjective }
                            deleteObjective = { this.props.deleteObjective }
                            ref={ `objectiveTemplate-${ objective._id }` }
              />
    });

    return (
      <div id='templates'>
        { objectives }
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