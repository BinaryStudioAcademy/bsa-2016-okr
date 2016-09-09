import React, { Component } from 'react';
import ObjectiveData from './ObjectiveData.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../../../actions/okrManagingActions.js';

import { isEmpty } from '../../../../../backend/utils/ValidateService';

class ObjectiveList extends Component {
  constructor(props) {
    super(props);

    this.editObjectiveTemplate = this.editObjectiveTemplate.bind(this);
    this.isNotDuplicate = this.isNotDuplicate.bind(this);
  }

  componentWillMount() {
    this.props.cancelEdit();
    this.props.getObjectivesList();
  }

  isNotDuplicate(id, title, category) {
    let objectiveIndex = this.props.objectivesList.objectives.findIndex((objective) => {
      if(objective.title === title) {
        let categoryIndex = this.props.categories.findIndex((category) => {
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
      sweetalert.close();
      return true;
    } else {
      sweetalert({
        title: 'Error!',
        text: 'Objective with such title for that category already exists',
        type: 'error',
      });

      return false;
    }
  }

  editObjectiveTemplate(id, title, description, category) {
    if(this.isNotDuplicate(id, title)) {
      let reqBody = {
        title: title,
        difficulty: difficulty
      }
      
      this.props.editObjectiveTemplate(id, reqBody);
    }
  }

  render() {
    console.log('objectivesList', this.props.objectivesList);
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