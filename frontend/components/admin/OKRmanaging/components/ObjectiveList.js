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
      <table className="OKR-managing table">
        <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Category</th>
                </tr>
            </thead>
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
    objectivesList: state.okrManaging.visibleObjectives
  };
}

const ObjectiveListConnected = connect(mapStateToProps, mapDispatchToProps)(ObjectiveList);
export default ObjectiveListConnected