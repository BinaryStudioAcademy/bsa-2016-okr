import React from 'react';
import ObjectiveData from './ObjectiveData';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../../actions/okrManagingActions.js";


/*export default ({ data, update, remove, editing, edit, editingDone, editingChange }) => {
  if (!data) { return (<p>Loading...</p>); }

  const objectives = data.map((objective, index) => {
    return (<ObjectiveData objective={objective} key={index} index={index} update={update} remove={remove.bind(null, objective)} editing={editing} edit={edit} editingDone={editingDone} editingChange={editingChange}/>);
  });

  return (
    <table className="OKR-managing objective-list-table">
      <tbody>
        {objectives}
      </tbody>
    </table>
  );
};*/

class ObjectiveList extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.props.getObjectivesList()
  }
  render(){
    var objectives = [];
    objectives = this.props.objectivesList.map((objective) => {
      return <ObjectiveData objective={objective} key={objective._id}/>
  })
    console.log(objectives)
    return (
    <table className="OKR-managing objective-list-table">
      <tbody>
        {objectives}
      </tbody>
    </table>
  )
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
  return {
    objectivesList: state.okrManaging.objectives
  };
}

const ObjectiveListConnected = connect(mapStateToProps, mapDispatchToProps)(ObjectiveList);
export default ObjectiveListConnected