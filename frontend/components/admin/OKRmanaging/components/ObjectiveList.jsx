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
    const {
      categories,
      objectivesList,
      saveEditObjective,
      cancelEdit,
      activeObjective,
      deleteObjective
    } = this.props;

    const { visibleObjectives } = objectivesList;
    let displayedObjectivesEl = visibleObjectives.filter((objective) => {
      return !objective.isDeleted;
    }).sort((a, b) => {
      return a.title.localeCompare(b.title);
    }).map((objective, index) => {
      return <ObjectiveData objective={ objective }
                            index={ index }
                            key={ objective._id }
                            categories={ categories }
                            editing={ objectivesList.editing }
                            active={ objectivesList.active }
                            saveEditObjective={ saveEditObjective }
                            cancelEdit={ cancelEdit }
                            activeObjective={ activeObjective }
                            deleteObjective={ deleteObjective }
                            ref={ `objectiveTemplate-${ objective._id }` }
                            id={ `objectiveTemplate-${ objective._id }` }
              />
    });

    return (
      <div id='templates'>
        { displayedObjectivesEl }
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
  };
}

const ObjectiveListConnected = connect(mapStateToProps, mapDispatchToProps)(ObjectiveList);
export default ObjectiveListConnected
